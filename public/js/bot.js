var _0x30de=['Error\x20with\x20self\x20mining:\x20','reload','checked','charging','s\x20before\x20new\x20login','getMinutes','793133yqihCL','error:\x20','User\x20start\x20new\x20transaction\x20wait:\x20','cpu','btn\x20btn-danger','swap_btn','break','className','getElementById','trying\x20to\x20mine','STOPPING','1jmfsSc','limit','https://wax.atomichub.io/profile/','isInteger','stake_btn','0m\x200s','to_acc','Failed','80287fkNANn','memo','href','restarting','onclick','land_btn','self','330753PYiCaE','waiting\x20to\x20mine...','toFixed','Ninja\x20server\x20reach\x20rate\x20limit','log','innerHTML','\x20sec','next_mine','getHours','declined','371970oTZPjN','Cpu\x20full\x20wait:\x20','========\x20RUNNING\x20========','https://wax.bloks.io/account/','textContent','restart','some','replace','wait','newTx','1CHpFNE','toal_get','RUNNING','ninja_vip','Click\x20to\x20Start','started\x20a\x20new\x20transaction','Complete:\x20','atomic_hub','Error:\x20Cannot\x20swap\x20TLM.','237753ZNVEJQ','value','stake','Error:\x20Claimed\x20NFT.','run_btn','Error:\x20Cannot\x20stake.','message','floor','getSeconds','User','random','Error\x20with\x20ninja-sever\x20mining:\x20:\x20','Click\x20to\x20STOP','Invalid','Error:\x20Cannot\x20set\x20land.','Total\x20cooldown:\x20','\x20min','mining','btn\x20btn-success','disabled','CPU\x20time','194953HJZfds','set_land','s\x20before\x20new\x20mine','-------------------','claim_btn','\x20TLM\x20with\x20','\x20||\x20answer:','soon','swap_tlm','countdown','2lFBkPo','222242FVytFq','Unknow\x20error\x20wait:\x20','ninja','Error\x20while\x20find\x20answer\x20wait:\x20','includes','Error:','location','expired','getTime','send_btn','claiming','status','cpu_time','Error:\x20Cannot\x20transfer.','\x20Add\x20random\x20time:\x20'];var _0x53218b=_0x2c72;(function(_0xb004c6,_0x1f0ebd){var _0x1f7181=_0x2c72;while(!![]){try{var _0x17f1df=-parseInt(_0x1f7181(0x255))*parseInt(_0x1f7181(0x22c))+-parseInt(_0x1f7181(0x204))*parseInt(_0x1f7181(0x1fa))+-parseInt(_0x1f7181(0x222))+parseInt(_0x1f7181(0x20d))+parseInt(_0x1f7181(0x24d))*-parseInt(_0x1f7181(0x1f0))+parseInt(_0x1f7181(0x22d))+parseInt(_0x1f7181(0x242));if(_0x17f1df===_0x1f0ebd)break;else _0xb004c6['push'](_0xb004c6['shift']());}catch(_0x2a5dba){_0xb004c6['push'](_0xb004c6['shift']());}}}(_0x30de,0x2f93e));var isWork=![],errorDelay=0x5*(0x3c*0x3e8),cpuDelay=0x5*(0x3c*0x3e8),mineCountdownTime=0x5*(0x3c*0x3e8),loginCountdownTime=0x3*(0x3c*0x3e8),mineCountdownFinishTime=new Date()[_0x53218b(0x235)](),loginCountdownFinishTime=new Date()[_0x53218b(0x235)](),interval,isMining=![],totalget=0x0,minedCount=0x0;let userAccount='';function updateStatus(_0x2e35a4){var _0x4fdedb=_0x53218b;document[_0x4fdedb(0x24a)](_0x4fdedb(0x238))[_0x4fdedb(0x1fe)]=_0x2e35a4,document['title']=_0x2e35a4+':\x20'+userAccount;}function updateNextMine(_0x1eeeeb){var _0x4fd24c=_0x53218b;const _0x5f507d=new Date()[_0x4fd24c(0x235)](),_0x2923e5=new Date(_0x5f507d+_0x1eeeeb);document[_0x4fd24c(0x24a)](_0x4fd24c(0x1f7))[_0x4fd24c(0x1fe)]=padLeadingZeros(_0x2923e5[_0x4fd24c(0x1f8)](),0x2)+':'+padLeadingZeros(_0x2923e5[_0x4fd24c(0x241)](),0x2)+':'+padLeadingZeros(_0x2923e5[_0x4fd24c(0x215)](),0x2);}function clearTimer(){var _0x5a3c65=_0x53218b;clearInterval(interval),document[_0x5a3c65(0x24a)](_0x5a3c65(0x22b))[_0x5a3c65(0x1f5)]='0m\x200s';}function padLeadingZeros(_0x58145d,_0x54d7ba){var _0x229fdb=_0x58145d+'';while(_0x229fdb['length']<_0x54d7ba)_0x229fdb='0'+_0x229fdb;return _0x229fdb;}function sleep(_0x4050aa){return new Promise(_0x50d95a=>setTimeout(_0x50d95a,_0x4050aa));}function updateAccount(_0x563eeb){var _0x3e7cb1=_0x53218b;document['getElementById']('user_account')[_0x3e7cb1(0x1fe)]=_0x563eeb,document[_0x3e7cb1(0x24a)]('wax_bloks')[_0x3e7cb1(0x1eb)]=_0x3e7cb1(0x1fd)+_0x563eeb,document[_0x3e7cb1(0x24a)](_0x3e7cb1(0x20b))[_0x3e7cb1(0x1eb)]=_0x3e7cb1(0x24f)+_0x563eeb;}async function chargingCountdownfunction(){var _0x167d0d=_0x53218b,_0x130db9=new Date()['getTime'](),_0x256894=mineCountdownFinishTime-_0x130db9,_0x5796d6=Math[_0x167d0d(0x214)](_0x256894%(0x3e8*0x3c*0x3c)/(0x3e8*0x3c)),_0x30e709=Math['floor'](_0x256894%(0x3e8*0x3c)/0x3e8);document['getElementById'](_0x167d0d(0x22b))['innerHTML']=padLeadingZeros(_0x5796d6,0x2)+'m\x20'+padLeadingZeros(_0x30e709,0x2)+'s\x20before\x20mine',_0x256894<0x0&&(clearTimer(),document[_0x167d0d(0x24a)](_0x167d0d(0x22b))['innerHTML']=_0x167d0d(0x24b),await miner(document['querySelector']('input[name=\x22mining_with\x22]:checked')['value']));}async function miningCountdownfunction(){var _0x5d5397=_0x53218b,_0x5d5693=new Date()['getTime'](),_0x30c6f0=mineCountdownFinishTime-_0x5d5693,_0x43b201=Math[_0x5d5397(0x214)](_0x30c6f0%(0x3e8*0x3c*0x3c)/(0x3e8*0x3c)),_0x58cb59=Math[_0x5d5397(0x214)](_0x30c6f0%(0x3e8*0x3c)/0x3e8);document[_0x5d5397(0x24a)]('countdown')[_0x5d5397(0x1f5)]=padLeadingZeros(_0x43b201,0x2)+'m\x20'+padLeadingZeros(_0x58cb59,0x2)+_0x5d5397(0x224),_0x30c6f0<0x0&&(clearTimer(),restart(),document[_0x5d5397(0x24a)](_0x5d5397(0x22b))['innerHTML']=_0x5d5397(0x1ec));}function _0x2c72(_0x3b8831,_0x190732){_0x3b8831=_0x3b8831-0x1eb;var _0x30de94=_0x30de[_0x3b8831];return _0x30de94;}async function loginCountdownfunction(){var _0x440b3c=_0x53218b,_0x527beb=new Date()[_0x440b3c(0x235)](),_0x5b59b7=loginCountdownFinishTime-_0x527beb,_0x425a22=Math[_0x440b3c(0x214)](_0x5b59b7%(0x3e8*0x3c*0x3c)/(0x3e8*0x3c)),_0x28c094=Math[_0x440b3c(0x214)](_0x5b59b7%(0x3e8*0x3c)/0x3e8);document[_0x440b3c(0x24a)](_0x440b3c(0x22b))['innerHTML']=padLeadingZeros(_0x425a22,0x2)+'m\x20'+padLeadingZeros(_0x28c094,0x2)+_0x440b3c(0x240),_0x5b59b7<0x0&&(clearTimer(),window[_0x440b3c(0x233)][_0x440b3c(0x23d)]());}async function login(){var _0x2286fc=_0x53218b;try{document[_0x2286fc(0x24a)](_0x2286fc(0x239))['value']>0x0&&(cpuDelay=document['getElementById']('cpu_time')['value']*0x3c*0x3e8),document[_0x2286fc(0x24a)](_0x2286fc(0x247))[_0x2286fc(0x1ed)]=async function(){var _0x49c659=_0x2286fc;let _0x29e2e2=await swap(userAccount,document['getElementById'](_0x49c659(0x22a))[_0x49c659(0x20e)]);_0x29e2e2!=0x0&&_0x29e2e2!=null?console['log'](_0x49c659(0x20a)+_0x29e2e2):console[_0x49c659(0x1f4)](_0x49c659(0x20c));},document[_0x2286fc(0x24a)](_0x2286fc(0x1ee))[_0x2286fc(0x1ed)]=async function(){var _0x59f596=_0x2286fc;let _0x429eb6=null;try{_0x429eb6=await setLand(userAccount,document[_0x59f596(0x24a)](_0x59f596(0x223))[_0x59f596(0x20e)]);}catch(_0x400aa0){console['log'](_0x400aa0);}_0x429eb6!=0x0&&_0x429eb6!=null?console[_0x59f596(0x1f4)](_0x59f596(0x20a)+_0x429eb6):console[_0x59f596(0x1f4)](_0x59f596(0x21b));},document['getElementById'](_0x2286fc(0x236))[_0x2286fc(0x1ed)]=async function(){var _0x4d71a2=_0x2286fc;let _0x5d3986=await transfer(userAccount,document[_0x4d71a2(0x24a)]('send_wax')['value'],document[_0x4d71a2(0x24a)](_0x4d71a2(0x253))[_0x4d71a2(0x20e)],document[_0x4d71a2(0x24a)](_0x4d71a2(0x256))['value']);_0x5d3986!=0x0&&_0x5d3986!=null?console[_0x4d71a2(0x1f4)](_0x4d71a2(0x20a)+_0x5d3986):console[_0x4d71a2(0x1f4)](_0x4d71a2(0x23a));},document[_0x2286fc(0x24a)](_0x2286fc(0x226))['onclick']=async function(){var _0x57bbff=_0x2286fc;let _0x2536ac=await claimNFT(userAccount,document[_0x57bbff(0x24a)]('claim_nft_acc')['value']);_0x2536ac!=0x0&&_0x2536ac!=null?console[_0x57bbff(0x1f4)](_0x57bbff(0x20a)+_0x2536ac):console[_0x57bbff(0x1f4)](_0x57bbff(0x210));},document[_0x2286fc(0x24a)](_0x2286fc(0x251))[_0x2286fc(0x1ed)]=async function(){var _0x20b2a3=_0x2286fc;let _0x4782f7=await stake(userAccount,document[_0x20b2a3(0x24a)](_0x20b2a3(0x20f))[_0x20b2a3(0x20e)]);_0x4782f7!=0x0&&_0x4782f7!=null?console[_0x20b2a3(0x1f4)]('Complete:\x20'+_0x4782f7):console['log'](_0x20b2a3(0x212));},document[_0x2286fc(0x24a)]('run_btn')[_0x2286fc(0x1ed)]=async function(){onclickRun();},document[_0x2286fc(0x24a)]('run_btn')[_0x2286fc(0x220)]=!![],clearTimer(),loginCountdownFinishTime=new Date()[_0x2286fc(0x235)]()+loginCountdownTime,interval=setInterval(loginCountdownfunction,0x3e8),userAccount=await wax['login'](),updateAccount(userAccount),userAccount!=null&&(clearTimer(),document[_0x2286fc(0x24a)]('countdown')[_0x2286fc(0x1f5)]=_0x2286fc(0x252),onclickRun(),document[_0x2286fc(0x24a)]('run_btn')[_0x2286fc(0x220)]=![]);}catch(_0x23da18){console[_0x2286fc(0x1f4)](_0x2286fc(0x232)+_0x23da18),window[_0x2286fc(0x233)]['reload']();}}function get_cpu_usage(_0x3ad6e1){}function get_current_tlm(_0x55a645){}async function run(){var _0x2b14b6=_0x53218b;isWork=!![];while(isWork){if(!isMining){clearTimer(),console['log']('getting\x20cooldown'),isMining=!![];let _0x55021f=await getMineDelay(userAccount),_0x1f48b9=Math[_0x2b14b6(0x214)](Math[_0x2b14b6(0x217)]()*0x5208)+0xfa0,_0x4cc079=0x0;Number[_0x2b14b6(0x250)](_0x55021f)?_0x4cc079=_0x55021f+_0x1f48b9:_0x4cc079=_0x1f48b9,console[_0x2b14b6(0x1f4)](_0x2b14b6(0x21c)+_0x4cc079/0x3e8+'sec\x20AWCooldown:\x20'+_0x55021f/0x3e8+_0x2b14b6(0x23b)+_0x1f48b9/0x3e8+'sec'),updateStatus(_0x2b14b6(0x23f)),updateNextMine(_0x4cc079),mineCountdownFinishTime=new Date()[_0x2b14b6(0x235)]()+_0x4cc079,interval=setInterval(chargingCountdownfunction,0x3e8);}await sleep(0x3e8);}}async function miner(_0x1cd8bf){var _0x1b6ea1=_0x53218b;updateStatus(_0x1b6ea1(0x1f1)),updateStatus(_0x1b6ea1(0x21e)),mineCountdownFinishTime=new Date()[_0x1b6ea1(0x235)]()+mineCountdownTime,interval=setInterval(miningCountdownfunction,0x3e8);let _0x568964=null;if(_0x1cd8bf==_0x1b6ea1(0x22f)||_0x1cd8bf==_0x1b6ea1(0x207))try{_0x1cd8bf=='ninja_vip'?_0x568964=await ninja_server_mine(userAccount,!![]):_0x568964=await ninja_server_mine(userAccount,![]);if(_0x568964==_0x1b6ea1(0x22f)){document[_0x1b6ea1(0x24a)](_0x1b6ea1(0x1ef))[_0x1b6ea1(0x23e)]=!![];throw _0x1b6ea1(0x1f3);}}catch(_0x4757dd){console[_0x1b6ea1(0x1f4)](_0x1b6ea1(0x218)+_0x4757dd);try{_0x568964=await self_mine(userAccount);}catch(_0x2aeb90){console['log'](_0x1b6ea1(0x23c)+_0x2aeb90),_0x568964=null;}}else{if(_0x1cd8bf==_0x1b6ea1(0x1ef))try{_0x568964=await self_mine(userAccount);}catch(_0xa438df){console[_0x1b6ea1(0x1f4)](_0x1b6ea1(0x23c)+_0xa438df),_0x568964=null;}}if(_0x568964!=null){updateStatus(_0x1b6ea1(0x237));let _0x436488=null;try{console[_0x1b6ea1(0x1f4)]('account:'+userAccount+_0x1b6ea1(0x228)+_0x568964),_0x436488=await claim(userAccount,_0x568964),totalget+=parseFloat(_0x436488[_0x1b6ea1(0x201)]('\x20TLM','')),minedCount+=0x1;let _0xc5ad16=new Date();document[_0x1b6ea1(0x24a)]('last_mine')[_0x1b6ea1(0x1fe)]=_0x436488+'\x20at\x20'+padLeadingZeros(_0xc5ad16[_0x1b6ea1(0x1f8)](),0x2)+':'+padLeadingZeros(_0xc5ad16[_0x1b6ea1(0x241)](),0x2)+':'+padLeadingZeros(_0xc5ad16[_0x1b6ea1(0x215)](),0x2),document['getElementById'](_0x1b6ea1(0x205))[_0x1b6ea1(0x1fe)]=totalget[_0x1b6ea1(0x1f2)](0x4)+_0x1b6ea1(0x227)+minedCount+'\x20Times',clearTimer();}catch(_0x525a35){updateStatus(_0x525a35);const _0x4d1f98=handleError(_0x525a35);console['log'](_0x1b6ea1(0x243)+_0x525a35);if(_0x4d1f98==_0x1b6ea1(0x1ff))updateStatus('Normal\x20error\x20wait:\x20'+0x2+'\x20min'),updateNextMine(0x78*0x3e8),clearTimer(),mineCountdownFinishTime=new Date()[_0x1b6ea1(0x235)]()+0x78*0x3e8,interval=setInterval(miningCountdownfunction,0x3e8);else{if(_0x4d1f98==_0x1b6ea1(0x21e))updateStatus(_0x1b6ea1(0x230)+0x2+'\x20min'),document['querySelector']('input[name=\x22mining_with\x22]:checked')[_0x1b6ea1(0x20e)]==_0x1b6ea1(0x22f)&&(document[_0x1b6ea1(0x24a)](_0x1b6ea1(0x1ef))[_0x1b6ea1(0x23e)]=!![]),updateNextMine(0x78*0x3e8),clearTimer(),mineCountdownFinishTime=new Date()['getTime']()+0x78*0x3e8,interval=setInterval(miningCountdownfunction,0x3e8);else{if(_0x4d1f98==_0x1b6ea1(0x245))updateStatus(_0x1b6ea1(0x1fb)+cpuDelay/(0x3c*0x3e8)+_0x1b6ea1(0x21d)),updateNextMine(cpuDelay),clearTimer(),mineCountdownFinishTime=new Date()[_0x1b6ea1(0x235)]()+cpuDelay,interval=setInterval(miningCountdownfunction,0x3e8);else{if(_0x4d1f98==_0x1b6ea1(0x203))updateStatus(_0x1b6ea1(0x244)+0xa+_0x1b6ea1(0x1f6)),updateNextMine(0xa*0x3e8),clearTimer(),mineCountdownFinishTime=new Date()[_0x1b6ea1(0x235)]()+0xa*0x3e8,interval=setInterval(miningCountdownfunction,0x3e8);else{if(_0x4d1f98==_0x1b6ea1(0x202))updateStatus('Unknow\x20error\x20wait:\x20'+errorDelay/(0x3c*0x3e8)+_0x1b6ea1(0x21d)),updateNextMine(errorDelay),clearTimer(),mineCountdownFinishTime=new Date()['getTime']()+errorDelay,interval=setInterval(miningCountdownfunction,0x3e8);else _0x4d1f98==_0x1b6ea1(0x248)?(updateStatus('Nothing\x20to\x20be\x20mine\x20wait\x20:\x20'+0x3c+_0x1b6ea1(0x21d)),updateNextMine(0x3c*0x3c*0x3e8),clearTimer(),mineCountdownFinishTime=new Date()['getTime']()+0x3c*0x3c*0x3e8,interval=setInterval(miningCountdownfunction,0x3e8)):(updateStatus(_0x1b6ea1(0x22e)+errorDelay/(0x3c*0x3e8)+_0x1b6ea1(0x21d)),updateNextMine(errorDelay),clearTimer(),mineCountdownFinishTime=new Date()[_0x1b6ea1(0x235)]()+errorDelay,interval=setInterval(miningCountdownfunction,0x3e8));}}}}}_0x436488!=null&&(updateStatus('mining\x20success\x20sleeping'),isMining=![],await sleep(0x2710)),console[_0x1b6ea1(0x1f4)](_0x1b6ea1(0x225));}}function handleError(_0x43eb9f){var _0x5c572d=_0x53218b;const _0x320030=[_0x5c572d(0x1f9),_0x5c572d(0x234),_0x5c572d(0x229),_0x5c572d(0x216),_0x5c572d(0x254)],_0x129565=[_0x5c572d(0x21a),_0x5c572d(0x24e)];if(_0x43eb9f[_0x5c572d(0x213)][_0x5c572d(0x231)](_0x5c572d(0x221)))return'cpu';else{if(_0x43eb9f[_0x5c572d(0x213)][_0x5c572d(0x231)](_0x5c572d(0x209)))return _0x5c572d(0x203);else{if(_0x129565[_0x5c572d(0x200)](_0x372395=>_0x43eb9f['message'][_0x5c572d(0x231)](_0x372395)))return _0x5c572d(0x21e);else{if(_0x320030['some'](_0x59f757=>_0x43eb9f[_0x5c572d(0x213)][_0x5c572d(0x231)](_0x59f757)))return _0x5c572d(0x1ff);else return _0x43eb9f[_0x5c572d(0x213)][_0x5c572d(0x231)]('nothing')?_0x5c572d(0x248):_0x5c572d(0x202);}}}}function stop(){clearTimer(),isMining=![],isWork=![];}function onclickRun(){var _0x38336a=_0x53218b;isWork?(stop(),updateStatus(_0x38336a(0x24c)),console[_0x38336a(0x1f4)]('========\x20STOPPING\x20========'),document['getElementById']('run_btn')[_0x38336a(0x1fe)]=_0x38336a(0x208),document['getElementById'](_0x38336a(0x211))[_0x38336a(0x249)]=_0x38336a(0x21f)):(isWork=!![],updateStatus(_0x38336a(0x206)),console[_0x38336a(0x1f4)](_0x38336a(0x1fc)),run(),document[_0x38336a(0x24a)](_0x38336a(0x211))[_0x38336a(0x1fe)]=_0x38336a(0x219),document['getElementById']('run_btn')[_0x38336a(0x249)]=_0x38336a(0x246));}function restart(){stop(),run();}