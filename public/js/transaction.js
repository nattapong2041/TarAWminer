function timeout(ms, promise) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error('Transaction timeout!'))
      }, ms)
      promise
        .then(value => {
          clearTimeout(timer)
          resolve(value)
        })
        .catch(reason => {
          clearTimeout(timer)
          reject(reason)
        })
    })
}

async function claim2(account, nonce) {
    try {
        console.log(`${account} Pushing mine results...`);
        const mine_data = {
            miner: account,
            nonce: nonce,
        };
        const actions = [{
            account: mining_account,
            name: 'mine',
            authorization: [{
                actor: account,
                permission: 'active',
            },],
            data: mine_data,
        },];
        let result = await timeout(95000, wax.api.transact({
            actions,
        }, {
            blocksBehind: 3,
            expireSeconds: 90,
        })).then(function (response) {
            return response;
        }).catch((err) => {
            throw err;
        });

        await sleep(2000);
        var amounts = new Map();
        if (result && result.processed) {
            try {
                let tlm=0.0;
                let tlmSuccess = false;
                try{
                    tlm = await getTLM(userAccount);
                    tlmSuccess=true;
                }catch (error){
                    console.log('Get tlm error');
                    tlm=0.0;
                }
                if(!document.querySelector("#need_real_tlm").checked) throw 'err';
                if (tlmSuccess) {
                    let recieve =(parseFloat(tlm - lastTLM)).toFixed(4);
                    amounts.set(account, recieve.toString() + ' TLM'); 
                    lastTLM = tlm;
                    document.getElementById("tlm_balance").textContent = tlm + ' TLM';
                }
                else {
                    document.getElementById("tlm_balance").textContent = "cannot get tlm balance";
                    throw 'err';
                }
            } catch(err) {
                result.processed.action_traces[0].inline_traces.forEach((t) => {
                    if (t.act.data.quantity) {
                        var quantityStr = t.act.data.quantity;
                    quantityStr = quantityStr.substring(0, quantityStr.length - 4);
                    var balance = (parseFloat(quantityStr)).toFixed(4);
                    amounts.set(account, balance.toString() + ' TLM'); 
                    }
                });
            }         
            console.log('Received: ' + parseFloat(amounts.get(account)));
            return amounts.get(account);
        }
        return 0.00;
    } catch (error) {
        throw error
    }
}

async function setLand2(account, land) {
    try {
        console.log(`${account} changing land to ${land}`);
        const setland = {
            'account': account,
            'land_id': land
        };
        const actions = [{
            'account': 'm.federation',
            'name': 'setland',
            'authorization': [{
                'actor': account,
                'permission': 'active'
            }],
            'data': setland
        }];
        let result = await wax.api.transact({
            actions,
        }, {
            blocksBehind: 3,
            expireSeconds: 90,
        });
        if (result && result.processed) {
            let lands = result.processed.action_traces[0].act.data.land_id
            return 'Set to lands: ' + lands;
        }
        return 0;
    } catch (error) {
        throw error;
    }
}

async function swap2(account, amount) {
    try {
        console.log(`${account} Swaping tlm to wax ...`);
        const swapdata = {
            'from': account,
            'to': 'alcordexmain',
            'quantity': `${parseFloat(amount).toFixed(4)}  TLM`,
            'memo': "0.00000000 WAX@eosio.token"
        };
        const actions = [{
            'account': 'alien.worlds',
            'name': 'transfer',
            'authorization': [{
                'actor': account,
                'permission': 'active'
            }],
            'data': swapdata
        }];
        let result = await wax.api.transact({
            actions,
        }, {
            blocksBehind: 3,
            expireSeconds: 90,
        });
        if (result && result.processed) {
            let wax = result.processed.action_traces[0].inline_traces[2].act.data.quantity
            return `Swap ${amount} to ${wax}`
        }
        return 0;
    } catch (error) {
        throw error;
    }
}

