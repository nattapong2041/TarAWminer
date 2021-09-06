async function getAccount(account) {
    account = account.match(/^[a-z0-9.]{4,5}(?:.wam)/gm)
    if (!account || typeof account == "undefined" || account == '' || account == null) return 'Account not found';
    account = account[0]
    let index = getRandom(0, base_api.length)
    const url = `${base_api[index]}/v1/chain/get_account`

    return await fetch(url,
        {
            method: 'POST',
            body: JSON.stringify({
                "account_name": account
            }),
            header: {
                'content-type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        }).then((res) => {
            if (res) {
                return res;
            }
        }).catch((err) => {
            return 'Error: cannot get Wax account detail ' + err.message;
        });
}

async function getTLM(account) {
    account = account.match(/^[a-z0-9.]{4,5}(?:.wam)/gm)
    if (!account || typeof account == "undefined" || account == '' || account == null) return 'Account not found';
    account = account[0];
    let index = getRandom(0, base_api.length)
    const url = `${base_api[index]}/v1/chain/get_currency_balance`

    return await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            "code": "alien.worlds",
            "account": account,
            "symbol": "TLM"
        }),
        header: {
            'content-type': 'application/json'
        }
    }).then(function (response) {
        return response.json();
    }).then((res) => {
        if (res[0]) {
            let tlm = res[0].split(" ");
            return parseFloat(tlm[0]);
        }
    }).catch((err) => {
        console.log('Error: cannot get TLM ' + err.message);
        return parseFloat(0.00);
    });
}

async function checkNFT(account) {
    account = account.match(/^[a-z0-9.]{4,5}(?:.wam)/gm)
    if (!account || typeof account == "undefined" || account == '' || account == null) return 'Account not found';
    account = account[0];
    let index = getRandom(0, base_api.length)
    const url = `${base_api[index]}/v1/chain/get_table_rows`

    return await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ 
            "json": true, 
            "code": mining_account, 
            "scope": mining_account, 
            "table": "claims", 
            "lower_bound": account, 
            "upper_bound": account }),
        header: {
            'content-type': 'application/json'
        }
    }).then(function (response) {
        return response.json();
    }).then((res) => {
        if (Array.isArray(res.rows) && res.rows.length ) {
            console.log('You got '+res.rows.length+' NFTs');
            return true;
        }
        else{
            console.log('You got 0 NFTs');
            return false
        }
    }).catch((err) => {
        console.log('Error: cannot check NFTS ' + err.message);
        return false;
    });
}

async function getMiner(account) {
    account = account.match(/^[a-z0-9.]{4,5}(?:.wam)/gm)
    if (!account || typeof account == "undefined" || account == '' || account == null) return 'Account not found';
    account = account[0];
    let index = getRandom(0, base_api.length)
    const url = `${base_api[index]}/v1/chain/get_table_rows`

    return await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ 
            "json": true, 
            "code": mining_account, 
            "scope": mining_account, 
            "table": 'miners', 
            "lower_bound": account, 
            "upper_bound": account }),
        header: {
            'content-type': 'application/json'
        }
    }).then(function (response) {
        return response.json();
    }).then((res) => {
        return res;
    }).catch((err) => {
        console.log('Error: cannot check NFTS ' + err.message);
        return false;
    });
}

async function checkMiningPool(world) {
    let index = getRandom(0, base_api.length)
    const url = `${base_api[index]}/v1/chain/get_table_rows`

    return await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            "json":true,
            "code":mining_account,
            "scope":`${world}`,
            "table":"state3",
            "index_position":1,
            "limit":1,
            "reverse":false
        }),
        header: {
            'content-type': 'application/json'
        }
    }).then(function (response) {
        return response.json();
    }).then((res) => {
        if (Array.isArray(res.rows) && res.rows.length ) {
            let tlm  = parseFloat(res.rows[0].mine_bucket.split(" ")[0]);
            return tlm;
        }
        else{
            console.log('Error: cannot check mininng pool');
            return 0.1000
        }
    }).catch((err) => {
        console.log('Error: cannot check mininng pool ' + err.message);
        return 0.1000;
    });
}

async function get_assets(assestId) {
    const url2 = `${atomic_api[getRandom(0, atomic_api.length)]}/atomicassets/v1/assets/${assestId}`
    return await fetch(url2,
        {
            header: {
                'content-type': 'application/json'
            }
        })
        .then(function (response) {
            return response.json();
        }).then((res) => {
            if (res.success) {
                return res.data;
            }
        }).catch((err) => {
            return 'Error: cannot get assest data: ' + err.message;
        });
}