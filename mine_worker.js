const { parentPort } = require("worker_threads");
const crypto = require('crypto');

//parentPort.postMessage(getMineWork(workerData.account, workerData.account_str, workerData.difficulty, workerData.last_mine_arr))
parentPort.on("message", workerData => {
    parentPort.postMessage(getMineWork(workerData.account, workerData.account_str, workerData.difficulty, workerData.last_mine_arr));
  })
function getMineWork(account, account_str, difficulty, last_mine_arr) {
    const toHexString = bytes =>
        bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');

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
}