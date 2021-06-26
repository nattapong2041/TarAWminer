var errorDelay = 5 * (60 * 1000);
var cpuDelay = 5.0 * (60 * 1000);
var mineCountdownTime = 5 * (60 * 1000);
var loginCountdownTime = 3 * (60 * 1000);
var mineCountdownFinishTime = new Date().getTime();
var loginCountdownFinishTime = new Date().getTime();
var claimCountdownFinishTime = new Date().getTime();
var delay = 0;
var nextmine = 0;
var isMining = false;

var minedCount = 0;

var totalget = 0.0;
var lastTLM = 0;

var mineInterval;
var newMineInterval;
var loginInterval;
var nftInterval;

var userAccount = "";

function saveConfig() {
    console.log('**SAVE CONFIG**');
    localStorage.setItem('mining_with', document.querySelector('input[name="mining_with"]:checked').value)
    localStorage.setItem('cpu_time', document.getElementById("cpu_time").value);
    localStorage.setItem('need_real_tlm', document.querySelector("#need_real_tlm").checked);
    //auto update wax
    localStorage.setItem('auto_update', document.querySelector("#auto_update").checked);
    //autoclaim
    localStorage.setItem('auto_claim', document.querySelector("#auto_claim").checked);
    localStorage.setItem('auto_claim_time', document.getElementById("auto_claim_time").value);
    //localStorage.setItem('auto_claim_time', document.getElementById("auto_claim_time").value);
}

function loadConfig() {
    if (localStorage.getItem('mining_with') != null) {
        document.getElementById(localStorage.getItem('mining_with')).checked = true;
    }
    if (localStorage.getItem('cpu_time') != null) {
        document.getElementById("cpu_time").value = localStorage.getItem('cpu_time');
    }
    if (localStorage.getItem('need_real_tlm') != null && localStorage.getItem('need_real_tlm') == 'true') {
        document.querySelector("#need_real_tlm").checked = true;
    }
    //AutoUpdateWax
    if (localStorage.getItem('auto_update') != null && localStorage.getItem('auto_update') == 'false') {
        console.log('WTF: ' + localStorage.getItem('auto_update'));
        document.querySelector("#auto_update").checked = false;
    }
    //AutoClaim
    if (localStorage.getItem('auto_claim') != null && localStorage.getItem('auto_claim') == 'true') {
        document.querySelector("#auto_claim").checked = localStorage.getItem('auto_claim');
    }
    if (localStorage.getItem('auto_claim_time') != null) {
        document.getElementById("auto_claim_time").value = localStorage.getItem('auto_claim_time');
    }
}

async function autoClaimNFT() {
    let now = new Date().getTime();
    var distance = claimCountdownFinishTime - now;
    if (distance <= 0) {
        clearInterval(nftInterval);
        claimCountdownFinishTime = new Date().getTime() + (document.getElementById("auto_claim_time").value * 60 * 1000);
        let check = false;
        console.log('Checking NFTs drop');
        check = await checkNFT(userAccount);
        if (check) {
            let result = await claimNFT(userAccount, userAccount);
            if (result != 0 && result != null) {
                console.log('Complete: ' + result);
            } else {
                console.log('Error: Claimed NFT.');
            }
        }
    }
}
function updateStatus(status) {
    document.getElementById("status").textContent = status;
    document.title = status + ': ' + userAccount;
}

async function updateAccStatus() {
    try {
        let status = await getAccount(userAccount);

        if (status.cpu_limit) {
            document.getElementById("cpu_limit").textContent = (status.cpu_limit.used / status.cpu_limit.max * 100).toFixed(2) + ' %';
        }
        else {
            document.getElementById("cpu_limit").textContent = "cannot get cpu litmit";
        }
        if (status.total_resources) {
            let stake = (status.total_resources.cpu_weight).split(" ");
            document.getElementById("cpu_stake").textContent = parseFloat(stake[0]).toFixed(4) + ' ' + stake[1]
        }
        else {
            document.getElementById("cpu_stake").textContent = "cannot cpu get stake";
        }
        if (status.core_liquid_balance) {
            let wax = (status.core_liquid_balance).split(" ");
            document.getElementById("wax_balance").textContent = parseFloat(wax[0]).toFixed(4) + ' ' + wax[1];
        }
        else {
            document.getElementById("wax_balance").textContent = "cannot get wax balance"
        }
        await getLand(federation_account, mining_account, userAccount, wax.api.rpc, aa_api);
        await updateBag(userAccount)
    } catch {
        console.log('Error while update account details');
    }
}

