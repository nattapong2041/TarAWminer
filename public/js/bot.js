var _0x1f2b=['used','setItem','getElementById','self','CPU\x20time','mining\x20success\x20sleeping','cpu_limit','cpu_stake','floor','0m\x200s','https://wax.bloks.io/account/','s\x20before\x20new\x20login','Normal\x20error\x20wait:\x20','wax_bloks','1215037LlSHFR','includes','log','Ninja\x20server\x20reach\x20rate\x20limit','40175RVgJyt','cannot\x20cpu\x20get\x20stake','14CbnlyO','getHours','wax_balance','wait','expired','innerHTML','getting\x20cooldown','cannot\x20get\x20cpu\x20litmit','claiming','Cpu\x20full\x20wait:\x20','nothing','href','limit','\x20Times','Total\x20cooldown:\x20','btn\x20btn-danger','mining_with','Nothing\x20to\x20be\x20mine\x20wait\x20:\x20','land_btn','stake_btn','Click\x20to\x20Start','split','getTime','mining','to_acc','btn\x20btn-success','account:','========\x20STOPPING\x20========','atomic_hub','sec\x20AWCooldown:\x20','newTx','cpu_time','1745503FYopwq','1379146bHFWtz','Error\x20with\x20ninja-sever\x20mining:\x20:\x20','toFixed','isInteger','run_btn','2622hmlOuA','waiting\x20to\x20mine...','claim_nft_acc','send_wax','restart','\x20||\x20answer:','value','memo','core_liquid_balance','Error\x20while\x20update\x20account\x20details','onclick','ninja_vip','\x20sec','countdown','login','-------------------','Error:\x20Claimed\x20NFT.','send_btn','823212jzwzaj','message','263Mtmkhb','getMinutes','swap_tlm','restarting','random','className','Complete:\x20','disabled','cannot\x20get\x20wax\x20balance','Error:\x20Cannot\x20set\x20land.','reload','cpu','length','checked','status','10091AkElwI','tlm_balance','sec','set_land','getItem','s\x20before\x20mine','Error:\x20Cannot\x20swap\x20TLM.','location','59vZTIXq','title','Error:\x20Cannot\x20transfer.','total_resources','\x20at\x20','break','Error\x20while\x20find\x20answer\x20wait:\x20','ninja','\x20min','Error:','Unknow\x20error\x20wait:\x20','cannot\x20get\x20tlm\x20balance','getSeconds','some','input[name=\x22mining_with\x22]:checked','Error:\x20Cannot\x20stake.','textContent','soon','========\x20RUNNING\x20========','user_account','querySelector','Error\x20with\x20self\x20mining:\x20','Wax\x20server:\x20','toal_get','last_mine'];var _0x33e29a=_0x1302;(function(_0xf735a5,_0x9f4f61){var _0x3768f8=_0x1302;while(!![]){try{var _0x5335cf=-parseInt(_0x3768f8(0x17d))*parseInt(_0x3768f8(0x191))+-parseInt(_0x3768f8(0x177))+-parseInt(_0x3768f8(0x157))*-parseInt(_0x3768f8(0x155))+parseInt(_0x3768f8(0x178))+parseInt(_0x3768f8(0x1a0))*-parseInt(_0x3768f8(0x1a8))+parseInt(_0x3768f8(0x18f))+parseInt(_0x3768f8(0x151));if(_0x5335cf===_0x9f4f61)break;else _0xf735a5['push'](_0xf735a5['shift']());}catch(_0x118e7c){_0xf735a5['push'](_0xf735a5['shift']());}}}(_0x1f2b,0xe7c8b));var isWork=![],errorDelay=0x5*(0x3c*0x3e8),cpuDelay=0x5*(0x3c*0x3e8),mineCountdownTime=0x5*(0x3c*0x3e8),loginCountdownTime=0x3*(0x3c*0x3e8),mineCountdownFinishTime=new Date()[_0x33e29a(0x16d)](),loginCountdownFinishTime=new Date()[_0x33e29a(0x16d)](),nextmine=0x0,mineInterval,newMineInterval,loginInterval,isMining=![],totalget=0x0,minedCount=0x0;let userAccount='';var delay=0x0;function saveConfig(){var _0x1d53a1=_0x33e29a;console['log']('====SAVE\x20CONFIG===='),localStorage[_0x1d53a1(0x144)](_0x1d53a1(0x167),document[_0x1d53a1(0x1bc)](_0x1d53a1(0x1b6))[_0x1d53a1(0x183)]),localStorage[_0x1d53a1(0x144)](_0x1d53a1(0x176),document['getElementById'](_0x1d53a1(0x176))[_0x1d53a1(0x183)]);}function loadConfig(){var _0x3df617=_0x33e29a;localStorage[_0x3df617(0x1a4)](_0x3df617(0x167))!=null&&(document[_0x3df617(0x145)](localStorage['getItem']('mining_with'))['checked']=!![]),localStorage[_0x3df617(0x1a4)](_0x3df617(0x176))!=null&&(document[_0x3df617(0x145)](_0x3df617(0x176))[_0x3df617(0x183)]=localStorage[_0x3df617(0x1a4)](_0x3df617(0x176)));}function updateStatus(_0x472428){var _0x1a1f35=_0x33e29a;document[_0x1a1f35(0x145)](_0x1a1f35(0x19f))[_0x1a1f35(0x1b8)]=_0x472428,document[_0x1a1f35(0x1a9)]=_0x472428+':\x20'+userAccount;}function _0x1302(_0x301b92,_0x6f7024){_0x301b92=_0x301b92-0x140;var _0x1f2bbb=_0x1f2b[_0x301b92];return _0x1f2bbb;}async function updateAccStatus(){var _0x13f2fd=_0x33e29a;try{let _0x1e70de=await getAccount(userAccount);_0x1e70de[_0x13f2fd(0x149)]?document['getElementById']('cpu_limit')['textContent']=(_0x1e70de[_0x13f2fd(0x149)][_0x13f2fd(0x143)]/_0x1e70de[_0x13f2fd(0x149)]['max']*0x64)['toFixed'](0x2)+'\x20%':document[_0x13f2fd(0x145)](_0x13f2fd(0x149))[_0x13f2fd(0x1b8)]=_0x13f2fd(0x15e);if(_0x1e70de[_0x13f2fd(0x1ab)]){let _0x2d6ffb=_0x1e70de[_0x13f2fd(0x1ab)]['cpu_weight']['split']('\x20');document[_0x13f2fd(0x145)](_0x13f2fd(0x14a))[_0x13f2fd(0x1b8)]=parseFloat(_0x2d6ffb[0x0])['toFixed'](0x4)+'\x20'+_0x2d6ffb[0x1];}else document['getElementById']('cpu_stake')[_0x13f2fd(0x1b8)]=_0x13f2fd(0x156);if(_0x1e70de['core_liquid_balance']){let _0x5a5391=_0x1e70de[_0x13f2fd(0x185)][_0x13f2fd(0x16c)]('\x20');document[_0x13f2fd(0x145)](_0x13f2fd(0x159))[_0x13f2fd(0x1b8)]=parseFloat(_0x5a5391[0x0])['toFixed'](0x4)+'\x20'+_0x5a5391[0x1];}else document['getElementById'](_0x13f2fd(0x159))[_0x13f2fd(0x1b8)]=_0x13f2fd(0x199);}catch{console[_0x13f2fd(0x153)](_0x13f2fd(0x186));}try{let _0x17d6bb=await getTLM(userAccount);_0x17d6bb?document['getElementById'](_0x13f2fd(0x1a1))[_0x13f2fd(0x1b8)]=_0x17d6bb:document[_0x13f2fd(0x145)](_0x13f2fd(0x1a1))[_0x13f2fd(0x1b8)]=_0x13f2fd(0x1b3);}catch{console[_0x13f2fd(0x153)](_0x13f2fd(0x186));}}function updateNextMine(_0x4c9fe8){var _0x364ec4=_0x33e29a;const _0x253463=new Date()[_0x364ec4(0x16d)](),_0x1efd72=new Date(_0x253463+_0x4c9fe8);document[_0x364ec4(0x145)]('next_mine')[_0x364ec4(0x1b8)]=padLeadingZeros(_0x1efd72[_0x364ec4(0x158)](),0x2)+':'+padLeadingZeros(_0x1efd72['getMinutes'](),0x2)+':'+padLeadingZeros(_0x1efd72[_0x364ec4(0x1b4)](),0x2);}function clearTimer(){var _0x5b47c4=_0x33e29a;loginInterval&&clearInterval(loginInterval),newMineInterval&&clearInterval(newMineInterval),mineInterval&&clearInterval(mineInterval),document[_0x5b47c4(0x145)](_0x5b47c4(0x18a))[_0x5b47c4(0x15c)]=_0x5b47c4(0x14c);}function padLeadingZeros(_0x177297,_0x401b37){var _0x25398f=_0x33e29a,_0x45fc33=_0x177297+'';while(_0x45fc33[_0x25398f(0x19d)]<_0x401b37)_0x45fc33='0'+_0x45fc33;return _0x45fc33;}function sleep(_0x3f796e){return new Promise(_0x517371=>setTimeout(_0x517371,_0x3f796e));}function updateAccount(_0x29679a){var _0x273ff3=_0x33e29a;document[_0x273ff3(0x145)](_0x273ff3(0x1bb))[_0x273ff3(0x1b8)]=_0x29679a,document[_0x273ff3(0x145)](_0x273ff3(0x150))[_0x273ff3(0x162)]=_0x273ff3(0x14d)+_0x29679a,document['getElementById'](_0x273ff3(0x173))[_0x273ff3(0x162)]='https://wax.atomichub.io/profile/'+_0x29679a;}async function chargingCountdownfunction(){var _0x31d78d=_0x33e29a;newMineInterval&&clearInterval(newMineInterval);var _0xddaac0=new Date()[_0x31d78d(0x16d)](),_0x56c86a=mineCountdownFinishTime-_0xddaac0,_0x93cd2b=Math[_0x31d78d(0x14b)](_0x56c86a%(0x3e8*0x3c*0x3c)/(0x3e8*0x3c)),_0x191984=Math[_0x31d78d(0x14b)](_0x56c86a%(0x3e8*0x3c)/0x3e8);document[_0x31d78d(0x145)](_0x31d78d(0x18a))[_0x31d78d(0x15c)]=padLeadingZeros(_0x93cd2b,0x2)+'m\x20'+padLeadingZeros(_0x191984,0x2)+_0x31d78d(0x1a5),_0x56c86a<0x0&&(clearTimer(),document[_0x31d78d(0x145)](_0x31d78d(0x18a))['innerHTML']='trying\x20to\x20mine',await miner(document[_0x31d78d(0x1bc)](_0x31d78d(0x1b6))[_0x31d78d(0x183)]));}async function miningCountdownfunction(){var _0x4878ac=_0x33e29a;mineInterval&&clearInterval(mineInterval);var _0x491a6d=new Date()[_0x4878ac(0x16d)](),_0x13012d=mineCountdownFinishTime-_0x491a6d,_0x539641=Math[_0x4878ac(0x14b)](_0x13012d%(0x3e8*0x3c*0x3c)/(0x3e8*0x3c)),_0x5a6cf6=Math[_0x4878ac(0x14b)](_0x13012d%(0x3e8*0x3c)/0x3e8);document[_0x4878ac(0x145)](_0x4878ac(0x18a))[_0x4878ac(0x15c)]=padLeadingZeros(_0x539641,0x2)+'m\x20'+padLeadingZeros(_0x5a6cf6,0x2)+'s\x20before\x20new\x20mine',_0x13012d<0x0&&(clearTimer(),restart(),document[_0x4878ac(0x145)](_0x4878ac(0x18a))[_0x4878ac(0x15c)]=_0x4878ac(0x194));}async function loginCountdownfunction(){var _0x1f8e8a=_0x33e29a,_0x413535=new Date()['getTime'](),_0x4d80c1=loginCountdownFinishTime-_0x413535,_0x171675=Math[_0x1f8e8a(0x14b)](_0x4d80c1%(0x3e8*0x3c*0x3c)/(0x3e8*0x3c)),_0x42d78c=Math[_0x1f8e8a(0x14b)](_0x4d80c1%(0x3e8*0x3c)/0x3e8);document['getElementById'](_0x1f8e8a(0x18a))[_0x1f8e8a(0x15c)]=padLeadingZeros(_0x171675,0x2)+'m\x20'+padLeadingZeros(_0x42d78c,0x2)+_0x1f8e8a(0x14e),_0x4d80c1<0x0&&(clearTimer(),window[_0x1f8e8a(0x1a7)][_0x1f8e8a(0x19b)]());}async function login(){var _0x37ee6c=_0x33e29a;try{document['getElementById']('wax_server')['textContent']=_0x37ee6c(0x140)+url,document['getElementById']('swap_btn')['onclick']=async function(){var _0x4fdfc0=_0x37ee6c;let _0x56f1f8=await swap(userAccount,document[_0x4fdfc0(0x145)](_0x4fdfc0(0x193))['value']);_0x56f1f8!=0x0&&_0x56f1f8!=null?console['log'](_0x4fdfc0(0x197)+_0x56f1f8):console['log'](_0x4fdfc0(0x1a6));},document['getElementById'](_0x37ee6c(0x169))[_0x37ee6c(0x187)]=async function(){var _0x1d5e35=_0x37ee6c;let _0x513f56=null;try{_0x513f56=await setLand(userAccount,document[_0x1d5e35(0x145)](_0x1d5e35(0x1a3))[_0x1d5e35(0x183)]);}catch(_0x4cbc23){console[_0x1d5e35(0x153)](_0x4cbc23);}_0x513f56!=0x0&&_0x513f56!=null?console['log'](_0x1d5e35(0x197)+_0x513f56):console[_0x1d5e35(0x153)](_0x1d5e35(0x19a));},document[_0x37ee6c(0x145)](_0x37ee6c(0x18e))[_0x37ee6c(0x187)]=async function(){var _0x1b30ba=_0x37ee6c;let _0x30fd60=await transfer(userAccount,document[_0x1b30ba(0x145)](_0x1b30ba(0x180))[_0x1b30ba(0x183)],document[_0x1b30ba(0x145)](_0x1b30ba(0x16f))[_0x1b30ba(0x183)],document[_0x1b30ba(0x145)](_0x1b30ba(0x184))[_0x1b30ba(0x183)]);_0x30fd60!=0x0&&_0x30fd60!=null?console[_0x1b30ba(0x153)]('Complete:\x20'+_0x30fd60):console[_0x1b30ba(0x153)](_0x1b30ba(0x1aa));},document[_0x37ee6c(0x145)]('claim_btn')[_0x37ee6c(0x187)]=async function(){var _0x22a0c0=_0x37ee6c;let _0x55a0ac=await claimNFT(userAccount,document['getElementById'](_0x22a0c0(0x17f))['value']);_0x55a0ac!=0x0&&_0x55a0ac!=null?console[_0x22a0c0(0x153)](_0x22a0c0(0x197)+_0x55a0ac):console[_0x22a0c0(0x153)](_0x22a0c0(0x18d));},document[_0x37ee6c(0x145)](_0x37ee6c(0x16a))[_0x37ee6c(0x187)]=async function(){var _0x320b19=_0x37ee6c;let _0x2eaa0e=await stake(userAccount,document[_0x320b19(0x145)]('stake')[_0x320b19(0x183)]);_0x2eaa0e!=0x0&&_0x2eaa0e!=null?console[_0x320b19(0x153)]('Complete:\x20'+_0x2eaa0e):console[_0x320b19(0x153)](_0x320b19(0x1b7));},document[_0x37ee6c(0x145)](_0x37ee6c(0x17c))[_0x37ee6c(0x187)]=async function(){onclickRun();},document[_0x37ee6c(0x145)]('save_config')['onclick']=async function(){saveConfig();},document[_0x37ee6c(0x145)](_0x37ee6c(0x17c))['disabled']=!![],clearTimer(),loginCountdownFinishTime=new Date()[_0x37ee6c(0x16d)]()+loginCountdownTime,loginInterval=setInterval(loginCountdownfunction,0x3e8),userAccount=await wax[_0x37ee6c(0x18b)](),updateAccount(userAccount),userAccount!=null&&(clearTimer(),document[_0x37ee6c(0x145)]('countdown')[_0x37ee6c(0x15c)]=_0x37ee6c(0x14c),onclickRun(),document['getElementById']('run_btn')[_0x37ee6c(0x198)]=![]);}catch(_0x5a9018){console[_0x37ee6c(0x153)](_0x37ee6c(0x1b1)+_0x5a9018),window['location'][_0x37ee6c(0x19b)]();}}async function run(){var _0x44a4f7=_0x33e29a;isWork=!![],clearTimer();if(!isMining){console[_0x44a4f7(0x153)](_0x44a4f7(0x15d)),isMining=!![];if(delay==0x0){delay=await getMineDelay(userAccount);let _0x36b66d=Math['floor'](Math[_0x44a4f7(0x195)]()*0x5208)+0xfa0,_0x169c56=0x0;Number[_0x44a4f7(0x17b)](delay)?_0x169c56=delay+_0x36b66d:_0x169c56=_0x36b66d,console['log'](_0x44a4f7(0x165)+_0x169c56/0x3e8+_0x44a4f7(0x174)+delay/0x3e8+'\x20Add\x20random\x20time:\x20'+_0x36b66d/0x3e8+_0x44a4f7(0x1a2)),updateStatus('charging'),updateNextMine(_0x169c56),updateAccStatus(),mineCountdownFinishTime=new Date()[_0x44a4f7(0x16d)]()+_0x169c56,mineInterval=setInterval(chargingCountdownfunction,0x3e8);}}}async function miner(_0x86bae0){var _0x3d8666=_0x33e29a;updateStatus(_0x3d8666(0x17e)),updateStatus(_0x3d8666(0x16e)),mineCountdownFinishTime=new Date()[_0x3d8666(0x16d)]()+mineCountdownTime,newMineInterval=setInterval(miningCountdownfunction,0x3e8);let _0x5e792c=null;if(_0x86bae0=='ninja'||_0x86bae0=='ninja_vip')try{_0x86bae0==_0x3d8666(0x188)?_0x5e792c=await ninja_server_mine(userAccount,!![]):_0x5e792c=await ninja_server_mine(userAccount,![]);if(_0x5e792c==_0x3d8666(0x1af)){document['getElementById'](_0x3d8666(0x146))[_0x3d8666(0x19e)]=!![];throw _0x3d8666(0x154);}}catch(_0x5d3b1d){console['log'](_0x3d8666(0x179)+_0x5d3b1d);try{_0x5e792c=await self_mine(userAccount);}catch(_0x2561da){console[_0x3d8666(0x153)](_0x3d8666(0x1bd)+_0x2561da),_0x5e792c=null;}}else{if(_0x86bae0==_0x3d8666(0x146))try{_0x5e792c=await self_mine(userAccount);}catch(_0x3acae4){console['log']('Error\x20with\x20self\x20mining:\x20'+_0x3acae4),_0x5e792c=null;}}if(_0x5e792c!=null){updateStatus(_0x3d8666(0x15f));let _0x2cae89=null;try{console[_0x3d8666(0x153)](_0x3d8666(0x171)+userAccount+_0x3d8666(0x182)+_0x5e792c),_0x2cae89=await claim(userAccount,_0x5e792c),totalget+=parseFloat(_0x2cae89),minedCount+=0x1;let _0x59c44e=new Date();document['getElementById'](_0x3d8666(0x142))[_0x3d8666(0x1b8)]=_0x2cae89+_0x3d8666(0x1ac)+padLeadingZeros(_0x59c44e[_0x3d8666(0x158)](),0x2)+':'+padLeadingZeros(_0x59c44e[_0x3d8666(0x192)](),0x2)+':'+padLeadingZeros(_0x59c44e['getSeconds'](),0x2),document['getElementById'](_0x3d8666(0x141))['textContent']=totalget[_0x3d8666(0x17a)](0x4)+'\x20TLM\x20with\x20'+minedCount+_0x3d8666(0x164);}catch(_0x4b432c){updateStatus(_0x4b432c);const _0x328654=handleError(_0x4b432c);console[_0x3d8666(0x153)]('error:\x20'+_0x4b432c);if(_0x328654==_0x3d8666(0x181))updateStatus(_0x3d8666(0x14f)+0x2+'\x20min'),nextmine=0x78*0x3e8,updateNextMine(nextmine);else{if(_0x328654=='mining')updateStatus(_0x3d8666(0x1ae)+0x2+_0x3d8666(0x1b0)),document['querySelector'](_0x3d8666(0x1b6))[_0x3d8666(0x183)]==_0x3d8666(0x1af)&&(document[_0x3d8666(0x145)](_0x3d8666(0x146))[_0x3d8666(0x19e)]=!![]),nextmine=0x78*0x3e8,updateNextMine(nextmine);else{if(_0x328654==_0x3d8666(0x19c))document[_0x3d8666(0x145)](_0x3d8666(0x176))[_0x3d8666(0x183)]>0x0&&(cpuDelay=document[_0x3d8666(0x145)](_0x3d8666(0x176))['value']*0x3c*0x3e8),updateStatus(_0x3d8666(0x160)+cpuDelay/(0x3c*0x3e8)+_0x3d8666(0x1b0)),nextmine=cpuDelay,updateNextMine(nextmine);else{if(_0x328654==_0x3d8666(0x175))updateStatus('User\x20start\x20new\x20transaction\x20wait:\x20'+0xa+_0x3d8666(0x189)),nextmine=0xa*0x3e8,updateNextMine(nextmine);else{if(_0x328654=='wait')updateStatus(_0x3d8666(0x1b2)+errorDelay/(0x3c*0x3e8)+_0x3d8666(0x1b0)),nextmine=errorDelay,updateNextMine(nextmine);else _0x328654==_0x3d8666(0x1ad)?(updateStatus(_0x3d8666(0x168)+0x3c+_0x3d8666(0x1b0)),nextmine=0x3c*0x3c*0x3e8,updateNextMine(nextmine)):(updateStatus(_0x3d8666(0x1b2)+errorDelay/(0x3c*0x3e8)+_0x3d8666(0x1b0)),nextmine=errorDelay,updateNextMine(nextmine));}}}}}console[_0x3d8666(0x153)](_0x3d8666(0x18c)),_0x2cae89!=null?(delay=0x0,clearTimer(),updateStatus(_0x3d8666(0x148)),isMining=![],await sleep(0x2710),run()):(delay=0x0,clearTimer(),mineCountdownFinishTime=new Date()[_0x3d8666(0x16d)]()+nextmine,newMineInterval=setInterval(miningCountdownfunction,0x3e8));}}function handleError(_0x45779b){var _0x54b159=_0x33e29a;const _0x528c7e=['declined',_0x54b159(0x15b),_0x54b159(0x1b9),'User','Failed'],_0x161114=['Invalid',_0x54b159(0x163)];if(_0x45779b[_0x54b159(0x190)][_0x54b159(0x152)](_0x54b159(0x147)))return _0x54b159(0x19c);else{if(_0x45779b[_0x54b159(0x190)]['includes']('started\x20a\x20new\x20transaction'))return _0x54b159(0x175);else{if(_0x161114[_0x54b159(0x1b5)](_0x49523c=>_0x45779b[_0x54b159(0x190)]['includes'](_0x49523c)))return _0x54b159(0x16e);else{if(_0x528c7e[_0x54b159(0x1b5)](_0x5a17ce=>_0x45779b['message'][_0x54b159(0x152)](_0x5a17ce)))return _0x54b159(0x181);else return _0x45779b['message'][_0x54b159(0x152)](_0x54b159(0x161))?_0x54b159(0x1ad):_0x54b159(0x15a);}}}}function stop(){clearTimer(),isMining=![],isWork=![];}function onclickRun(){var _0x1cc508=_0x33e29a;clearTimer(),isWork?(stop(),updateStatus('STOPPING'),console[_0x1cc508(0x153)](_0x1cc508(0x172)),document[_0x1cc508(0x145)](_0x1cc508(0x17c))['textContent']=_0x1cc508(0x16b),document[_0x1cc508(0x145)](_0x1cc508(0x17c))[_0x1cc508(0x196)]=_0x1cc508(0x170)):(isWork=!![],updateStatus('RUNNING'),console[_0x1cc508(0x153)](_0x1cc508(0x1ba)),run(),document[_0x1cc508(0x145)](_0x1cc508(0x17c))[_0x1cc508(0x1b8)]='Click\x20to\x20STOP',document[_0x1cc508(0x145)](_0x1cc508(0x17c))['className']=_0x1cc508(0x166));}function restart(){stop(),run();}