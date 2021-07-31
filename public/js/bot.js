var errorDelay = 2 * (60 * 1000);
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
var lastTLM = 0.0;

var wax_balance = 0.0;

var mineInterval;
var newMineInterval;
var loginInterval;
var nftInterval;

var userAccount = "";
var oldNonce;

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
            let staked = (status.total_resources.cpu_weight).split(" ");
            let wax = (status.core_liquid_balance).split(" ");
            let current_wax = parseFloat((parseInt(wax[0] * 10000) / 10000).toFixed(4))
            let stake_wax = parseFloat(staked[0])
            document.getElementById("wax_balance").textContent = parseFloat(wax[0]).toFixed(4) + ' ' + wax[1];
            //*CHECK AUTO STAKE
            if (document.getElementById("auto_stake").checked) {
                console.log('Checking auto stake');
                if (stake_wax < parseFloat((document.getElementById("auto_stake_wax").value))) {
                    console.log(`You staked ${parseFloat(stake_wax).toFixed(4)}/${parseFloat(document.getElementById("auto_stake_wax").value).toFixed(4)}  WAX`);
                    if(current_wax >= 1.0000){
                        console.log(`You have ${parseFloat(current_wax).toFixed(4)} WAX > 1 WAX`);
                        try {
                            let staking_wax = 1.0;
                            let stake_left = parseFloat(document.getElementById("auto_stake_wax").value - stake_wax);
                            if(stake_left < current_wax){
                                staking_wax = Math.floor(stake_left); 
                                if(staking_wax <= 0){
                                    staking_wax = 1.000
                                }
                            }else{
                                staking_wax = Math.floor(current_wax);
                            }
                            console.log(`Auto staking ${parseFloat(staking_wax).toFixed(4)}  WAX`);
                            let result = await stake(userAccount, staking_wax)
                            if (result != 0 && result != null) {
                                console.log('Complete: ' + result);
                                current_wax = parseFloat((parseInt((current_wax - staking_wax) * 10000) / 10000).toFixed(4))
                                document.getElementById("wax_balance").textContent = (current_wax).toFixed(4) + ' WAX';
                            } else {
                                console.log('Error: Cannot stake1.');
                            }
                        } catch (err) {
                            console.log('Error: Cannot stake2.');
                        }
                    }else{
                        console.log(`You need to have more than 1 WAX to stake(${parseFloat(current_wax).toFixed(4)}/1.0000)`);
                    }
                    

                }
            }

            //*CHECK AUTO TRANSFER
            if (document.getElementById("auto_transfer").checked) {
                console.log('Checking auto transfer');
                if ((current_wax >= parseFloat((document.getElementById("auto_transfer_wax").value))) && (stake_wax >= parseFloat((document.getElementById("auto_stake_wax").value)))) {
                    console.log('You have ' + current_wax + ' auto transfering ' + document.getElementById("auto_transfer_wax").value + ' WAX');
                    try {
                        let transfer_wax = 0.0;
                        if (document.getElementById("auto_transfer_all")) {
                            transfer_wax = current_wax.toFixed(3) - 0.001
                        }
                        else {
                            transfer_wax = document.getElementById("auto_transfer_wax").value
                        }
                        let result = await transfer(userAccount, transfer_wax, document.getElementById("auto_transfer_acc").value, document.getElementById("auto_transfer_memo").value)
                        if (result != 0 && result != null) {
                            console.log('Complete: ' + result);
                            current_wax = parseFloat((parseInt((current_wax - transfer_wax) * 10000) / 10000).toFixed(4))
                            document.getElementById("wax_balance").textContent = (current_wax).toFixed(4) + ' TLM';
                        } else {
                            console.log('Error: Cannot transfer.');
                        }
                    } catch (err) {
                        console.log('Error: Cannot transfer.');
                    }

                }
            }
        }
        else {
            document.getElementById("wax_balance").textContent = "cannot get wax balance"
        }
    } catch {
        console.log('Error while update account details');
    }
}

async function updateLandInfo() {
    try {
        await updateLand(federation_account, mining_account, userAccount, wax.api.rpc, aa_api);
    } catch (error) {
        console.log('Cannot update land info');
    }
}

