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

    //*SAVE AUTO STAKE
    localStorage.setItem('auto_stake', document.getElementById("auto_stake").checked);
    localStorage.setItem('auto_stake_wax', document.getElementById("auto_stake_wax").value);

    //*SAVE AUTO SWAP
    localStorage.setItem('auto_swap', document.getElementById("auto_swap").checked);
    localStorage.setItem('auto_swap_tlm', document.getElementById("auto_swap_tlm").value);

    //*SAVE AUTO TRANSFER
    localStorage.setItem('auto_transfer', document.getElementById("auto_transfer").checked);
    localStorage.setItem('auto_transfer_all', document.getElementById("auto_transfer_all").checked);
    localStorage.setItem('auto_transfer_wax', document.getElementById("auto_transfer_wax").value);
    localStorage.setItem('auto_transfer_acc', document.getElementById("auto_transfer_acc").value);
    localStorage.setItem('auto_transfer_memo', document.getElementById("auto_transfer_memo").value);

    //* MINING PARAMS
    localStorage.setItem('cooldown', document.getElementById("cooldown").value);
    localStorage.setItem('difficulty', document.getElementById("difficulty").value);
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
        document.querySelector("#auto_update").checked = false;
    }
    //AutoClaim
    if (localStorage.getItem('auto_claim') != null && localStorage.getItem('auto_claim') == 'true') {
        document.querySelector("#auto_claim").checked = localStorage.getItem('auto_claim');
    }
    if (localStorage.getItem('auto_claim_time') != null) {
        document.getElementById("auto_claim_time").value = localStorage.getItem('auto_claim_time');
    }
        //*LOAD AUTO STAKE
        if (localStorage.getItem('auto_stake') != null && localStorage.getItem('auto_stake') == 'true') {
            document.querySelector("#auto_stake").checked = localStorage.getItem('auto_stake');
        }
        if (localStorage.getItem('auto_stake_wax')) {
            document.getElementById("auto_stake_wax").value = localStorage.getItem('auto_stake_wax');
        }
    //*LOAD AUTO SWAP
    if (localStorage.getItem('auto_swap') != null && localStorage.getItem('auto_swap') == 'true') {
        document.querySelector("#auto_swap").checked = localStorage.getItem('auto_swap');
    }
    if (localStorage.getItem('auto_swap_tlm')) {
        document.getElementById("auto_swap_tlm").value = localStorage.getItem('auto_swap_tlm');
    }
    //*LOAD AUTO TRANSFER
    if (localStorage.getItem('auto_transfer') != null && localStorage.getItem('auto_transfer') == 'true') {
        document.querySelector("#auto_transfer").checked = localStorage.getItem('auto_transfer');
    }
    if (localStorage.getItem('auto_transfer_all') != null && localStorage.getItem('auto_transfer_all') == 'true') {
        document.querySelector("#auto_transfer_all").checked = localStorage.getItem('auto_transfer_all');
    }
    if (localStorage.getItem('auto_transfer_wax')) {
        document.getElementById("auto_transfer_wax").value = localStorage.getItem('auto_transfer_wax')
    }
    if (localStorage.getItem('auto_transfer_acc')) {
        document.getElementById("auto_transfer_acc").value = localStorage.getItem('auto_transfer_acc');
    }
    if (localStorage.getItem('auto_transfer_memo')) {
        document.getElementById("auto_transfer_memo").value = localStorage.getItem('auto_transfer_memo');
    }
}

function resetConfig() {
    localStorage.clear();
    document.getElementById('self').checked = true;
    document.getElementById("cpu_time").value = 5;
    document.querySelector("#need_real_tlm").checked = false;
    document.querySelector("#auto_update").checked = true;
    document.querySelector("#auto_claim").checked = false;
    document.getElementById("auto_claim_time").value = 60;
    //*RESET AUTO STAKE
    document.getElementById('auto_stake').checked = false;
    document.getElementById("auto_stake_wax").value = 0.0000;
    //*RESET AUTO SWAP
    document.getElementById('auto_swap').checked = false;
    document.getElementById("auto_swap_tlm").value = 10.0000;
    //*RESET AUTO TRANSFER
    document.getElementById('auto_transfer').checked = false;
    document.getElementById('auto_transfer_all').checked = false;
    document.getElementById("auto_transfer_wax").value = 20.0000;
    document.getElementById("auto_transfer_acc").value = null;
    document.getElementById("auto_transfer_memo").value = null;
    document.getElementById("cooldown").value = 10;
    document.getElementById("difficulty").value = 0;
}

