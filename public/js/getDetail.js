async function get_assets(assestId) {
    const url = `https://wax.api.atomicassets.io/atomicassets/v1/assets/${assestId}`
    return await fetch(url,
        {
            method: 'GET',
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
            console.log('' + err.message);
            return false;
        });
    // await axios.get(url).then(res => res.data)
    //     .then((json) => {
    //         return json
    //     })
    //     .catch((err) => {
    //         console.log('' + err.message);
    //         return false;
    //     });
}

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
            "code": "m.federation", 
            "scope": "m.federation", 
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

function removeDuplicateOptions(s, comparitor) {
	if(s.tagName.toUpperCase() !== 'SELECT') { return false; }
	var c, i, o=s.options, sorter={};
	if(!comparitor || typeof comparitor !== 'function') {
		comparitor = function(o) { return o.value; };//by default we comare option values.
	}
	for(i=0; i<o.length; i++) {
		c = comparitor(o[i]);
		if(sorter[c]) {
			s.removeChild(o[i]);
			i--;
		}
		else { sorter[c] = true; }
	}
	return true;
}

const updateLand = async (federation_account, mining_account, account, eos_rpc, aa_api) => {
    try {
        const miner_res = await eos_rpc.get_table_rows({ code: mining_account, scope: mining_account, table: 'miners', lower_bound: account, upper_bound: account });
        let land_id;
        if (miner_res.rows.length === 0) {
            return null;
        }
        else {
            land_id = miner_res.rows[0].current_land;
        }

        try {
            const land_res = await eos_rpc.get_table_rows({ code: federation_account, scope: federation_account, table: 'landregs', lower_bound: land_id, upper_bound: land_id });
            let landowner = 'federation';
            if (land_res.rows.length) {
                landowner = land_res.rows[0].owner;
                document.getElementById("land_owner").textContent = landowner
            }
    
            if (!landowner) {
                throw new Error(`Land owner not found for land id ${land_id}`);
            }
    
            const land_asset = await get_assets(land_id).then((resutl) => {
                return resutl
            }).catch((err) => {
                    console.log('' + err.message);
                    return null;
                });
    
            land_asset.owner = land_asset.owner || landowner;
            document.getElementById("land_name").textContent = `${land_asset.data.data.name} ${land_asset.data.data.x}:${land_asset.data.data.y}`
            document.getElementById("land_com").textContent = `${parseFloat(land_asset.data.data.commission / 100).toFixed(2)} %`
            document.getElementById("land_id").textContent = land_id
            document.getElementById("land_owner").textContent = land_asset.owner
            return land_asset;
        }
        catch (e) {
            return null;
        }
    }
    catch (e) {
        console.error(`Failed to get land - ${e.message}`);
        return null;
    }
}

async function updateBag(userAccount) {
    //url = 'https://wax.api.atomicassets.io/atomicassets/v1/assets?collection_name=alien.worlds&owner=wqobq.wam&limit=100&schema_name=tool.worlds'
    //let bag = await aa_api.getAssets({collection_name:'alien.worlds', owner:userAccount, limit: 100, schema_name: 'tool.worlds'}, 1,  100)
    let bag = await fetch(`https://wax.api.atomicassets.io/atomicassets/v1/assets?collection_name=alien.worlds&owner=${userAccount}&limit=100&schema_name=tool.worlds`,
    {header: {
        'content-type': 'application/json'
    }})
    .then(function (response) {
        return response.json();
    }).then((res) => {
        if (res.success) {
            return res.data;
        }
    }).catch((err) => {  
        return 'Error: cannot get bag data: ' + err.message;
    });
    if (bag) {
        let i = 0;
        let allTool = ''
        for (let item of bag) {              
            allTool += `<option value="${item.asset_id}"> ${item.asset_id}(${item.name})</option>` 
            // console.log(`<option value="${token.asset_id}"> ${token.asset_id} - ${token.name}</option>` );                                 
            i++;
        }
        document.getElementById("bag_1").insertAdjacentHTML('beforeend',allTool)
        document.getElementById("bag_2").insertAdjacentHTML('beforeend',allTool)
        document.getElementById("bag_3").insertAdjacentHTML('beforeend',allTool)

        removeDuplicateOptions(document.getElementById("bag_1"));
        removeDuplicateOptions(document.getElementById("bag_2"));
        removeDuplicateOptions(document.getElementById("bag_3"));
    }    
    
    const equipTool = await wax.api.rpc.get_table_rows({ code: mining_account, scope: mining_account, table: 'bags', lower_bound: userAccount, upper_bound: userAccount });
    for (let i =0; i< equipTool.rows[0].items.length ; i++) {
        if(i == 0)
            document.querySelector("#bag_1").value = equipTool.rows[0].items[i]
        else if(i==1)
            document.querySelector("#bag_2").value = equipTool.rows[0].items[i]
        else if(i==2)
            document.querySelector("#bag_3").value = equipTool.rows[0].items[i]
    }
}