async function updateItemInfo() {
    try {
        await updateBag(userAccount)
    } catch (error) {
        console.log('Cannot update item');
    }
}

async function updateTLM() {
    try {
        let tlm = await getTLM(userAccount);
        if (tlm) {
            lastTLM = tlm;
            document.getElementById("tlm_balance").textContent = tlm + ' TLM';
            //*CHECK AUTO SWAP
            if (document.getElementById("auto_swap").checked) {
                console.log('Checking auto swap');
                if (parseFloat(tlm) >= parseFloat((document.getElementById("auto_swap_tlm").value))) {
                    console.log('You have ' + tlm + ' auto swapping ' + document.getElementById("auto_swap_tlm").value + ' TLM');
                    try {
                        let result = await swap(userAccount, document.getElementById("auto_swap_tlm").value)
                        if (result != 0) {
                            console.log('Complete: ' + result);
                            lastTLM = lastTLM - document.getElementById("auto_swap_tlm").value;
                            document.getElementById("tlm_balance").textContent = lastTLM.toFixed(4) + ' TLM';
                        } else {
                            console.log('Error: Cannot swap TLM.');
                        }
                    } catch (err) {
                        console.log('Error: Cannot swap TLM.');
                    }
                }
            }
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
    var minutes = Math.floor((distance) / (1000 * 60));
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
    var minutes = Math.floor((distance) / (1000 * 60));
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
    var minutes = Math.floor((distance) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("countdown").innerHTML = padLeadingZeros(minutes, 2) + 'm ' + padLeadingZeros(seconds, 2) + 's before new login'
    if (distance < 0) {
        clearTimer()
        window.location.reload();
    }
}

async function login() {
    try {
        document.getElementById("update_detail").onclick = async function () {
            try {
                updateTLM()
                updateAccStatus();
                updateLandInfo()
                updateItemInfo()
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
        document.getElementById("unstake_btn").onclick = async function () {
            let result = await unstake(userAccount, document.getElementById("stake").value)
            if (result != 0 && result != null) {
                console.log('' + result);
            } else {
                console.log('Error: Cannot unstake.');
            }
        };
        document.getElementById("swap_btn").onclick = async function () {
            let result = await swap(userAccount, document.getElementById("swap_tlm").value)
            if (result != 0 && result != null) {
                console.log('Complete: ' + result);
            } else {
                console.log('Error: Cannot swap TLM.');
            }
        };
        document.getElementById("sell_tlm_btn").onclick = async function () {
            let result = await swap(userAccount, document.getElementById("sell_tlm").value, document.getElementById("sell_tlm_price").value)
            if (result != 0 && result != null) {
                console.log('Complete: ' + result);
            } else {
                console.log('Error: Cannot swap TLM.');
            }
        };
        document.getElementById("swap_all_btn").onclick = async function () {
            let tlm = await getTLM(userAccount);
            let result;
            if (tlm) {
                result = await swap(userAccount, parseFloat((parseInt(tlm * 1000) / 1000).toFixed(3)));
            }
            if (result != 0 && result != null) {
                console.log('Complete: ' + result);
            } else {
                console.log('Error: Cannot swap all TLM.');
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
        document.getElementById("stake_all_btn").onclick = async function () {
            let acc = await getAccount(userAccount);
            let result;
            if (acc) {
                let wax = (acc.core_liquid_balance).split(" ");
                result = await stake(userAccount, parseFloat((parseInt(wax[0] * 1000) / 1000).toFixed(3)));
            }
            if (result != 0 && result != null) {
                console.log('Complete: ' + result);
            } else {
                console.log('Error: Cannot stake all TLM.');
            }
        };
        document.getElementById("run_btn").onclick = async function () {
            onclickRun();
        };
        document.getElementById("save_config").onclick = async function () {
            saveConfig();
        };
        document.getElementById("reset_config").onclick = async function () {
            resetConfig();
        };
        document.getElementById("copy_config").onclick = async function () {
            copyConfig();
        };
        document.getElementById("set_config").onclick = async function () {
            setConfig();
        };
        document.getElementById("run_btn").disabled = true
        clearTimer();
        loginCountdownFinishTime = new Date().getTime() + loginCountdownTime;
        loginInterval = setInterval(loginCountdownfunction, 1000);
        userAccount = await wax.login();
        updateAccount(userAccount);
        if (userAccount != null) {
            clearTimer();
            document.getElementById("countdown").innerHTML = "0m 0s";
            onclickRun();
            document.getElementById("run_btn").disabled = false
        }
    } catch (err) {
        console.log(err);
        await sleep(20000);
        window.location.reload();
    }

}

async function run() {
    clearTimer();
    if (!isMining) {
        isMining = true
        //calculate delay
        if (delay == 0) {
            //*CHECK AUTO CLAIM
            if (document.getElementById("auto_claim").checked) {
                if (document.getElementById("auto_claim_time").value >= 0) {
                    let now = new Date().getTime();
                    if ((claimCountdownFinishTime - now) <= 0) {
                        nftInterval = setInterval(autoClaimNFT, 1000);
                    }
                }
            }
            await updateTLM();
            //*CHECK AUTO UPDATE
            if (document.getElementById("auto_update").checked) {
                await updateAccStatus();
            }
            //*GET COOLDOWN
            console.log('getting cooldown');
            delay = await getMineDelay(userAccount).then(function (response) {
                if (response == -1) throw 'Cannot get cooldown'
                return response;
            }).catch((err) => {
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
            console.log('Cooldown total: ' + totalDelay / 1000 + 'sec Mine: ' + delay / 1000 + ' Add: ' + addRandom / 1000 + 'sec')
            updateStatus('charging')
            updateNextMine(totalDelay)
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
                nonce = await self_mine(userAccount, oldNonce);
                oldNonce = nonce;
            } catch (err) {
                console.log('Error with self mining: ' + err);
                nonce = null;
            }
        }
    } else if (mine_with == 'lazy') {
        try {
            nonce = await lazy_server_mine(userAccount);
            if (nonce == 'lazy') {
                throw 'Cannot get answer';
            }
        } catch (err) {
            console.log('Error with lazy-sever mining: : ' + err);
            try {
                nonce = await self_mine(userAccount, oldNonce);
                oldNonce = nonce;
            } catch (err) {
                console.log('Error with self mining: ' + err);
                nonce = null;
            }
        }
    } else if (mine_with == 'self') {
        try {
            nonce = await self_mine(userAccount, oldNonce);
            oldNonce = nonce;
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
                updateStatus('Normal error wait: ' + 1 + ' min')
                nextmine = 60 * 1000;
                updateNextMine(nextmine)
            } else if (errorRes == 'mining') {
                updateStatus('Error while find answer wait: ' + 1 + ' min')
                if (document.querySelector('input[name="mining_with"]:checked').value == 'ninja') {
                    document.getElementById("self").checked = true;
                }
                nextmine = 60 * 1000;
                updateNextMine(nextmine)
            } else if (errorRes == 'cpu') {
                if (document.getElementById("cpu_time").value > 0) {
                    cpuDelay = document.getElementById("cpu_time").value * 60 * 1000;
                }
                updateStatus('Cpu full wait: ' + cpuDelay / (60 * 1000) + ' min')
                nextmine = cpuDelay;
                updateNextMine(nextmine)
            } else if (errorRes == 'newTx') {
                updateStatus('User start new transaction wait: ' + 20 + ' sec')
                nextmine = 20 * 1000;
                updateNextMine(nextmine)
            } else if (errorRes == 'declares') {
                updateStatus('User transaction declares wait: ' + 30 + ' sec')
                nextmine = 30 * 1000;
                updateNextMine(nextmine)
            }
            else if (errorRes == 'timeout') {
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
            await sleep(5000);
            run();
        }
        else {
            delay = 0;
            clearTimer();
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
    else if (error.message.includes('transaction declares')) {
        return 'declares'
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

function onclickRun() {
    if (isMining) {
        stop();
        updateStatus('STOPPING')
        console.log('**STOPPING**');
        document.getElementById("run_btn").textContent = "START Bot"
        document.getElementById("run_btn").className = "btn btn-success"
    } else {
        updateStatus('RUNNING')
        console.log('**RUNNING**');
        document.getElementById("run_btn").textContent = "STOP Bot"
        document.getElementById("run_btn").className = "btn btn-danger"
        delay = 0;
        run();
    }

}

async function restart() {
    stop();
    await sleep(5000);
    run();
}