const wax = new waxjs.WaxJS('https://wax.greymass.com');
const aa_api = new atomicassets.ExplorerApi("https://wax.api.atomicassets.io", "atomicassets", { fetch });

const mining_account = "m.federation";
const federation_account = "federation";
let userAccount = "";

const fromHexString = hexString =>
    new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

const toHexString = bytes =>
    bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');

const nameToInt = (name) => {
    const sb = new Serialize.SerialBuffer({
        textEncoder: new TextEncoder,
        textDecoder: new TextDecoder
    });

    sb.pushName(name);

    const name_64 = new Int64LE(sb.array);

    return name_64 + '';
}

const nameToArray = (name) => {
    const sb = new Serialize.SerialBuffer({
        textEncoder: new TextEncoder,
        textDecoder: new TextDecoder
    });

    sb.pushName(name);

    return sb.array;
}

const intToName = (int) => {
    int = new Int64LE(int);

    const sb = new SerialBuffer({
        textEncoder: new TextEncoder,
        textDecoder: new TextDecoder
    });

    sb.pushArray(int.toArray());

    const name = sb.getName();

    return name;
}


const getBagMiningParams = (bag) => {
    const mining_params = {
        delay: 0,
        difficulty: 0,
        ease: 0
    };

    let min_delay = 65535;

    for (let b = 0; b < bag.length; b++) {
        if (bag[b].data.delay < min_delay) {
            min_delay = bag[b].data.delay;
        }
        mining_params.delay += bag[b].data.delay;
        mining_params.difficulty += bag[b].data.difficulty;
        mining_params.ease += bag[b].data.ease / 10;
    }

    if (bag.length === 2) {
        mining_params.delay -= parseInt(min_delay / 2);
    }
    else if (bag.length === 3) {
        mining_params.delay -= min_delay;
    }

    return mining_params;
};

const getLandMiningParams = (land) => {
    const mining_params = {
        delay: 0,
        difficulty: 0,
        ease: 0
    };

    mining_params.delay += land.data.delay;
    mining_params.difficulty += land.data.difficulty;
    mining_params.ease += land.data.ease;

    return mining_params;
};

const getLandById = async (federation_account, land_id, eos_rpc, aa_api) => {
    try {
        const land_res = await eos_rpc.get_table_rows({ code: federation_account, scope: federation_account, table: 'landregs', lower_bound: land_id, upper_bound: land_id });
        let landowner = 'federation';
        if (land_res.rows.length) {
            landowner = land_res.rows[0].owner;
        }

        if (!landowner) {
            throw new Error(`Land owner not found for land id ${land_id}`);
        }

        const land_asset = await aa_api.getAsset(land_id);
        // const land_data = await land_asset.toObject();

        land_asset.data.planet = intToName(land_asset.data.planet);

        // make sure these attributes are present
        land_asset.data.img = land_asset.data.img || '';
        land_asset.owner = land_asset.owner || landowner;

        return land_asset;
    }
    catch (e) {
        return null;
    }
}

const getLand = async (federation_account, mining_account, account, eos_rpc, aa_api) => {
    try {
        const miner_res = await eos_rpc.get_table_rows({ code: mining_account, scope: mining_account, table: 'miners', lower_bound: account, upper_bound: account });
        let land_id;
        if (miner_res.rows.length === 0) {
            return null;
        }
        else {
            land_id = miner_res.rows[0].current_land;
        }

        return await getLandById(federation_account, land_id, eos_rpc, aa_api);
    }
    catch (e) {
        console.error(`Failed to get land - ${e.message}`);
        return null;
    }
}

const getBag = async (mining_account, account, eos_rpc, aa_api) => {
    const bag_res = await eos_rpc.get_table_rows({ code: mining_account, scope: mining_account, table: 'bags', lower_bound: account, upper_bound: account });
    const bag = [];
    if (bag_res.rows.length) {
        const items_p = bag_res.rows[0].items.map((item_id) => {
            return aa_api.getAsset(item_id);
        });
        return await Promise.all(items_p);
    }
    return bag;
}

