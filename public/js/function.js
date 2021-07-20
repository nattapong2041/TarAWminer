const base_api = [
    'https://wax.pink.gg', 
    'https://wax.greymass.com',
    'https://wax.cryptolions.io',
    'https://wax.dapplica.io',
    //'https://chain.wax.io',
    //'https://api.waxsweden.org',
]

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
//var url = base_api[getRandom(0, base_api.length-2)];
function changeWaxServer(index){
    localStorage.setItem('wax_server',index)       
    setTimeout((() => { location.reload() } ), 500)   
}
var url = base_api[parseInt(localStorage.getItem('wax_server')) ? parseInt(localStorage.getItem('wax_server')) : 0];
const wax = new waxjs.WaxJS(url);

const aa_api = new atomicassets.ExplorerApi("https://wax.api.atomicassets.io", "atomicassets", { fetch });

const mining_account = "m.federation";
const federation_account = "federation";

function timeout(ms, promise) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error('Transaction timeout!'))
      }, ms)
      promise
        .then(value => {
          clearTimeout(timer)
          resolve(value)
        })
        .catch(reason => {
          clearTimeout(timer)
          reject(reason)
        })
    })
  }

  
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
    if(ms_until_mine>=0)
        return ms_until_mine;

    return -1
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
        console.log('Cannnot get cooldown: '+error);
        return -1;
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
    mining_params.last_mine_tx = mining_params.last_mine_tx.substr(0, 16); // only first 8 bytes of txid
    mining_params.last_mine_arr = fromHexString(mining_params.last_mine_tx);

    mining_params.account_str = mining_params.account;
    mining_params.account = nameToArray(mining_params.account);

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

    let { mining_account, account, account_str, difficulty, last_mine_tx, last_mine_arr, oldNonce } = mining_params
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

    while (!good && isMining) {
        rand_arr = getRand();
        if (itr == 0) {
            if (oldNonce){
                rand_arr = fromHexString(oldNonce)
            }  
        }
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

        if (itr >= 1000000 * 8) break;
    }
    if(!isMining){
        const mine_work = {
            account: account_str,
            rand_str: null,
            hex_digest: hex_digest
        };
        this.postMessage(mine_work);
        return mine_work;
    }else{
        const end = new Date().getTime();
        const rand_str = toHex(rand_arr);
        console.log(`Found answer ${rand_str} in ${itr} iterations taking ${(end - start) / 1000}s`);
        const mine_work = {
            account: account_str,
            rand_str: rand_str,
            hex_digest: hex_digest
        };
        this.postMessage(mine_work);
        return mine_work;
    }
    
};

const background_mine = async (account, oldNonce) => {
    return new Promise(async (resolve, reject) => {
        const bagDifficulty = await getBagDifficulty(account);
        const landDifficulty = await getLandDifficulty(account);
        const difficulty = bagDifficulty + landDifficulty;
        const last_mine_tx = await lastMineTx(mining_account, account, wax.api.rpc);
        doWorkWorker({
            mining_account,
            account,
            difficulty,
            last_mine_tx,
            oldNonce
        }).then((mine_work) => {
            resolve(mine_work);
        });
    });
};

async function claim(account, nonce) {
    try {
        console.log(`${account} Pushing mine results...`);
        const mine_data = {
            miner: wax.userAccount,
            nonce: nonce,
        };
        let actions = [{
            account: "m.federation",
            name: "mine",
            authorization: [{
                actor: wax.userAccount,
                permission: "active",
            }, ],
            data: mine_data,
        }, ];
        // let result = await timeout(95000, wax.api.transact({
        //     actions,
        // }, {
        //     blocksBehind: 3,
        //     expireSeconds: 90,
        // })).then(function (response) {
        //     return response;
        // }).catch((err) => {
        //     throw err;
        // });

        let result = await timeout(180000, wax.api.transact({
                actions,
            }, {
                blocksBehind: 3,
                expireSeconds: 90,
            })).then(function (response) {
                return response;
            }).catch((err) => {
                throw err;
        });
        await sleep(2000);
        var amounts = new Map();
        if (result && result.processed) {
            try {
                let tlm=0.0;
                let tlmSuccess = false;
                try{
                    tlm = await getTLM(userAccount);
                    tlmSuccess=true;
                }catch (error){
                    console.log('Get tlm error');
                    tlm=0.0;
                }
                if(!document.querySelector("#need_real_tlm").checked) throw 'err';
                if (tlmSuccess) {
                    let recieve =(parseFloat(tlm - lastTLM)).toFixed(4);
                    amounts.set(account, recieve.toString() + ' TLM'); 
                    lastTLM = tlm;
                    document.getElementById("tlm_balance").textContent = tlm + ' TLM';
                }
                else {
                    document.getElementById("tlm_balance").textContent = "cannot get tlm balance";
                    throw 'err';
                }
            } catch(err) {
                result.processed.action_traces[0].inline_traces.forEach((t) => {
                    if (t.act.data.quantity) {
                        var quantityStr = t.act.data.quantity;
                    quantityStr = quantityStr.substring(0, quantityStr.length - 4);
                    var balance = (parseFloat(quantityStr)).toFixed(4);
                    amounts.set(account, balance.toString() + ' TLM'); 
                    }
                });
            }         
            console.log('Received: ' + parseFloat(amounts.get(account)));
            return amounts.get(account);
        }
        return 0.00;
    } catch (error) {
        throw error
    }
}

