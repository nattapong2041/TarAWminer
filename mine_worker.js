const { parentPort } = require("worker_threads");
const { Api, JsonRpc, Serialize } = require('eosjs');
const mining_account = "m.federation";
const federation_account = "federation";
const { Worker } = require("worker_threads");
const { log } = require('console');

//parentPort.postMessage(getMineWork(workerData.account, workerData.account_str, workerData.difficulty, workerData.last_mine_arr))
parentPort.on("message", workerData => {
    parentPort.postMessage(background_mine(workerData.account));
})
  
const base_api = [
    'https://wax.pink.gg',
    'https://wax.greymass.com',
    'https://chain.wax.io',
    'https://wax.cryptolions.io',
    'https://wax.dapplica.io',
]

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
        mining_params.delay += bag[b].data.data.delay;
        mining_params.difficulty += bag[b].data.data.difficulty;
        mining_params.ease += bag[b].data.data.ease / 10;
    }

    if (bag.length === 2) {
        mining_params.delay -= parseInt(min_delay / 2);
    }
    else if (bag.length === 3) {
        mining_params.delay -= min_delay;
    }
    return mining_params;
};

const getLandById = async (land_id) => {
    try {
        const land_res = await get_table_rows('landregs', land_id, land_id);
        let landowner = 'federation';
        if (land_res.rows.length) {
            landowner = land_res.rows[0].owner;
        }

        if (!landowner) {
            throw new Error(`Land owner not found for land id ${land_id}`);
        }
        const land = await get_assets(land_id);
        return land.data;
    }
    catch (e) {
        return null;
    }
}

const getLand = async (account) => {
    try {
        const miner_res = await get_table_rows('miners', account, account);
        let land_id;
        if (miner_res.rows.length === 0) {
            return null;
        }
        else {
            land_id = miner_res.rows[0].current_land;
        }

        return await getLandById(land_id);
    }
    catch (e) {
        console.error(`Failed to get land - ${e.message}`);
        return null;
    }
}

const getBag = async (account) => {
    const bag_res = await get_table_rows('bags', account, account);
    const bag = [];
    if (bag_res.rows.length) {
        const items_p = bag_res.rows[0].items.map((item_id) => {
            return get_assets(item_id);
        });
        return await Promise.all(items_p);
    }
    return bag;
}

const getBagDifficulty = async function (account) {
    try {
        const bag = await getBag(account);
        const params = getBagMiningParams(bag);
        return params.difficulty;
    } catch (error) {
        return error;
    }
};

const getLandDifficulty = async function (account) {
    try {
        const land = await getLand(account);
        return land.data.difficulty;
    } catch (error) {
        return error;
    }
};


const lastMineTx = async (account) => {
    const state_res = await get_table_rows(
        'miners',
        account,
        account
    );
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
    account = account.slice(0, 8);
    const is_wam = account_str.substr(-4) === '.wam';
    let good = false,
        itr = 0,
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
        hash = crypto.createHash('sha256').update(combined.slice(0, 24)).digest('Uint8Array');
        hex_digest = toHexString(hash);

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
        // if (itr % 1000000 === 0) {
        //     console.log(`Still mining - tried ${itr} iterations`);
        // }

        if (!good) {
            hash = null;
        }

        if (itr >= 1000000 * 10) return null;
    }
    const end = (new Date()).getTime();
    const rand_str = toHexString(rand_arr);
    console.log('====================');
    console.log(`Acc: ${account_str} Nonce: ${rand_str} Hex: ${hex_digest}`)
    console.log(`Found hash in ${itr} iterations taking ${(end - start) / 1000}s`)
    console.log('====================');
    //const mine_work = { account: account_str, nonce: rand_str, answer: hex_digest };
    return rand_str
};

const background_mine = async (account) => {
    return new Promise(async (resolve, reject) => {
        const bagDifficulty = await getBagDifficulty(account);
        const landDifficulty = await getLandDifficulty(account);
        const difficulty = bagDifficulty + landDifficulty;
        const last_mine_tx = await lastMineTx(account);
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