async function transfer2(account, amount, toAcc, memo) {
    try {
        console.log(`${account} Transfering ${amount} WAX to ${toAcc} ...`);
        const transferWAX = {
            'from': account,
            'to': toAcc,
            'quantity': `${parseFloat(amount).toFixed(8)}  WAX`,
            'memo': memo
        };
        const actions = [{
            'account': 'eosio.token',
            'name': 'transfer',
            'authorization': [{
                'actor': account,
                'permission': 'active'
            }],
            'data': transferWAX
        }];
        let result = await wax.api.transact({
            actions,
        }, {
            blocksBehind: 3,
            expireSeconds: 90,
        });
        if (result && result.processed) {
            return `Transfer ${amount} WAX from ${account} to ${toAcc}`
        }
        return 0;
    } catch (error) {
        throw error;
    }
}

async function claimNFT2(account, claimAcc) {
    try {
        console.log(`Claiming NFT drop of ${account} ...`);
        const claimnfts = {
            'miner': claimAcc,
        };
        const actions = [{
            'account': 'm.federation',
            'name': 'claimnfts',
            'authorization': [{
                'actor': account,
                'permission': 'active'
            }],
            'data': claimnfts
        }]
        let result = await wax.api.transact({
            actions,
        }, {
            blocksBehind: 3,
            expireSeconds: 90,
        });
        if (result && result.processed) {
            return `Claim item success pls check your bag`
        }
        return 0;
    } catch (error) {
        throw error;
    }
}

async function stake2(account, amount) {
    try {
        console.log(`Staking ${amount} WAX to CPU...`);
        const stake = {
            'from': account,
            'receiver': account,
            'stake_net_quantity': `0.00000000 WAX`,
            'stake_cpu_quantity': `${parseFloat(amount).toFixed(8)} WAX`,
            'transfer': false
        };
        const actions = [{
            'account': 'eosio',
            'name': 'delegatebw',
            'authorization': [{
                'actor': account,
                'permission': 'active'
            }],
            'data': stake
        }];
        let result = await wax.api.transact({
            actions,
        }, {
            blocksBehind: 3,
            expireSeconds: 90,
        });
        if (result && result.processed) {
            return `Complete stake ${amount} WAX `
        }
        return 0;
    } catch (error) {
        throw error;
    }
}

async function setBag2(account) {
    try {
        console.log(`${account} setting bag`);
        let items =[]
        if(document.querySelector("#bag_1").value != '0')
            items.push(document.querySelector("#bag_1").value)
        if(document.querySelector("#bag_2").value != '0')
            items.push(document.querySelector("#bag_2").value)
        if(document.querySelector("#bag_3").value != '0')
            items.push(document.querySelector("#bag_3").value)
        const setland = {
            account: account,
            items: items,
        };
        const actions = [{
            'account': 'm.federation',
            'name': 'setbag',
            'authorization': [{
                'actor': account,
                'permission': 'active'
            }],
            'data': setland
        }];
        let result = await wax.api.transact({
            actions,
        }, {
            blocksBehind: 3,
            expireSeconds: 90,
        });
        if (result && result.processed) {
            console.log('Set bag complete');
        }
        return 0;
    } catch (error) {
        throw error;
    }
}

async function unstake(account, amount) {
    try {
        console.log(`Unstaking CPU: ${amount} WAX ...`);
        const unstake = {
            'from': account,
            'receiver': account,
            'unstake_net_quantity': `0.00000000 WAX`,
            'unstake_cpu_quantity': `${parseFloat(amount).toFixed(8)} WAX`,
            'transfer': false
        };
        const actions = [{
            'account': 'eosio',
            'name': 'undelegatebw',
            'authorization': [{
                'actor': account,
                'permission': 'active'
            }],
            'data': unstake
        }];
        let result = await wax.api.transact({
            actions,
        }, {
            blocksBehind: 3,
            expireSeconds: 90,
        });
        if (result && result.processed) {
            return `Complete unstaked ${amount} WAX `
        }
        return 0;
    } catch (error) {
        throw error;
    }
}