async function setLand(account, land) {
    try {
        console.log(`${account} changing land to ${land}`);
        const setland = {
            'account': account,
            'land_id': land
        };
        const actions = [{
            'account': 'm.federation',
            'name': 'setland',
            'authorization': [{
                'actor': account,
                'permission': 'active'
            }],
            'data': setland
        }];
        let result = await wax.api.transact({
            actions,
        }, {
            blocksBehind: 3,
            expireSeconds: 90,
        });
        if (result && result.processed) {
            let lands = result.processed.action_traces[0].act.data.land_id
            return 'Set to lands: ' + lands;
        }
        return 0;
    } catch (error) {
        throw error;
    }
}

async function swap(account, amount) {
    try {
        console.log(`${account} Swaping tlm to wax ...`);
        const swapdata = {
            'from': account,
            'to': 'alcordexmain',
            'quantity': `${parseFloat(amount).toFixed(4)}  TLM`,
            'memo': "0.00000000 WAX@eosio.token"
        };
        const actions = [{
            'account': 'alien.worlds',
            'name': 'transfer',
            'authorization': [{
                'actor': account,
                'permission': 'active'
            }],
            'data': swapdata
        }];
        let result = await timeout(95000, wax.api.transact({
            actions,
        }, {
            blocksBehind: 3,
            expireSeconds: 90,
        })).then(function (response) {
            return response;
        }).catch((err) => {
            throw err;
        });
        if (result && result.processed) {
            let wax = result.processed.action_traces[0].inline_traces[2].act.data.quantity
            return `Swap ${amount} to ${wax}`
        }
        return 0;
    } catch (error) {
        throw error;
    }
}

async function transfer(account, amount, toAcc, memo) {
    try {
        console.log(`${account} Transfering ${amount} WAX to ${toAcc} memo ${memo} ...`);
        const transferWAX = {
            'from': account,
            'to': toAcc,
            'quantity': `${parseFloat(amount).toFixed(8)}  WAX`,
            'memo': memo
        };
        const actions = [{
            'account': 'eosio.token',
            'name': 'transfer',
            'authorization': [{
                'actor': account,
                'permission': 'active'
            }],
            'data': transferWAX
        }];
        let result = await timeout(95000, wax.api.transact({
            actions,
        }, {
            blocksBehind: 3,
            expireSeconds: 90,
        })).then(function (response) {
            return response;
        }).catch((err) => {
            throw err;
        });
        if (result && result.processed) {
            return `Transfer ${amount} WAX from ${account} to ${toAcc} memo ${memo}`
        }
        return 0;
    } catch (error) {
        throw error;
    }
}

async function claimNFT(account, claimAcc) {
    try {
        console.log(`Claiming NFT drop of ${account} ...`);
        const claimnfts = {
            'miner': claimAcc,
        };
        const actions = [{
            'account': 'm.federation',
            'name': 'claimnfts',
            'authorization': [{
                'actor': account,
                'permission': 'active'
            }],
            'data': claimnfts
        }]
        let result = await wax.api.transact({
            actions,
        }, {
            blocksBehind: 3,
            expireSeconds: 90,
        });
        if (result && result.processed) {
            return `Claim item success pls check your bag`
        }
        return 0;
    } catch (error) {
        throw error;
    }
}

async function stake(account, amount) {
    try {
        console.log(`Staking ${amount} WAX to CPU...`);
        const stake = {
            'from': account,
            'receiver': account,
            'stake_net_quantity': `0.00000000 WAX`,
            'stake_cpu_quantity': `${parseFloat(amount).toFixed(8)} WAX`,
            'transfer': false
        };
        const actions = [{
            'account': 'eosio',
            'name': 'delegatebw',
            'authorization': [{
                'actor': account,
                'permission': 'active'
            }],
            'data': stake
        }];
        let result = await wax.api.transact({
            actions,
        }, {
            blocksBehind: 3,
            expireSeconds: 90,
        });
        if (result && result.processed) {
            return `Complete stake ${amount} WAX `
        }
        return 0;
    } catch (error) {
        throw error;
    }
}


