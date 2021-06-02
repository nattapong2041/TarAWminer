var isWork = false;
var errorDelay = 5 * (60 * 1000);
var cpuDelay = 5.0 * (60 * 1000);
var mineCountdownTime = 5 * (60 * 1000);
var loginCountdownTime = 3 * (60 * 1000);
var mineCountdownFinishTime = new Date().getTime();
var loginCountdownFinishTime = new Date().getTime();
var interval;
var isMining = false;
var totalget = 0.0;
var minedCount = 0;
let userAccount ="";

function updateStatus(status) {
    document.getElementById("status").textContent = status;
    document.title = status + ': ' + userAccount;
}

function updateNextMine(delay) {
    const time = new Date().getTime()
    const mineTime = new Date(time + delay)
    document.getElementById("next_mine").textContent = padLeadingZeros(mineTime.getHours(),2)  + ':' + padLeadingZeros(mineTime.getMinutes(),2)  + ':' + padLeadingZeros(mineTime.getSeconds(),2);
}

function clearTimer() {
    clearInterval(interval);
    document.getElementById("countdown").innerHTML = "0m 0s";
}

function padLeadingZeros(num, size) {
    var s = num+"";
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
    var now = new Date().getTime();
    var distance = mineCountdownFinishTime - now;
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("countdown").innerHTML = padLeadingZeros(minutes,2) + 'm ' + padLeadingZeros(seconds,2) + 's before mine'
    if (distance < 0) {
        clearTimer();
        document.getElementById("countdown").innerHTML = "trying to mine";
        await miner(document.querySelector('input[name="mining_with"]:checked').value);
    }
}

async function miningCountdownfunction() {
    var now = new Date().getTime();
    var distance = mineCountdownFinishTime - now;
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("countdown").innerHTML = padLeadingZeros(minutes,2) + 'm ' + padLeadingZeros(seconds,2) + 's before new mine'
    if (distance < 0) {
        clearTimer();
        restart();
        document.getElementById("countdown").innerHTML = "restarting";
    }
}

async function loginCountdownfunction() {
    var now = new Date().getTime();
    var distance = loginCountdownFinishTime - now;
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("countdown").innerHTML = padLeadingZeros(minutes,2) + 'm ' + padLeadingZeros(seconds,2) + 's before new login'
    if (distance < 0) {
        clearTimer()
        window.location.reload();
    }
}

async function login() {
    try {
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
                console.log('Complete: ' + result);
            } else {
                console.log('Error: Cannot stake.');
            }
        };
        document.getElementById("run_btn").onclick = async function () {
            onclickRun();
        };
        document.getElementById("run_btn").disabled = true
        clearTimer();
        loginCountdownFinishTime = new Date().getTime() + loginCountdownTime;
        interval = setInterval(loginCountdownfunction, 1000);
        userAccount = await wax.login();
        updateAccount(userAccount);
        if (userAccount != null) {
            clearTimer();
            document.getElementById("countdown").innerHTML = "0m 0s";
            onclickRun();
            document.getElementById("run_btn").disabled = false
        }

    } catch (err) {
        console.log('Error:' + err);
        window.location.reload();
    }

}

function get_cpu_usage(userAccount) {
    //Request URL: https://api.waxsweden.org/v1/chain/get_account
}

function get_current_tlm(userAccount) {
    //https://wax.eosrio.io/v2/state/get_tokens?account={account}
}

async function run() {
    isWork = true;
    while (isWork) {
        if (!isMining) {
            clearTimer();
            console.log('getting cooldown');
            isMining = true

            //calculate delay
            let delay = await getMineDelay(userAccount);
            let addRandom = Math.floor(Math.random() * 21000) + 4000;
            let totalDelay = 0;
            if (Number.isInteger(delay)) {
                totalDelay = delay + addRandom;
            } else {
                totalDelay = addRandom;
            }
            console.log('Total cooldown: ' + totalDelay / 1000 + 'sec AWCooldown: ' + delay / 1000 + ' Add random time: ' + addRandom / 1000 + 'sec')
            updateStatus('charging')
            updateNextMine(totalDelay)
            mineCountdownFinishTime = new Date().getTime() + totalDelay;
            interval = setInterval(chargingCountdownfunction, 1000);
        }
        await sleep(1000);
    }
}

