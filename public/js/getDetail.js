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
            return 'Error: cannot get TLM ' + JSON.stringify(err);
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
            return res[0];
        }
    }).catch((err) => {
        return 'Error: cannot get TLM ' + JSON.stringify(err);
    });
}