async function self_mine(account, oldnonce) {
    console.log('Try self mining');
    let mine_work = await background_mine(account,oldnonce)
    try {
        return mine_work.rand_str;
    } catch (err) {
        throw err;
    }
}

const ninja_server_mine = async (account,isVIP) => {
    const ninja = ['Rate', 'rate', 'Limit', 'limit']
    
    let url = `https://server-mine-b7clrv20.an.gateway.dev/server_mine?wallet=${account}`;
    if(isVIP == true){
        console.log('Mining with ninja vip server');
        url = `https://server-mine-b7clrv20.an.gateway.dev/server_mine_vip?wallet=${account}`;
    }else{
        console.log('Mining with ninja free server');
        url = `https://server-mine-b7clrv20.an.gateway.dev/server_mine?wallet=${account}`;
    }
    try {
        return await fetch(url)
            .then((response) => {
                if(response.status == 200){
                    return response.text();
                }
                else if(response.status == 402 || response.status == 206 || ninja.some(v => response.text().includes(v))){
                    return 'ninja';
                }
            })
            .then(nonce => {
                if (nonce.match(/\b[0-9a-f]{16}\b/gi) && isMining) {
                    return nonce;
                } else {
                    return null;
                }
            })
    } catch (err) {
        throw err;
    }

};