async function miner(mine_with) {
    //Mining
    updateStatus('waiting to mine...')
    updateStatus('mining');
    mineCountdownFinishTime = new Date().getTime() + mineCountdownTime;
    interval = setInterval(miningCountdownfunction, 1000);
    let nonce = null
    if (mine_with == 'ninja' || mine_with == 'ninja_vip' ) {
        try {
            if(mine_with == 'ninja_vip'){
                nonce = await ninja_server_mine(userAccount,true);
            }else{
                nonce = await ninja_server_mine(userAccount,false);
            }
            
            if(nonce == 'ninja'){
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
    } else if (mine_with == 'self') {
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
            totalget += parseFloat(result.replace(" TLM", ""));
            minedCount += 1;
            let currdate = new Date();
            document.getElementById("last_mine").textContent = result + ' at ' + padLeadingZeros(currdate.getHours(),2)  + ':' + padLeadingZeros(currdate.getMinutes(),2)  + ':' + padLeadingZeros(currdate.getSeconds(),2);
            document.getElementById("toal_get").textContent = totalget.toFixed(4) + ' TLM with ' + minedCount + ' Times';
            clearTimer();
        } catch (error) {
            updateStatus(error)
            const errorRes = handleError(error)
            console.log('error: ' + error);
            if (errorRes == 'restart') {
                updateStatus('Normal error wait: ' + 2 + ' min')
                updateNextMine(120 * 1000)
                clearTimer();
                mineCountdownFinishTime = new Date().getTime() + 120 * 1000;
                interval = setInterval(miningCountdownfunction, 1000);
            }else if (errorRes == 'mining') {
                updateStatus('Error while find answer wait: ' + 2 + ' min')
                if(document.querySelector('input[name="mining_with"]:checked').value == 'ninja'){
                    document.getElementById("self").checked = true;
                }
                updateNextMine(120 * 1000)
                clearTimer();
                mineCountdownFinishTime = new Date().getTime() + 120 * 1000;
                interval = setInterval(miningCountdownfunction, 1000);
            } else if (errorRes == 'cpu') {
                if(document.getElementById("cpu_time").value > 0){
                    cpuDelay = document.getElementById("cpu_time").value * 60 * 1000;
                }
                updateStatus('Cpu full wait: ' + cpuDelay / (60 * 1000) + ' min')
                updateNextMine(cpuDelay)
                clearTimer();
                mineCountdownFinishTime = new Date().getTime() + cpuDelay;
                interval = setInterval(miningCountdownfunction, 1000);
            } else if (errorRes == 'newTx') {
                updateStatus('User start new transaction wait: ' + 10 + ' sec')
                updateNextMine(10 * 1000)
                clearTimer();
                mineCountdownFinishTime = new Date().getTime() + 10*1000;
                interval = setInterval(miningCountdownfunction, 1000);
            } else if (errorRes == 'wait') {
                updateStatus('Unknow error wait: ' + errorDelay / (60 * 1000) + ' min')
                updateNextMine(errorDelay)
                clearTimer();
                mineCountdownFinishTime = new Date().getTime() + errorDelay;
                interval = setInterval(miningCountdownfunction, 1000);
            }
            else if (errorRes == 'break') {
                updateStatus('Nothing to be mine wait : ' + 60 + ' min')
                updateNextMine(60 * 60 * 1000)
                clearTimer();
                mineCountdownFinishTime = new Date().getTime() + 60 * 60 * 1000;
                interval = setInterval(miningCountdownfunction, 1000);
            }
            else {
                updateStatus('Unknow error wait: ' + errorDelay / (60 * 1000) + ' min')
                updateNextMine(errorDelay)
                clearTimer();
                mineCountdownFinishTime = new Date().getTime() + errorDelay;
                interval = setInterval(miningCountdownfunction, 1000);
            }
        }
        if (result != null) {
            updateStatus('mining success sleeping')
            isMining = false;
            await sleep(10000);
        }
        console.log('-------------------');
    }
}
function handleError(error) {
    const normalErr = ['declined', 'expired', 'soon', 'User' ,'Failed']
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
    else if (error.message.includes('nothing')) {
        return 'break'
    } else {
        return 'wait'
    }
}

function stop() {
    clearTimer();
    isMining = false
    isWork = false;
}

function onclickRun() {
    if (isWork) {
        stop();
        updateStatus('STOPPING')
        console.log('======== STOPPING ========');
        document.getElementById("run_btn").textContent = "Click to Start"
        document.getElementById("run_btn").className = "btn btn-success"
    } else {
        isWork = true;
        updateStatus('RUNNING')
        console.log('======== RUNNING ========');
        run();
        document.getElementById("run_btn").textContent = "Click to STOP"
        document.getElementById("run_btn").className = "btn btn-danger"
    }

}

function restart() {
    stop();
    run();
}