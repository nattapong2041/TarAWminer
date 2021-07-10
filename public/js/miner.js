async function self_mine(account, oldnonce) {
    console.log('Try self mining');
    let mine_work = await background_mine2(account, oldnonce)
    try {
        return mine_work.rand_str;
    } catch (err) {
        throw err;
    }
}

const ninja_server_mine = async (account, isVIP) => {
    const ninja = ['Rate', 'rate', 'Limit', 'limit']

    let url = `https://server-mine-b7clrv20.an.gateway.dev/server_mine?wallet=${account}`;
    if (isVIP == true) {
        console.log('Mining with ninja vip server');
        url = `https://server-mine-b7clrv20.an.gateway.dev/server_mine_vip?wallet=${account}`;
    } else {
        console.log('Mining with ninja free server');
        url = `https://server-mine-b7clrv20.an.gateway.dev/server_mine?wallet=${account}`;
    }
    try {
        return await fetch(url)
            .then((response) => {
                if (response.status == 200) {
                    return response.text();
                }
                else if (response.status == 402 || response.status == 206 || ninja.some(v => response.text().includes(v))) {
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
                if (response.status == 200) {
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

const background_mine2 = async (account) => {
    return new Promise(async (resolve, reject) => {
        const bagDifficulty = await getBagDifficulty(account);
        const landDifficulty = await getLandDifficulty(account);
        const difficulty = bagDifficulty + landDifficulty;

        const last_mine_tx = await lastMineTx(mining_account, account, wax.api.rpc);

        doWorkWorker2({ mining_account, account, difficulty, last_mine_tx }).then(
            (mine_work) => {
                resolve(mine_work);
            }
        );
    });
};


const fromHexString = hexString =>
    new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

const getRand = () => {
        const arr = new Uint8Array(8);
        for (let i = 0; i < 8; i++) {
            const rand = Math.floor(Math.random() * 255);
            arr[i] = rand;
        }
        return arr;
};

const nameToArray = (name) => {
    const sb = new Serialize.SerialBuffer({
        textEncoder: new TextEncoder,
        textDecoder: new TextDecoder
    });

    sb.pushName(name);

    return sb.array;
}

const toHex = (buffer) => {
    return [...new Uint8Array(buffer)]
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
};

const doWorkWorker2 = async (mining_params) => {
    mining_params.last_mine_tx = mining_params.last_mine_tx.substr(0, 16); // only first 8 bytes of txid
    mining_params.last_mine_arr = fromHexString(mining_params.last_mine_tx);

    mining_params.account_str = mining_params.account;
    mining_params.account = nameToArray(mining_params.account);

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
            if (oldNonce) {
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
    if (!isMining) {
        const mine_work = {
            account: account_str,
            rand_str: null,
            hex_digest: hex_digest
        };
        this.postMessage(mine_work);
        return mine_work;
    } else {
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