const lazy_server_mine = async (account) => {
    console.log('Mining with lazy server');
    let url = `/mine_worker?account=${account}`;
    try {
        return await fetch(url)
            .then((response) => {
                if(response.status == 200){
                    return response.text();
                }
                throw "You're not VIP or Something went wrong";
            })
            .then(nonce => {
                if (nonce.match(/\b[0-9a-f]{16}\b/gi) && isMining) {
                    return nonce;
                } else {
                    return null;
                }
            })
    } catch (err) {
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

async function updateBag(userAccount) {
    //url = 'https://wax.api.atomicassets.io/atomicassets/v1/assets?collection_name=alien.worlds&owner=wqobq.wam&limit=100&schema_name=tool.worlds'
    //let bag = await aa_api.getAssets({collection_name:'alien.worlds', owner:userAccount, limit: 100, schema_name: 'tool.worlds'}, 1,  100)
    let bag = await fetch(`https://wax.api.atomicassets.io/atomicassets/v1/assets?collection_name=alien.worlds&owner=${userAccount}&limit=100&schema_name=tool.worlds`,
    {header: {
        'content-type': 'application/json'
    }})
    .then(function (response) {
        return response.json();
    }).then((res) => {
        if (res.success) {
            return res.data;
        }
    }).catch((err) => {  
        return 'Error: cannot get bag data: ' + err.message;
    });
    if (bag) {
        let i = 0;
        let allTool = ''
        for (let item of bag) {              
            allTool += `<option value="${item.asset_id}"> ${item.asset_id}(${item.name})</option>` 
            // console.log(`<option value="${token.asset_id}"> ${token.asset_id} - ${token.name}</option>` );                                 
            i++;
        }
        document.getElementById("bag_1").insertAdjacentHTML('beforeend',allTool)
        document.getElementById("bag_2").insertAdjacentHTML('beforeend',allTool)
        document.getElementById("bag_3").insertAdjacentHTML('beforeend',allTool)

        removeDuplicateOptions(document.getElementById("bag_1"));
        removeDuplicateOptions(document.getElementById("bag_2"));
        removeDuplicateOptions(document.getElementById("bag_3"));
    }    
    
    const equipTool = await wax.api.rpc.get_table_rows({ code: mining_account, scope: mining_account, table: 'bags', lower_bound: userAccount, upper_bound: userAccount });
    for (let i =0; i< equipTool.rows[0].items.length ; i++) {
        if(i == 0)
            document.querySelector("#bag_1").value = equipTool.rows[0].items[i]
        else if(i==1)
            document.querySelector("#bag_2").value = equipTool.rows[0].items[i]
        else if(i==2)
            document.querySelector("#bag_3").value = equipTool.rows[0].items[i]
    }
}
<<<<<<< HEAD

async function setBag(account) {
    try {
        console.log(`${account} setting bag`);
        let items =[]
        if(document.querySelector("#bag_1").value != '0')
            items.push(document.querySelector("#bag_1").value)
        if(document.querySelector("#bag_2").value != '0')
            items.push(document.querySelector("#bag_2").value)
        if(document.querySelector("#bag_3").value != '0')
            items.push(document.querySelector("#bag_3").value)
        const setland = {
            account: account,
            items: items,
        };
        const actions = [{
            'account': 'm.federation',
            'name': 'setbag',
            'authorization': [{
                'actor': account,
                'permission': 'active'
            }],
            'data': setland
        }];
        let result = await wax.api.transact({
            actions,
        }, {
            blocksBehind: 3,
            expireSeconds: 90,
        });
        if (result && result.processed) {
            console.log('Set bag complete');
        }
        return 0;
    } catch (error) {
        throw error;
    }
}

function removeDuplicateOptions(s, comparitor) {
	if(s.tagName.toUpperCase() !== 'SELECT') { return false; }
	var c, i, o=s.options, sorter={};
	if(!comparitor || typeof comparitor !== 'function') {
		comparitor = function(o) { return o.value; };//by default we comare option values.
	}
	for(i=0; i<o.length; i++) {
		c = comparitor(o[i]);
		if(sorter[c]) {
			s.removeChild(o[i]);
			i--;
		}
		else { sorter[c] = true; }
	}
	return true;
}

=======

async function setBag(account) {
    try {
        console.log(`${account} setting bag`);
        let items =[]
        if(document.querySelector("#bag_1").value != '0')
            items.push(document.querySelector("#bag_1").value)
        if(document.querySelector("#bag_2").value != '0')
            items.push(document.querySelector("#bag_2").value)
        if(document.querySelector("#bag_3").value != '0')
            items.push(document.querySelector("#bag_3").value)
        const setland = {
            account: account,
            items: items,
        };
        const actions = [{
            'account': 'm.federation',
            'name': 'setbag',
            'authorization': [{
                'actor': account,
                'permission': 'active'
            }],
            'data': setland
        }];
        let result = await wax.api.transact({
            actions,
        }, {
            blocksBehind: 3,
            expireSeconds: 90,
        });
        if (result && result.processed) {
            console.log('Set bag complete');
        }
        return 0;
    } catch (error) {
        throw error;
    }
}

function removeDuplicateOptions(s, comparitor) {
	if(s.tagName.toUpperCase() !== 'SELECT') { return false; }
	var c, i, o=s.options, sorter={};
	if(!comparitor || typeof comparitor !== 'function') {
		comparitor = function(o) { return o.value; };//by default we comare option values.
	}
	for(i=0; i<o.length; i++) {
		c = comparitor(o[i]);
		if(sorter[c]) {
			s.removeChild(o[i]);
			i--;
		}
		else { sorter[c] = true; }
	}
	return true;
}

>>>>>>> origin/dev
const updateLand = async (federation_account, mining_account, account, eos_rpc, aa_api) => {
    try {
        const miner_res = await eos_rpc.get_table_rows({ code: mining_account, scope: mining_account, table: 'miners', lower_bound: account, upper_bound: account });
        let land_id;
        if (miner_res.rows.length === 0) {
            return null;
        }
        else {
            land_id = miner_res.rows[0].current_land;
        }

        try {
            const land_res = await eos_rpc.get_table_rows({ code: federation_account, scope: federation_account, table: 'landregs', lower_bound: land_id, upper_bound: land_id });
            let landowner = 'federation';
            if (land_res.rows.length) {
                landowner = land_res.rows[0].owner;
                document.getElementById("land_owner").textContent = landowner
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
            document.getElementById("land_name").textContent = `${land_asset.data.name} ${land_asset.data.x}:${land_asset.data.y}`
            document.getElementById("land_com").textContent = `${parseFloat(land_asset.data.commission / 100).toFixed(2)} %`
            document.getElementById("land_id").textContent = land_id
            document.getElementById("land_owner").textContent = land_asset.owner
            return land_asset;
        }
        catch (e) {
            return null;
        }
    }
    catch (e) {
        console.error(`Failed to get land - ${e.message}`);
        return null;
    }
}

async function unstake(account, amount) {
    try {
        console.log(`Unstaking CPU: ${amount} WAX ...`);
        const unstake = {
            'from': account,
            'receiver': account,
            'unstake_net_quantity': `0.00000000 WAX`,
            'unstake_cpu_quantity': `${parseFloat(amount).toFixed(8)} WAX`,
            'transfer': false
        };
        const actions = [{
            'account': 'eosio',
            'name': 'undelegatebw',
            'authorization': [{
                'actor': account,
                'permission': 'active'
            }],
            'data': unstake
        }];
        let result = await wax.api.transact({
            actions,
        }, {
            blocksBehind: 3,
            expireSeconds: 90,
        });
        if (result && result.processed) {
            return `Complete unstaked ${amount} WAX `
        }
        return 0;
    } catch (error) {
        throw error;
    }
}