function copyConfig() {
    let config = {
        mining_with: ''+document.querySelector('input[name="mining_with"]:checked').value, 
        cpu_time: ''+document.getElementById("cpu_time").value, 
        need_real_tlm: ''+document.querySelector("#need_real_tlm").checked, 
        auto_update: ''+document.querySelector("#auto_update").checked, 
        auto_claim: ''+document.querySelector("#auto_claim").checked, 
        auto_claim_time: ''+document.getElementById("auto_claim_time").value, 
        auto_stake: ''+document.getElementById("auto_stake").checked, 
        auto_stake_wax: ''+document.getElementById("auto_stake_wax").value, 
        auto_swap: ''+document.getElementById("auto_swap").checked, 
        auto_swap_tlm: ''+document.getElementById("auto_swap_tlm").value, 
        auto_transfer: ''+document.getElementById("auto_transfer").checked, 
        auto_transfer_all: ''+document.getElementById("auto_transfer_all").checked, 
        auto_transfer_wax: ''+document.getElementById("auto_transfer_wax").value, 
        auto_transfer_acc: ''+document.getElementById("auto_transfer_acc").value, 
        auto_transfer_memo: ''+document.getElementById("auto_transfer_memo").value, 
        cooldown: ''+document.getElementById("cooldown").value, 
        difficulty: ''+document.getElementById("difficulty").value, 
    };
    let dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = JSON.stringify(config);
    dummy.select();
    alert('copied config')
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

function setConfig() {
    let config = JSON.parse(document.getElementById('value_config').value);
    if (config.mining_with != null) {
        document.getElementById(config.mining_with).checked = true;
    }
    if (config.cpu_time != null) {
        document.getElementById("cpu_time").value = config.cpu_time ;
    }
    if (config.need_real_tlm != null && config.need_real_tlm == 'true') {
        document.querySelector("#need_real_tlm").checked = true;
    }
    //AutoUpdateWax
    if (config.auto_update != null && config.auto_update == 'false') {
        document.querySelector("#auto_update").checked = false;
    }
    //AutoClaim
    if (config.auto_claim != null && config.auto_claim == 'true') {
        document.querySelector("#auto_claim").checked = config.auto_claim;
    }
    if (config.auto_claim_time != null) {
        document.getElementById("auto_claim_time").value = config.auto_claim_time;
    }
    //*LOAD AUTO STAKE
    if (config.auto_stake != null &&config.auto_stake == 'true') {
        document.querySelector("#auto_stake").checked = config.auto_stake;
    }
    if (config.auto_stake_wax) {
        document.getElementById("auto_stake_wax").value = config.auto_stake_wax;
    }    
    //*LOAD AUTO SWAP
    if (config.auto_swap != null &&config.auto_swap == 'true') {
        document.querySelector("#auto_swap").checked = config.auto_swap;
    }
    if (config.auto_swap_tlm) {
        document.getElementById("auto_swap_tlm").value = config.auto_swap_tlm;
    }
    //*LOAD AUTO TRANSFER
    if (config.auto_transfer != null && config.auto_transfer == 'true') {
        document.querySelector("#auto_transfer").checked = config.auto_transfer;
    }
    if (config.auto_transfer_all != null && config.auto_transfer_all == 'true') {
        document.querySelector("#auto_transfer_all").checked = config.auto_transfer_all;
    }
    if (config.auto_transfer_wax) {
        document.getElementById("auto_transfer_wax").value = config.auto_transfer_wax;
    }
    if (config.auto_transfer_acc) {
        document.getElementById("auto_transfer_acc").value = config.auto_transfer_acc;
    }
    if (config.auto_transfer_memo) {
        document.getElementById("auto_transfer_memo").value = config.auto_transfer_memo;
    }

    if (config.cooldown != null) {
        document.getElementById("cooldown").value = config.cooldown;
        delay = config.cooldown * 60;
    }
    if (config.difficulty != null ) {
        document.getElementById("difficulty").value = config.difficulty;
        difficulty = config.difficulty;
    }
    saveConfig();
}