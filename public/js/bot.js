var isWork = false;
var errorDelay = 5 * (60 * 1000);
var cpuDelay = 30 * (60 * 1000);
var mineCountdownTime = 3 * (60 * 1000);
var loginCountdownTime = 3 * (60 * 1000);
var mineCountdownFinishTime = new Date().getTime();
var loginCountdownFinishTime = new Date().getTime();
var interval;
var isMining = false;
var totalget = 0.0;
var minedCount = 0;
function updateState(state) {
    document.getElementById("status").textContent = state;
    document.title = state + ': ' + userAccount;
}

function updateNextMine(delay) {
    const time = new Date().getTime()
    const mineTime = new Date(time + delay)
    document.getElementById("next_mine").textContent = mineTime.toLocaleString()
}

function clearTimer() {
    clearInterval(interval);
    document.getElementById("countdown").innerHTML = "0m 0s";
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function updateAccount(userAccount) {
    document.getElementById("user_account").textContent = 'Account: ' + userAccount;
}


async function chargingCountdownfunction() {
    var now = new Date().getTime();
    var distance = mineCountdownFinishTime - now;
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("countdown").innerHTML = minutes + "m " + seconds + "s " + 'before mine';
    if (distance < 0) {
        clearTimer();
        document.getElementById("countdown").innerHTML = "trying to mine";
        await miner();  
    }
}

async function miningCountdownfunction() {
    var now = new Date().getTime();
    var distance = mineCountdownFinishTime - now;
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("countdown").innerHTML = minutes + "m " + seconds + "s " + 'before new mine';
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
    document.getElementById("countdown").innerHTML = minutes + "m " + seconds + "s " + 'before new login';
    if (distance < 0) {
        clearTimer()
        window.location.reload();
    }
}

async function login() {
    try {
        clearTimer();
        loginCountdownFinishTime = new Date().getTime() + loginCountdownTime;
        interval = setInterval(loginCountdownfunction, 1000);
        userAccount = await wax.login();
        updateAccount(userAccount);
        if (userAccount != null) {
            clearTimer();
            document.getElementById("countdown").innerHTML = "0m 0s";
            run();
        }

    } catch (err) {
        console.log('Error:' + err);
        updateState('WTF is this error???? restart in 5 min')
        updateNextMine(5 * 60 * 1000)
        isWork = false
        clearTimer()
        document.getElementById("countdown").innerHTML = "0m 0s";
        await sleep(5 * 60 * 1000);
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
    var running = document.getElementById("running");

    while (isWork) {
        running.textContent = isWork
        if (!isMining) {
            clearTimer();
            console.log('--- start mining ---');
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
            updateState('charging')
            updateNextMine(totalDelay)
            mineCountdownFinishTime = new Date().getTime() + totalDelay;
            interval = setInterval(chargingCountdownfunction, 1000);
        }
        await sleep(1000);
    }
}

async function miner() {
    //Mining
    updateState('waiting to mine...')
    updateState('mining');
    mineCountdownFinishTime = new Date().getTime() + mineCountdownTime;
    interval = setInterval(miningCountdownfunction, 1000);
    let nonce = null
    try{
        nonce = await ninja_server_mine(userAccount);
    }catch(err){
        console.log('Cannot mine from ninja: '+ err);
        try{
            nonce = await self_mine(userAccount);
        }catch(err){
            console.log('Cannot self mining: ' + err);
            nonce=null;
        }
    }
    if (nonce != null) {
        updateState('claiming')
        let result = null
        try {
            console.log(`account:${userAccount} || answer:${nonce}`);
            result = await claim(userAccount, nonce);
            totalget += parseFloat(result.replace(" TLM", ""));
            minedCount +=1;
            let currdate = new Date();
            document.getElementById("last_mine").textContent = result +' at '+currdate.getHours()+':'+currdate.getMinutes()+':'+currdate.getSeconds();
            document.getElementById("toal_get").textContent = totalget +' TLM with '+ minedCount +' Times';
            clearTimer();
        } catch (error) {
            updateState('error')
            const errorRes = handleError(error)
            console.log('error: ' + error);
            if (errorRes == 'restart') {
                updateState('Normal error wait: ' + 2 + ' min')
                updateNextMine(120 * 1000)
                clearTimer();
                mineCountdownFinishTime = new Date().getTime() + 120 * 1000;
                interval = setInterval(miningCountdownfunction, 1000);
            } else if (errorRes == 'cpu') {
                updateState('Cpu full wait: ' + cpuDelay / (60 * 1000) + ' min')
                updateNextMine(cpuDelay)
                clearTimer();
                mineCountdownFinishTime = new Date().getTime() + cpuDelay;
                interval = setInterval(miningCountdownfunction, 1000);
            } else if (errorRes == 'wait') {
                updateState('Unknow error wait: ' + errorDelay / (60 * 1000) + ' min')
                updateNextMine(errorDelay)
                clearTimer();
                mineCountdownFinishTime = new Date().getTime() + errorDelay;
                interval = setInterval(miningCountdownfunction, 1000);
            }
            else if (errorRes == 'break') {
                updateState('Nothing to be mine wait : ' + 60 + ' min')
                updateNextMine(60 * 60 * 1000)
                clearTimer();
                mineCountdownFinishTime = new Date().getTime() + 60 * 60 * 1000;
                interval = setInterval(miningCountdownfunction, 1000);
            }
            else {
                updateState('Unknow error wait: ' + errorDelay / (60 * 1000) + ' min')
                updateNextMine(errorDelay)
                clearTimer();
                mineCountdownFinishTime = new Date().getTime() + errorDelay;
                interval = setInterval(miningCountdownfunction, 1000);
            }
        }
        if (result != null) {
            updateState('mining success sleeping')
            await sleep(10000);
            isMining = false;
        }
    }
}
function handleError(error) {
    const restartWords = ['declined', 'expired', 'soon', 'user', 'Failed']
    if (error.message.includes('CPU time')) {
        return 'cpu'
    }
    else if (restartWords.some(v => error.message.includes(v))) {
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

function restart() {
    stop();
    run();
}