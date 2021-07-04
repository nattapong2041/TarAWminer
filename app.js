const express = require('express')
const crypto = require('crypto');
const { Serialize } = require('eosjs');
const mining_account = "m.federation";
const federation_account = "federation";
const axios = require('axios').default;
var app = express()
const port = 8080;

var cors = require('cors')
app.use(cors())

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render("index", {});
});

app.get('/create', (req, res) => {
    res.render("create", {});
});

app.get('/mine_worker', (async (req, res) => {
    let account = req.query.account;
    let oldNonce = req.query.nonce;
    if (account == undefined) {
        res.status(400);
        res.send('Not a wax account');
    }
    account = account.match(/^[a-z0-9.]{4,5}(?:.wam)/gm)
    if (!account || typeof account == "undefined" || account == '' || account == null) {
        res.status(400);
        res.send('Not a wax account');
    } else {
        account = account[0];
        await background_mine(account,oldNonce).then((nonce) => {
            if (nonce.rand_str != null && nonce.rand_str.match(/\b[0-9a-f]{16}\b/gi)) {
                res.status(200);
                res.send(nonce.rand_str);
            } else {
                res.status(500);
                res.send(null);
            }
        }).catch((err) => {
            console.log(err);
            res.status(500);
            res.send(null);
        })
    }

}));

app.post('/noti_line', (req, res) => {
    console.log(req.body);
    // let lineNotify = require('line-notify-nodejs')(req.body.token);
    // lineNotify.notify({
    //   message: req.body.message,
    // }).then(() => {
    //   res.send('complete')
    // });
});
app.listen(port, "0.0.0.0");
console.log("Starting Server. port " + port);
console.log("http://localhost:" + port);

const base_api = [
    'https://wax.greymass.com',
    'https://wax.pink.gg',
]
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
axios.defaults.headers.post['Content-Type'] = 'application/json';
async function get_table_rows(table, lower_bound, upper_bound) {
    let index = getRandom(0, base_api.length)
    const url = `${base_api[index]}/v1/chain/get_table_rows`
    return await axios.post(url, {
        json: true,
        code: table == "landregs" ? federation_account : mining_account,
        scope: table == "landregs" ? federation_account : mining_account,
        table: table,
        lower_bound: lower_bound,
        upper_bound: upper_bound
    }).then(res => res.data)
        .then((json) => {
            return json
        })
        .catch((err) => {
            console.log('' + err.message);
            return false;
        });
}
async function get_assets(assestId) {
    const url = `https://wax.api.atomicassets.io/atomicassets/v1/assets/${assestId}`
    return await axios.get(url).then(res => res.data)
        .then((json) => {
            return json
        })
        .catch((err) => {
            console.log('' + err.message);
            return false;
        });
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
        const land_res = await get_table_rows('landregs', land_id, land_id)
            .then((resutl) => {
                return resutl
            })
            .catch((err) => {
                console.log('' + err.message);
                return null;
            });
        let landowner = 'federation';
        if (land_res.rows.length) {
            landowner = land_res.rows[0].owner;
        }

        if (!landowner) {
            throw new Error(`Land owner not found for land id ${land_id}`);
        }
        const land = await get_assets(land_id).then((resutl) => {
            return resutl
        })
            .catch((err) => {
                console.log('' + err.message);
                return null;
            });
        return land.data;
    }
    catch (e) {
        return null;
    }
}

const getLand = async (account) => {
    try {
        const miner_res = await get_table_rows('miners', account, account)
            .then((resutl) => {
                return resutl
            })
            .catch((err) => {
                console.log('' + err.message);
                return null;
            });
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
    const bag_res = await get_table_rows('bags', account, account).then((resutl) => {
        return resutl
    })
        .catch((err) => {
            console.log('' + err.message);
            return null;
        });
    const bag = [];
    if (bag_res.rows.length) {
        const items_p = bag_res.rows[0].items.map((item_id) => {
            return get_assets(item_id).then((resutl) => {
                return resutl
            })
                .catch((err) => {
                    console.log('' + err.message);
                    return null;
                });
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
    ).then((resutl) => {
        return resutl
    })
        .catch((err) => {
            console.log('' + err.message);
            return null;
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

    let { mining_account, account, account_str, difficulty, last_mine_tx, last_mine_arr, oldNonce } = mining_params
    account = account.slice(0, 8);
    if (typeof difficulty != 'number') difficulty = 0
    const is_wam = account_str.substr(-4) === '.wam';
    let good = false,
        itr = 0,
        rand = 0,
        hash,
        hex_digest,
        rand_arr,
        last;
    const start = new Date().getTime();

    difficulty = 0;
    while (!good) {
        rand_arr = getRand();
        if (itr == 0) {
            if (oldNonce)
                rand_arr = fromHexString(oldNonce)
        }
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
        if (!good) {
            hash = null;
        }
        if (itr >= 1000000 * 6) break;
    }


    const end = new Date().getTime();
    const rand_str = toHexString(rand_arr);
    console.log(`Account: ${account_str} \n found answer ${rand_str} in ${itr} iterations taking ${(end - start) / 1000}s`);
    const mine_work = {
        account: account_str,
        rand_str: rand_str,
        hex_digest: hex_digest
    };
    return mine_work;
};

const background_mine = async (account,oldNonce) => {
    return new Promise(async (resolve, reject) => {
        const bagDifficulty = await getBagDifficulty(account)
            .then((result) => result).catch((error) => {
                return 0;
            });
        const landDifficulty = await getLandDifficulty(account)
            .then((result) => result).catch((error) => {
                return 0;
            });
        const difficulty = bagDifficulty + landDifficulty;
        const last_mine_tx = await lastMineTx(account).catch((err) => reject(err))
        doWorkWorker({
            mining_account,
            account,
            difficulty,
            last_mine_tx,
            oldNonce
        }).then((mine_work) => {
            resolve(mine_work);
        }).catch((err) => reject(err))
    }).then((result)=> result).catch((err) =>{
        console.log(err);
        return null;
    } )
};