async function updateTLM() {
    try {
        let tlm = await getTLM(userAccount);
        if (tlm) {
            lastTLM = tlm;
            document.getElementById("tlm_balance").textContent = tlm + ' TLM';
        }
        else {
            document.getElementById("tlm_balance").textContent = "cannot get tlm balance";
        }
    } catch {
        console.log('Error while update account details');
    }
}

function updateNextMine(delay) {
    const time = new Date().getTime()
    const mineTime = new Date(time + delay)
    document.getElementById("next_mine").textContent = padLeadingZeros(mineTime.getHours(), 2) + ':' + padLeadingZeros(mineTime.getMinutes(), 2) + ':' + padLeadingZeros(mineTime.getSeconds(), 2);
}

function clearTimer() {
    if (loginInterval) {
        clearInterval(loginInterval);
    }
    if (newMineInterval) {
        clearInterval(newMineInterval);
    }
    if (mineInterval) {
        clearInterval(mineInterval);
    }
    document.getElementById("countdown").innerHTML = "0m 0s";
}

function padLeadingZeros(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function updateAccount(userAccount) {
    document.getElementById("user_account").textContent = userAccount;
    document.getElementById("wax_bloks").href = 'https://wax.bloks.io/account/' + userAccount
    document.getElementById("atomic_hub").href = 'https://wax.atomichub.io/profile/' + userAccount
}


async function chargingCountdownfunction() {
    if (newMineInterval) {
        clearInterval(newMineInterval);
    }
    var now = new Date().getTime();
    var distance = mineCountdownFinishTime - now;
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("countdown").innerHTML = padLeadingZeros(minutes, 2) + 'm ' + padLeadingZeros(seconds, 2) + 's before mine'
    if (distance < 0) {
        clearTimer();
        document.getElementById("countdown").innerHTML = "trying to mine";
        await miner(document.querySelector('input[name="mining_with"]:checked').value);
    }
}

async function miningCountdownfunction() {
    if (mineInterval) {
        clearInterval(mineInterval);
    }
    var now = new Date().getTime();
    var distance = mineCountdownFinishTime - now;
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("countdown").innerHTML = padLeadingZeros(minutes, 2) + 'm ' + padLeadingZeros(seconds, 2) + 's before new mine'
    if (distance < 0) {
        clearTimer();
        await restart();
        document.getElementById("countdown").innerHTML = "restarting";
    }
}

async function loginCountdownfunction() {
    var now = new Date().getTime();
    var distance = loginCountdownFinishTime - now;
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("countdown").innerHTML = padLeadingZeros(minutes, 2) + 'm ' + padLeadingZeros(seconds, 2) + 's before new login'
    if (distance < 0) {
        window.location.reload();
    }
}

async function login() {
    try {
        // document.getElementById("test").onclick = async function () {
        //     try {
        //         let result = await getAccount(userAccount);
        //         updateAccStatus(result);
        //     } catch (err) {
        //         throw err;
        //     }
        // };
        document.getElementById("update_detail").onclick = async function () {
            try {
                updateAccStatus();
                updateTLM()
            } catch (err) {
                throw err;
            }
        };
        document.getElementById("save_bag").onclick = async function () {
            try {
                await setBag(userAccount)
            } catch (err) {
                throw err;
            }
        };
        // document.getElementById("wax_server").textContent = 'Wax server: ' + url;
        document.getElementById("swap_btn").onclick = async function () {
            let result = await swap(userAccount, document.getElementById("swap_tlm").value)
            if (result != 0 && result != null) {
                console.log('Complete: ' + result);
            } else {
                console.log('Error: Cannot swap TLM.');
            }
        };
        document.getElementById("land_btn").onclick = async function () {
            let result = null
            try {
                result = await setLand(userAccount, document.getElementById("set_land").value)
            } catch (error) {
                console.log(error);
            }
            if (result != 0 && result != null) {
                console.log('Complete: ' + result);
            } else {
                console.log('Error: Cannot set land.');
            }
        };
        document.getElementById("send_btn").onclick = async function () {
            let result = await transfer(userAccount, document.getElementById("send_wax").value, document.getElementById("to_acc").value, document.getElementById("memo").value)
            if (result != 0 && result != null) {
                console.log('Complete: ' + result);
            } else {
                console.log('Error: Cannot transfer.');
            }
        };
        document.getElementById("claim_btn").onclick = async function () {
            let result = await claimNFT(userAccount, document.getElementById("claim_nft_acc").value)
            if (result != 0 && result != null) {
                console.log('Complete: ' + result);
            } else {
                console.log('Error: Claimed NFT.');
            }
        };
        document.getElementById("stake_btn").onclick = async function () {
            let result = await stake(userAccount, document.getElementById("stake").value)
            if (result != 0 && result != null) {
                console.log('' + result);
            } else {
                console.log('Error: Cannot stake.');
            }
        };
        document.getElementById("unstake_btn").onclick = async function () {
            let result = await unstake(userAccount, document.getElementById("stake").value)
            if (result != 0 && result != null) {
                console.log('' + result);
            } else {
                console.log('Error: Cannot unstake.');
            }
        };
        document.getElementById("run_btn").onclick = async function () {
            onclickRun();
        };
        document.getElementById("save_config").onclick = async function () {
            saveConfig();
        };
        document.getElementById("run_btn").disabled = true
        loginCountdownFinishTime = new Date().getTime() + loginCountdownTime;
        loginInterval = setInterval(loginCountdownfunction, 1000);
        userAccount = await wax.login();
        updateAccount(userAccount);
        if (userAccount != null) {
            clearTimer()
            document.getElementById("countdown").innerHTML = "0m 0s";
            document.getElementById("run_btn").disabled = false
            await updateBag(userAccount)
            onclickRun();
        }

    } catch (err) {
        console.log(err);
        await sleep(15000);
        window.location.reload();
    }

}

async function run() {
    if (!isMining) {
        isMining = true

        //calculate delay
        if (delay == 0) {
            console.log('getting cooldown');
            delay = await getMineDelay(userAccount).then(function (response) {
                if (response == -1) throw 'Cannot get cooldown'
                return response;
            }).catch((err) => {
                // url = base_api[getRandom(0, base_api.length-2)];
                // wax = new waxjs.WaxJS(url);
                // document.getElementById("wax_server").textContent = 'Wax server: ' + url;
                // console.log('change wax server to: ' + url);
                return 0;
            });
            await sleep(3000);
            let addRandom = Math.floor(Math.random() * 21000) + 4000;
            let totalDelay = 0;
            if (Number.isInteger(delay)) {
                totalDelay = delay + addRandom;
            } else {
                totalDelay = addRandom;
            }
            if (document.getElementById("auto_claim").checked) {
                if (document.getElementById("auto_claim_time").value >= 0) {
                    let now = new Date().getTime();
                    if((claimCountdownFinishTime - now) <=0){
                        nftInterval = setInterval(autoClaimNFT,  1000);
                    }
                }
            }
            console.log('Cooldown total: ' + totalDelay / 1000 + 'sec Mine: ' + delay / 1000 + ' Add: ' + addRandom / 1000 + 'sec')
            updateStatus('charging')
            updateNextMine(totalDelay)
            if (document.getElementById("auto_update").checked) {
                updateAccStatus();
            }
            updateTLM();
            mineCountdownFinishTime = new Date().getTime() + totalDelay;
            mineInterval = setInterval(chargingCountdownfunction, 1000);
        }

    }
}

async function miner(mine_with) {
    //Mining
    updateStatus('waiting to mine...')
    updateStatus('mining');
    mineCountdownFinishTime = new Date().getTime() + mineCountdownTime;
    newMineInterval = setInterval(miningCountdownfunction, 1000);
    let nonce = null
    if (mine_with == 'ninja' || mine_with == 'ninja_vip') {
        try {
            if (mine_with == 'ninja_vip') {
                nonce = await ninja_server_mine(userAccount, true);
            } else {
                nonce = await ninja_server_mine(userAccount, false);
            }
            if (nonce == 'ninja') {
                document.getElementById("self").checked = true;
                throw 'Ninja server reach rate limit';
            }
        } catch (err) {
            console.log('Error with ninja-sever mining: : ' + err);
            try {
                nonce = await self_mine(userAccount);
            } catch (err) {
                console.log('Error with self mining: ' + err);
                nonce = null;
            }
        }
    } else if (mine_with == 'lazy') {
        try {
            nonce = await lazy_server_mine(userAccount);
        } catch (err) {
            console.log('Error with lazy server mining: ' + err);
            nonce = null;
        }
    }else if (mine_with == 'self') {
        try {
            nonce = await self_mine(userAccount);
        } catch (err) {
            console.log('Error with self mining: ' + err);
            nonce = null;
        }
    }

    if (nonce != null) {
        updateStatus('claiming')
        let result = null
        try {
            console.log(`account:${userAccount} || answer:${nonce}`);
            result = await claim(userAccount, nonce);
            totalget += parseFloat(result);
            minedCount += 1;
            let currdate = new Date();
            document.getElementById("last_mine").textContent = result + ' at ' + padLeadingZeros(currdate.getHours(), 2) + ':' + padLeadingZeros(currdate.getMinutes(), 2) + ':' + padLeadingZeros(currdate.getSeconds(), 2);
            document.getElementById("toal_get").textContent = totalget.toFixed(4) + ' TLM with ' + minedCount + ' Times';
        } catch (error) {
            updateStatus(error)
            const errorRes = handleError(error)
            console.log('' + error);
            if (errorRes == 'restart') {
                updateStatus('Normal error wait: ' + 2 + ' min')
                nextmine = 120 * 1000;
                updateNextMine(nextmine)
            } else if (errorRes == 'mining') {
                updateStatus('Error while find answer wait: ' + 2 + ' min')
                if (document.querySelector('input[name="mining_with"]:checked').value == 'ninja') {
                    document.getElementById("self").checked = true;
                }
                nextmine = 120 * 1000;
                updateNextMine(nextmine)
            } else if (errorRes == 'cpu') {
                if (document.getElementById("cpu_time").value > 0) {
                    cpuDelay = document.getElementById("cpu_time").value * 60 * 1000;
                }
                updateStatus('Cpu full wait: ' + cpuDelay / (60 * 1000) + ' min')
                nextmine = cpuDelay;
                updateNextMine(nextmine)
            } else if (errorRes == 'newTx') {
                updateStatus('User start new transaction wait: ' + 10 + ' sec')
                nextmine = 10 * 1000;
                updateNextMine(nextmine)
            } else if (errorRes == 'timeout') {
                updateStatus('Approve timeout: ' + 10 + ' sec')
                nextmine = 10 * 1000;
                updateNextMine(nextmine)
            }
            else if (errorRes == 'wait') {
                updateStatus('Unknow error wait: ' + errorDelay / (60 * 1000) + ' min')
                nextmine = errorDelay;
                updateNextMine(nextmine)
            }
            else if (errorRes == 'break') {
                updateStatus('Nothing to be mine wait : ' + 60 + ' min')
                nextmine = 60 * 60 * 1000;
                updateNextMine(nextmine)
            }
            else {
                updateStatus('Unknow error wait: ' + errorDelay / (60 * 1000) + ' min')
                nextmine = errorDelay;
                updateNextMine(nextmine)
            }
        }
        console.log('-------------------');
        if (result != null) {
            delay = 0;
            clearTimer();
            updateStatus('mining success sleeping')
            isMining = false;
            await sleep(10000);
            run();
        }
        else {
            delay = 0;
            clearTimer();
            await sleep(5000);
            mineCountdownFinishTime = new Date().getTime() + nextmine;
            newMineInterval = setInterval(miningCountdownfunction, 1000);
        }

    }
}
function handleError(error) {
    const normalErr = ['declined', 'expired', 'soon', 'User', 'Failed']
    const mining = ['Invalid', 'limit']
    if (error.message.includes('CPU time')) {
        return 'cpu'
    }
    else if (error.message.includes('started a new transaction')) {
        return 'newTx'
    }
    else if (mining.some(v => error.message.includes(v))) {
        return 'mining';
    }
    else if (normalErr.some(v => error.message.includes(v))) {
        return 'restart'
    }
    else if (error.message.includes('timeout')) {
        return 'timeout'
    }
    else if (error.message.includes('nothing')) {
        return 'break'
    } else {
        return 'wait'
    }
}

function stop() {
    clearTimer();
    delay = 0;
    isMining = false
}

async function restart() {
    stop();
    await sleep(5000);
    run();
}

function onclickRun() {
    if (isMining) {
        stop();
        updateStatus('STOPPING')
        console.log('**STOPPING**');
        document.getElementById("run_btn").textContent = "Click to Start"
        document.getElementById("run_btn").className = "btn btn-success"
    } else {
        updateStatus('RUNNING')
        console.log('**RUNNING**');
        document.getElementById("run_btn").textContent = "Click to STOP"
        document.getElementById("run_btn").className = "btn btn-danger"
        delay = 0;
        run();
    }

}