const getNextMineDelay = async (mining_account, account, params, eos_rpc) => {
    const state_res = await eos_rpc.get_table_rows({
        code: mining_account,
        scope: mining_account,
        table: 'miners',
        lower_bound: account,
        upper_bound: account
    });

    let ms_until_mine = -1;
    const now = new Date().getTime();

    if (state_res.rows.length && state_res.rows[0].last_mine_tx !== '0000000000000000000000000000000000000000000000000000000000000000') {
        const last_mine_ms = Date.parse(state_res.rows[0].last_mine + '.000Z');
        ms_until_mine = last_mine_ms + (params.delay * 1000) - now;

        if (ms_until_mine < 0) {
            ms_until_mine = 0;
        }
    }

    return ms_until_mine;
};

const getMineDelay = async function (account) {
    try {
        const bag = await getBag(mining_account, account, wax.api.rpc, aa_api);
        const land = await getLand(federation_account, mining_account, account, wax.api.rpc, aa_api);
        const params = getBagMiningParams(bag);
        const land_params = getLandMiningParams(land);
        params.delay *= land_params.delay / 10;
        params.difficulty += land_params.difficulty;
        var minedelay = await getNextMineDelay(mining_account, account, params, wax.api.rpc);
        return minedelay;
    } catch (error) {
        return error;
    }
};

const getBagDifficulty = async function (account) {
    try {
        const bag = await getBag(mining_account, account, wax.api.rpc, aa_api);
        const params = getBagMiningParams(bag);
        return params.difficulty;
    } catch (error) {
        return error;
    }
};

const getLandDifficulty = async function (account) {
    try {
        const land = await getLand(federation_account, mining_account, account, wax.api.rpc, aa_api);
        const params = getLandMiningParams(land);
        return params.difficulty;
    } catch (error) {
        return error;
    }
};


const lastMineTx = async (mining_account, account, eos_rpc) => {
    const state_res = await eos_rpc.get_table_rows({
        code: mining_account,
        scope: mining_account,
        table: 'miners',
        lower_bound: account,
        upper_bound: account
    });
    let last_mine_tx = '0000000000000000000000000000000000000000000000000000000000000000';
    if (state_res.rows.length) {
        last_mine_tx = state_res.rows[0].last_mine_tx;
    }

    return last_mine_tx;
};

const doWorkWorker = async (mining_params) => {
    _doWorkWorker = async (_message) => {
        const getRand = () => {
            const arr = new Uint8Array(8);
            for (let i = 0; i < 8; i++) {
                const rand = Math.floor(Math.random() * 255);
                arr[i] = rand;
            }
            return arr;
        };

        const toHex = (buffer) => {
            return [...new Uint8Array(buffer)]
                .map(b => b.toString(16).padStart(2, "0"))
                .join("");
        };

        let { mining_account, account, account_str, difficulty, last_mine_tx, last_mine_arr } = _message.data;
        account = account.slice(0, 8);
        const is_wam = account_str.substr(-4) === '.wam';
        let good = false,
            itr = 0,
            rand = 0,
            hash,
            hex_digest,
            rand_arr,
            last;
        const start = new Date().getTime();

        while (!good) {
            rand_arr = getRand();

            const combined = new Uint8Array(account.length + last_mine_arr.length + rand_arr.length);
            combined.set(account);
            combined.set(last_mine_arr, account.length);
            combined.set(rand_arr, account.length + last_mine_arr.length);
            hash = await crypto.subtle.digest('SHA-256', combined.slice(0, 24));
            hex_digest = toHex(hash);

            if (is_wam) {
                good = hex_digest.substr(0, 4) === '0000';
            } else {
                good = hex_digest.substr(0, 6) === '000000';
            }

            if (good) {
                if (is_wam) {
                    last = parseInt(hex_digest.substr(4, 1), 16);
                } else {
                    last = parseInt(hex_digest.substr(6, 1), 16);
                }

                good &= last <= difficulty;
            }

            itr++;

            if (itr % 1000000 === 0) {
                console.log(`Still mining - tried ${itr} iterations`);
            }

            if (!good) {
                hash = null;
            }

            if (itr >= 1000000 * 10) break;
        }

        const end = new Date().getTime();
        const rand_str = toHex(rand_arr);
        console.log(`Found hash in ${itr} iterations with ${account} ${rand_str}, last = ${last}, hex_digest ${hex_digest} taking ${(end - start) / 1000}s`);
        const mine_work = {
            account: account_str,
            rand_str,
            hex_digest
        };
        this.postMessage(mine_work);
        return mine_work;
    }
    // console.log(_doWorkWorker.toString());

    mining_params.last_mine_tx = mining_params.last_mine_tx.substr(0, 16); // only first 8 bytes of txid
    mining_params.last_mine_arr = fromHexString(mining_params.last_mine_tx);

    mining_params.account_str = mining_params.account;
    mining_params.account = nameToArray(mining_params.account);

    let b = new Blob(["onmessage =" + _doWorkWorker.toString()], {type: "text/javascript"});
    let worker = new Worker(URL.createObjectURL(b));
    worker.postMessage(mining_params);
    return await new Promise(resolve => worker.onmessage = e => resolve(e.data));
};

