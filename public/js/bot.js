var _0x169b=['Error:\x20Cannot\x20swap\x20TLM.','className','toal_get','cpu_weight','memo','expired','getting\x20cooldown','Total\x20cooldown:\x20','btn\x20btn-success','restart','stake','====SAVE\x20CONFIG====','43prjdOx','-------------------','mining\x20success\x20sleeping','cpu_stake','land_btn','some','s\x20before\x20new\x20mine','\x20min','run_btn','Unknow\x20error\x20wait:\x20','innerHTML','========\x20STOPPING\x20========','core_liquid_balance','Error:\x20Cannot\x20transfer.','Invalid','cpu_limit','\x20Times','isInteger','reload','btn\x20btn-danger','split','cannot\x20get\x20cpu\x20litmit','cannot\x20get\x20tlm\x20balance','User','checked','Error\x20with\x20self\x20mining:\x20','location','754767GbYgHi','ninja_vip','swap_tlm','input[name=\x22mining_with\x22]:checked','ninja','sec','cannot\x20get\x20wax\x20balance','wax_bloks','getItem','message','wax_server','cpu_time','limit','Error:','login','User\x20start\x20new\x20transaction\x20wait:\x20','Error:\x20Cannot\x20set\x20land.','setItem','value','mining','Error:\x20Claimed\x20NFT.','tlm_balance','\x20Add\x20random\x20time:\x20','self','wait','break','getHours','disabled','https://wax.atomichub.io/profile/','countdown','send_wax','1196555tQZFRa','claiming','s\x20before\x20mine','user_account','restarting','toFixed','charging','Error\x20with\x20ninja-sever\x20mining:\x20:\x20','error:\x20','textContent','111885AOWMoa','11189IgPCZo','Wax\x20server:\x20','mining_with','0m\x200s','\x20TLM\x20with\x20','onclick','to_acc','Normal\x20error\x20wait:\x20','declined','href','Error\x20while\x20update\x20account\x20details','========\x20RUNNING\x20========','soon','total_resources','newTx','floor','16LnuTEp','sec\x20AWCooldown:\x20','5472502rzZKfF','wax_balance','CPU\x20time','started\x20a\x20new\x20transaction','cannot\x20cpu\x20get\x20stake','109NZLcFF','Error:\x20Cannot\x20stake.','includes','\x20||\x20answer:','claim_btn','https://wax.bloks.io/account/','atomic_hub','title','1692288pCYXuP','querySelector','max','getMinutes','4207krLmEY','Cpu\x20full\x20wait:\x20','stake_btn','getTime','Error\x20while\x20find\x20answer\x20wait:\x20','cpu','\x20at\x20','log','Complete:\x20','getElementById','Ninja\x20server\x20reach\x20rate\x20limit','nothing','STOPPING','1UcWJkT'];var _0x5bc2ca=_0xd558;(function(_0xab5a7b,_0x56a284){var _0x418926=_0xd558;while(!![]){try{var _0x398a1c=-parseInt(_0x418926(0x202))+parseInt(_0x418926(0x1e2))*-parseInt(_0x418926(0x1f3))+-parseInt(_0x418926(0x206))*-parseInt(_0x418926(0x1fa))+-parseInt(_0x418926(0x1d8))+-parseInt(_0x418926(0x191))*parseInt(_0x418926(0x1b9))+-parseInt(_0x418926(0x1e3))*-parseInt(_0x418926(0x19e))+parseInt(_0x418926(0x1f5));if(_0x398a1c===_0x56a284)break;else _0xab5a7b['push'](_0xab5a7b['shift']());}catch(_0x42880e){_0xab5a7b['push'](_0xab5a7b['shift']());}}}(_0x169b,0xeedf6));var isWork=![],errorDelay=0x5*(0x3c*0x3e8),cpuDelay=0x5*(0x3c*0x3e8),mineCountdownTime=0x5*(0x3c*0x3e8),loginCountdownTime=0x3*(0x3c*0x3e8),mineCountdownFinishTime=new Date()[_0x5bc2ca(0x187)](),loginCountdownFinishTime=new Date()[_0x5bc2ca(0x187)](),nextmine=0x0,mineInterval,newMineInterval,loginInterval,isMining=![],totalget=0x0,minedCount=0x0;let userAccount='';var delay=0x0;function saveConfig(){var _0x3f330e=_0x5bc2ca;console[_0x3f330e(0x18b)](_0x3f330e(0x19d)),localStorage[_0x3f330e(0x1ca)](_0x3f330e(0x1e5),document['querySelector'](_0x3f330e(0x1bc))[_0x3f330e(0x1cb)]),localStorage[_0x3f330e(0x1ca)](_0x3f330e(0x1c4),document[_0x3f330e(0x18d)](_0x3f330e(0x1c4))['value']);}function loadConfig(){var _0x4fca9d=_0x5bc2ca;localStorage[_0x4fca9d(0x1c1)]('mining_with')!=null&&(document[_0x4fca9d(0x18d)](localStorage[_0x4fca9d(0x1c1)](_0x4fca9d(0x1e5)))[_0x4fca9d(0x1b6)]=!![]),localStorage[_0x4fca9d(0x1c1)](_0x4fca9d(0x1c4))!=null&&(document[_0x4fca9d(0x18d)](_0x4fca9d(0x1c4))['value']=localStorage['getItem'](_0x4fca9d(0x1c4)));}function updateStatus(_0x558e1b){var _0x31e4f0=_0x5bc2ca;document[_0x31e4f0(0x18d)]('status')[_0x31e4f0(0x1e1)]=_0x558e1b,document[_0x31e4f0(0x201)]=_0x558e1b+':\x20'+userAccount;}async function updateAccStatus(){var _0x463020=_0x5bc2ca;try{let _0x5558c1=await getAccount(userAccount);_0x5558c1[_0x463020(0x1ad)]?document[_0x463020(0x18d)](_0x463020(0x1ad))['textContent']=(_0x5558c1[_0x463020(0x1ad)]['used']/_0x5558c1[_0x463020(0x1ad)][_0x463020(0x204)]*0x64)['toFixed'](0x2)+'\x20%':document[_0x463020(0x18d)](_0x463020(0x1ad))[_0x463020(0x1e1)]=_0x463020(0x1b3);if(_0x5558c1[_0x463020(0x1f0)]){let _0x2b1207=_0x5558c1[_0x463020(0x1f0)][_0x463020(0x195)][_0x463020(0x1b2)]('\x20');document[_0x463020(0x18d)](_0x463020(0x1a1))[_0x463020(0x1e1)]=parseFloat(_0x2b1207[0x0])[_0x463020(0x1dd)](0x4)+'\x20'+_0x2b1207[0x1];}else document[_0x463020(0x18d)](_0x463020(0x1a1))[_0x463020(0x1e1)]=_0x463020(0x1f9);if(_0x5558c1[_0x463020(0x1aa)]){let _0x530be8=_0x5558c1['core_liquid_balance'][_0x463020(0x1b2)]('\x20');document['getElementById'](_0x463020(0x1f6))[_0x463020(0x1e1)]=parseFloat(_0x530be8[0x0])['toFixed'](0x4)+'\x20'+_0x530be8[0x1];}else document[_0x463020(0x18d)](_0x463020(0x1f6))['textContent']=_0x463020(0x1bf);}catch{console[_0x463020(0x18b)](_0x463020(0x1ed));}try{let _0x5f1a3a=await getTLM(userAccount);_0x5f1a3a?document[_0x463020(0x18d)](_0x463020(0x1ce))[_0x463020(0x1e1)]=_0x5f1a3a:document[_0x463020(0x18d)]('tlm_balance')[_0x463020(0x1e1)]=_0x463020(0x1b4);}catch{console[_0x463020(0x18b)](_0x463020(0x1ed));}}function updateNextMine(_0x3740ab){var _0x316b57=_0x5bc2ca;const _0x3b9d18=new Date()[_0x316b57(0x187)](),_0x2f6e99=new Date(_0x3b9d18+_0x3740ab);document[_0x316b57(0x18d)]('next_mine')[_0x316b57(0x1e1)]=padLeadingZeros(_0x2f6e99[_0x316b57(0x1d3)](),0x2)+':'+padLeadingZeros(_0x2f6e99[_0x316b57(0x205)](),0x2)+':'+padLeadingZeros(_0x2f6e99['getSeconds'](),0x2);}function clearTimer(){var _0x107c6e=_0x5bc2ca;loginInterval&&clearInterval(loginInterval),newMineInterval&&clearInterval(newMineInterval),mineInterval&&clearInterval(mineInterval),document[_0x107c6e(0x18d)](_0x107c6e(0x1d6))[_0x107c6e(0x1a8)]=_0x107c6e(0x1e6);}function padLeadingZeros(_0x48e1d3,_0x22d27a){var _0x43f999=_0x48e1d3+'';while(_0x43f999['length']<_0x22d27a)_0x43f999='0'+_0x43f999;return _0x43f999;}function sleep(_0x33f398){return new Promise(_0xf903d=>setTimeout(_0xf903d,_0x33f398));}function updateAccount(_0x36dcb9){var _0x12b8f7=_0x5bc2ca;document[_0x12b8f7(0x18d)](_0x12b8f7(0x1db))['textContent']=_0x36dcb9,document[_0x12b8f7(0x18d)](_0x12b8f7(0x1c0))[_0x12b8f7(0x1ec)]=_0x12b8f7(0x1ff)+_0x36dcb9,document[_0x12b8f7(0x18d)](_0x12b8f7(0x200))['href']=_0x12b8f7(0x1d5)+_0x36dcb9;}async function chargingCountdownfunction(){var _0x2e37c6=_0x5bc2ca;newMineInterval&&clearInterval(newMineInterval);var _0xfc48e8=new Date()['getTime'](),_0x393521=mineCountdownFinishTime-_0xfc48e8,_0x1b457c=Math[_0x2e37c6(0x1f2)](_0x393521%(0x3e8*0x3c*0x3c)/(0x3e8*0x3c)),_0x13784a=Math[_0x2e37c6(0x1f2)](_0x393521%(0x3e8*0x3c)/0x3e8);document[_0x2e37c6(0x18d)](_0x2e37c6(0x1d6))[_0x2e37c6(0x1a8)]=padLeadingZeros(_0x1b457c,0x2)+'m\x20'+padLeadingZeros(_0x13784a,0x2)+_0x2e37c6(0x1da),_0x393521<0x0&&(clearTimer(),document['getElementById'](_0x2e37c6(0x1d6))['innerHTML']='trying\x20to\x20mine',await miner(document[_0x2e37c6(0x203)](_0x2e37c6(0x1bc))['value']));}async function miningCountdownfunction(){var _0x59d1ed=_0x5bc2ca;mineInterval&&clearInterval(mineInterval);var _0xccf5f7=new Date()[_0x59d1ed(0x187)](),_0x1c67a7=mineCountdownFinishTime-_0xccf5f7,_0x48672a=Math[_0x59d1ed(0x1f2)](_0x1c67a7%(0x3e8*0x3c*0x3c)/(0x3e8*0x3c)),_0x561bbf=Math[_0x59d1ed(0x1f2)](_0x1c67a7%(0x3e8*0x3c)/0x3e8);document[_0x59d1ed(0x18d)](_0x59d1ed(0x1d6))['innerHTML']=padLeadingZeros(_0x48672a,0x2)+'m\x20'+padLeadingZeros(_0x561bbf,0x2)+_0x59d1ed(0x1a4),_0x1c67a7<0x0&&(clearTimer(),restart(),document['getElementById'](_0x59d1ed(0x1d6))[_0x59d1ed(0x1a8)]=_0x59d1ed(0x1dc));}async function loginCountdownfunction(){var _0x315765=_0x5bc2ca,_0x54e50c=new Date()[_0x315765(0x187)](),_0x27e588=loginCountdownFinishTime-_0x54e50c,_0x4db81b=Math[_0x315765(0x1f2)](_0x27e588%(0x3e8*0x3c*0x3c)/(0x3e8*0x3c)),_0x54323c=Math['floor'](_0x27e588%(0x3e8*0x3c)/0x3e8);document['getElementById'](_0x315765(0x1d6))[_0x315765(0x1a8)]=padLeadingZeros(_0x4db81b,0x2)+'m\x20'+padLeadingZeros(_0x54323c,0x2)+'s\x20before\x20new\x20login',_0x27e588<0x0&&(clearTimer(),window[_0x315765(0x1b8)][_0x315765(0x1b0)]());}async function login(){var _0x180aac=_0x5bc2ca;try{document[_0x180aac(0x18d)](_0x180aac(0x1c3))[_0x180aac(0x1e1)]=_0x180aac(0x1e4)+url,document[_0x180aac(0x18d)]('swap_btn')[_0x180aac(0x1e8)]=async function(){var _0x45c4c9=_0x180aac;let _0x4754bf=await swap(userAccount,document[_0x45c4c9(0x18d)](_0x45c4c9(0x1bb))[_0x45c4c9(0x1cb)]);_0x4754bf!=0x0&&_0x4754bf!=null?console[_0x45c4c9(0x18b)](_0x45c4c9(0x18c)+_0x4754bf):console[_0x45c4c9(0x18b)](_0x45c4c9(0x192));},document[_0x180aac(0x18d)](_0x180aac(0x1a2))[_0x180aac(0x1e8)]=async function(){var _0x259a6b=_0x180aac;let _0x1bb908=null;try{_0x1bb908=await setLand(userAccount,document[_0x259a6b(0x18d)]('set_land')[_0x259a6b(0x1cb)]);}catch(_0xba54ad){console[_0x259a6b(0x18b)](_0xba54ad);}_0x1bb908!=0x0&&_0x1bb908!=null?console['log']('Complete:\x20'+_0x1bb908):console['log'](_0x259a6b(0x1c9));},document['getElementById']('send_btn')[_0x180aac(0x1e8)]=async function(){var _0x1969ec=_0x180aac;let _0x2dc42b=await transfer(userAccount,document[_0x1969ec(0x18d)](_0x1969ec(0x1d7))['value'],document[_0x1969ec(0x18d)](_0x1969ec(0x1e9))['value'],document['getElementById'](_0x1969ec(0x196))[_0x1969ec(0x1cb)]);_0x2dc42b!=0x0&&_0x2dc42b!=null?console[_0x1969ec(0x18b)](_0x1969ec(0x18c)+_0x2dc42b):console[_0x1969ec(0x18b)](_0x1969ec(0x1ab));},document[_0x180aac(0x18d)](_0x180aac(0x1fe))['onclick']=async function(){var _0x496234=_0x180aac;let _0x456313=await claimNFT(userAccount,document[_0x496234(0x18d)]('claim_nft_acc')[_0x496234(0x1cb)]);_0x456313!=0x0&&_0x456313!=null?console['log'](_0x496234(0x18c)+_0x456313):console['log'](_0x496234(0x1cd));},document[_0x180aac(0x18d)](_0x180aac(0x186))[_0x180aac(0x1e8)]=async function(){var _0x4f9859=_0x180aac;let _0x50b0fd=await stake(userAccount,document['getElementById'](_0x4f9859(0x19c))[_0x4f9859(0x1cb)]);_0x50b0fd!=0x0&&_0x50b0fd!=null?console[_0x4f9859(0x18b)](_0x4f9859(0x18c)+_0x50b0fd):console[_0x4f9859(0x18b)](_0x4f9859(0x1fb));},document[_0x180aac(0x18d)](_0x180aac(0x1a6))[_0x180aac(0x1e8)]=async function(){onclickRun();},document[_0x180aac(0x18d)]('save_config')['onclick']=async function(){saveConfig();},document[_0x180aac(0x18d)](_0x180aac(0x1a6))['disabled']=!![],clearTimer(),loginCountdownFinishTime=new Date()[_0x180aac(0x187)]()+loginCountdownTime,loginInterval=setInterval(loginCountdownfunction,0x3e8),userAccount=await wax[_0x180aac(0x1c7)](),updateAccount(userAccount),userAccount!=null&&(clearTimer(),document[_0x180aac(0x18d)](_0x180aac(0x1d6))['innerHTML']=_0x180aac(0x1e6),onclickRun(),document[_0x180aac(0x18d)]('run_btn')[_0x180aac(0x1d4)]=![]);}catch(_0x1fd591){console[_0x180aac(0x18b)](_0x180aac(0x1c6)+_0x1fd591),window[_0x180aac(0x1b8)][_0x180aac(0x1b0)]();}}async function run(){var _0x1f42d1=_0x5bc2ca;isWork=!![],clearTimer();if(!isMining){console[_0x1f42d1(0x18b)](_0x1f42d1(0x198)),isMining=!![];if(delay==0x0){delay=await getMineDelay(userAccount);let _0x4bf6fc=Math['floor'](Math['random']()*0x5208)+0xfa0,_0x1b8e34=0x0;Number[_0x1f42d1(0x1af)](delay)?_0x1b8e34=delay+_0x4bf6fc:_0x1b8e34=_0x4bf6fc,console[_0x1f42d1(0x18b)](_0x1f42d1(0x199)+_0x1b8e34/0x3e8+_0x1f42d1(0x1f4)+delay/0x3e8+_0x1f42d1(0x1cf)+_0x4bf6fc/0x3e8+_0x1f42d1(0x1be)),updateStatus(_0x1f42d1(0x1de)),updateNextMine(_0x1b8e34),updateAccStatus(),mineCountdownFinishTime=new Date()['getTime']()+_0x1b8e34,mineInterval=setInterval(chargingCountdownfunction,0x3e8);}}}async function miner(_0x49bdf8){var _0x3fd3e6=_0x5bc2ca;updateStatus('waiting\x20to\x20mine...'),updateStatus(_0x3fd3e6(0x1cc)),mineCountdownFinishTime=new Date()[_0x3fd3e6(0x187)]()+mineCountdownTime,newMineInterval=setInterval(miningCountdownfunction,0x3e8);let _0x2502c0=null;if(_0x49bdf8==_0x3fd3e6(0x1bd)||_0x49bdf8=='ninja_vip')try{_0x49bdf8==_0x3fd3e6(0x1ba)?_0x2502c0=await ninja_server_mine(userAccount,!![]):_0x2502c0=await ninja_server_mine(userAccount,![]);if(_0x2502c0=='ninja'){document[_0x3fd3e6(0x18d)](_0x3fd3e6(0x1d0))[_0x3fd3e6(0x1b6)]=!![];throw _0x3fd3e6(0x18e);}}catch(_0x57ae14){console[_0x3fd3e6(0x18b)](_0x3fd3e6(0x1df)+_0x57ae14);try{_0x2502c0=await self_mine(userAccount);}catch(_0x3643db){console[_0x3fd3e6(0x18b)](_0x3fd3e6(0x1b7)+_0x3643db),_0x2502c0=null;}}else{if(_0x49bdf8==_0x3fd3e6(0x1d0))try{_0x2502c0=await self_mine(userAccount);}catch(_0x1e0945){console[_0x3fd3e6(0x18b)](_0x3fd3e6(0x1b7)+_0x1e0945),_0x2502c0=null;}}if(_0x2502c0!=null){updateStatus(_0x3fd3e6(0x1d9));let _0x3b63dc=null;try{console[_0x3fd3e6(0x18b)]('account:'+userAccount+_0x3fd3e6(0x1fd)+_0x2502c0),_0x3b63dc=await claim(userAccount,_0x2502c0),totalget+=parseFloat(_0x3b63dc),minedCount+=0x1;let _0x379596=new Date();document[_0x3fd3e6(0x18d)]('last_mine')[_0x3fd3e6(0x1e1)]=_0x3b63dc+_0x3fd3e6(0x18a)+padLeadingZeros(_0x379596[_0x3fd3e6(0x1d3)](),0x2)+':'+padLeadingZeros(_0x379596[_0x3fd3e6(0x205)](),0x2)+':'+padLeadingZeros(_0x379596['getSeconds'](),0x2),document[_0x3fd3e6(0x18d)](_0x3fd3e6(0x194))[_0x3fd3e6(0x1e1)]=totalget[_0x3fd3e6(0x1dd)](0x4)+_0x3fd3e6(0x1e7)+minedCount+_0x3fd3e6(0x1ae);}catch(_0x834c62){updateStatus(_0x834c62);const _0x4d2ed2=handleError(_0x834c62);console[_0x3fd3e6(0x18b)](_0x3fd3e6(0x1e0)+_0x834c62);if(_0x4d2ed2==_0x3fd3e6(0x19b))updateStatus(_0x3fd3e6(0x1ea)+0x2+'\x20min'),nextmine=0x78*0x3e8,updateNextMine(nextmine);else{if(_0x4d2ed2=='mining')updateStatus(_0x3fd3e6(0x188)+0x2+_0x3fd3e6(0x1a5)),document[_0x3fd3e6(0x203)](_0x3fd3e6(0x1bc))[_0x3fd3e6(0x1cb)]==_0x3fd3e6(0x1bd)&&(document[_0x3fd3e6(0x18d)](_0x3fd3e6(0x1d0))[_0x3fd3e6(0x1b6)]=!![]),nextmine=0x78*0x3e8,updateNextMine(nextmine);else{if(_0x4d2ed2==_0x3fd3e6(0x189))document['getElementById']('cpu_time')[_0x3fd3e6(0x1cb)]>0x0&&(cpuDelay=document[_0x3fd3e6(0x18d)](_0x3fd3e6(0x1c4))['value']*0x3c*0x3e8),updateStatus(_0x3fd3e6(0x185)+cpuDelay/(0x3c*0x3e8)+'\x20min'),nextmine=cpuDelay,updateNextMine(nextmine);else{if(_0x4d2ed2=='newTx')updateStatus(_0x3fd3e6(0x1c8)+0xa+'\x20sec'),nextmine=0xa*0x3e8,updateNextMine(nextmine);else{if(_0x4d2ed2==_0x3fd3e6(0x1d1))updateStatus(_0x3fd3e6(0x1a7)+errorDelay/(0x3c*0x3e8)+_0x3fd3e6(0x1a5)),nextmine=errorDelay,updateNextMine(nextmine);else _0x4d2ed2=='break'?(updateStatus('Nothing\x20to\x20be\x20mine\x20wait\x20:\x20'+0x3c+_0x3fd3e6(0x1a5)),nextmine=0x3c*0x3c*0x3e8,updateNextMine(nextmine)):(updateStatus(_0x3fd3e6(0x1a7)+errorDelay/(0x3c*0x3e8)+_0x3fd3e6(0x1a5)),nextmine=errorDelay,updateNextMine(nextmine));}}}}}console[_0x3fd3e6(0x18b)](_0x3fd3e6(0x19f)),_0x3b63dc!=null?(delay=0x0,clearTimer(),updateStatus(_0x3fd3e6(0x1a0)),isMining=![],await sleep(0x2710),run()):(delay=0x0,clearTimer(),mineCountdownFinishTime=new Date()[_0x3fd3e6(0x187)]()+nextmine,newMineInterval=setInterval(miningCountdownfunction,0x3e8));}}function handleError(_0x2ff320){var _0x1c3b8d=_0x5bc2ca;const _0x97cb79=[_0x1c3b8d(0x1eb),_0x1c3b8d(0x197),_0x1c3b8d(0x1ef),_0x1c3b8d(0x1b5),'Failed'],_0xa99b81=[_0x1c3b8d(0x1ac),_0x1c3b8d(0x1c5)];if(_0x2ff320[_0x1c3b8d(0x1c2)][_0x1c3b8d(0x1fc)](_0x1c3b8d(0x1f7)))return _0x1c3b8d(0x189);else{if(_0x2ff320['message'][_0x1c3b8d(0x1fc)](_0x1c3b8d(0x1f8)))return _0x1c3b8d(0x1f1);else{if(_0xa99b81['some'](_0x99c479=>_0x2ff320[_0x1c3b8d(0x1c2)]['includes'](_0x99c479)))return'mining';else{if(_0x97cb79[_0x1c3b8d(0x1a3)](_0x2e35f9=>_0x2ff320[_0x1c3b8d(0x1c2)][_0x1c3b8d(0x1fc)](_0x2e35f9)))return _0x1c3b8d(0x19b);else return _0x2ff320[_0x1c3b8d(0x1c2)][_0x1c3b8d(0x1fc)](_0x1c3b8d(0x18f))?_0x1c3b8d(0x1d2):_0x1c3b8d(0x1d1);}}}}function _0xd558(_0x2e3423,_0xc254a5){_0x2e3423=_0x2e3423-0x185;var _0x169bcc=_0x169b[_0x2e3423];return _0x169bcc;}function stop(){clearTimer(),delay=0x0,isMining=![],isWork=![];}function onclickRun(){var _0x2fc219=_0x5bc2ca;clearTimer(),isWork?(stop(),updateStatus(_0x2fc219(0x190)),console[_0x2fc219(0x18b)](_0x2fc219(0x1a9)),document[_0x2fc219(0x18d)](_0x2fc219(0x1a6))['textContent']='Click\x20to\x20Start',document[_0x2fc219(0x18d)](_0x2fc219(0x1a6))[_0x2fc219(0x193)]=_0x2fc219(0x19a)):(isWork=!![],updateStatus('RUNNING'),console['log'](_0x2fc219(0x1ee)),delay=0x0,run(),document['getElementById'](_0x2fc219(0x1a6))['textContent']='Click\x20to\x20STOP',document['getElementById']('run_btn')[_0x2fc219(0x193)]=_0x2fc219(0x1b1));}function restart(){stop(),run();}