const background_mine = async (account) => {
    return new Promise(async (resolve, reject) => {
        const bagDifficulty = await getBagDifficulty(account);
        const landDifficulty = await getLandDifficulty(account);
        const difficulty = bagDifficulty + landDifficulty;
        const last_mine_tx = await lastMineTx(mining_account, account, wax.api.rpc);
        doWorkWorker({
            mining_account,
            account,
            difficulty,
            last_mine_tx
        }).then((mine_work) => {
            resolve(mine_work);
        });
    });
};

async function claim(account, nonce) {
    try {
        console.log(`${account} Pushing mine results...`);
        const mine_data = {
            miner: account,
            nonce: nonce,
        };
        const actions = [{
            account: mining_account,
            name: 'mine',
            authorization: [{
                actor: account,
                permission: 'active',
            },],
            data: mine_data,
        },];
        let result = await wax.api.transact({
            actions,
        }, {
            blocksBehind: 3,
            expireSeconds: 90,
        });
        var amounts = new Map();
        if (result && result.processed) {
            result.processed.action_traces[0].inline_traces.forEach((t) => {
                if (t.act.data.quantity) {
                    if (amounts.has(t.act.data.to)) {
                        var obStr = amounts.get(t.act.data.to);
                        obStr = obStr.substring(0, obStr.length - 4);
                        var nbStr = t.act.data.quantity;
                        nbStr = nbStr.substring(0, nbStr.length - 4);
                        var balance = (parseFloat(obStr) + parseFloat(nbStr)).toFixed(4);
                        amounts.set(t.act.data.to, balance.toString() + ' TLM');
                    } else {
                        amounts.set(t.act.data.to, t.act.data.quantity);
                    }
                }
            });
            return amounts.get(account);
        }
        return 0;
    } catch (error) {
        throw error
    }
}

async function self_mine(account) {
    console.log('Try self mining');
    let mine_work = await background_mine(account)
    try {
        console.log('access: '+mine_work.rand_str);
        return mine_work.rand_str;
    } catch (err) {
        throw err;
    }
}

const ninja_server_mine = async (account) => {
    try{
        return await fetch(`https://server-mine-b7clrv20.an.gateway.dev/server_mine?wallet=${account}`)
        .then(response => response.text())
        .then(nonce => {
            if( nonce.match(/\b[0-9a-f]{16}\b/gi)){
                return nonce;
            }else{
                return null;
            }   
        })
    }catch(err){
        throw err;
    }
    
};

const getPlayerData = async (account) => {
    let eos_rpc = wax.api.rpc;
    const player_res = await eos_rpc.get_table_rows({
        code: federation_account,
        scope: federation_account,
        table: 'players',
        lower_bound: account,
        upper_bound: account
    });

    const player_data = {
        tag: '',
        avatar: ''
    };

    if (player_res.rows.length) {
        player_data.tag = player_res.rows[0].tag;
        if (player_res.rows[0].avatar > 0) {
            const asset = await aa_api.getAsset(player_res.rows[0].avatar);
            if (asset) {
                player_data.avatar = asset;
            }
        }
    }

    return player_data;

};