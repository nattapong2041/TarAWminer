var express = require('express')
var app = express()
const crypto = require('crypto');
const { log } = require('console');
const port = 8080;


app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

const getRand = () => {
  const arr = new Uint8Array(8);
  for (let i = 0; i < 8; i++) {
    const rand = Math.floor(Math.random() * 255);
    arr[i] = rand;
  }
  return arr;
};
const toHex = (bytes) => bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '')
const unHex = (hexString) =>
  new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

app.get('/', (req, res) => {
  res.render("index", {});
});

app.get('/mine_worker', (async (req, res) => {
  //	let {mining_account, account, account_str, difficulty, last_mine_tx, last_mine_arr, sb} = _message.data;

// /*! GET PARAM FROM DATA !*/ let mining_account = 'm.federation';
//   let account = [0, 0, 144, 134, 3, 154, 2, 126];
// /*! GET PARAM FROM DATA !*/ let account_str = 'wqobq.wam';
// /*! GET PARAM FROM DATA !*/ let difficulty = 0;
// /*! GET PARAM FROM DATA !*/ let last_mine_tx = '6c40c1904e2270ae2db7fc886ae22827fe52588141ac9b12b2ee3bb537b97402'.substr(0, 16);
  
  let account;
  let account_str;
  let difficulty = 0;
  let last_mine_tx;
  try{
    if(req.query.difficulty != null)
      difficulty = req.query.difficulty;
    else
    difficulty = 0;
  }catch(err){
    difficulty=0;
  }
  try{
    account = [req.query.account0,req.query.account1,req.query.account2,req.query.account3,req.query.account4,req.query.account5,req.query.account6,req.query.account7]
    account_str = req.query.account_str
    last_mine_tx  = req.query.last_mine_tx
  }catch(err){
    res.status(400);
    res.send('Invalid mine data ');
  }

let last_mine_arr = unHex(last_mine_tx);

  console.log('======================')
  console.log('mining for: ' + account_str)
  console.log('difficulty: ' + difficulty)
  console.log('======================')
  //account = account.slice(0, 8);
  const is_wam = account_str.substr(-4) === '.wam';
  let good = false,
    itr = 0,
    rand = 0,
    hash,
    hex_digest,
    rand_arr,
    last;
  const start = new Date().getTime();

  while (true) {
    rand_arr = getRand();

    const combined = new Uint8Array(8 + last_mine_arr.length + 8);
    combined.set(account);
    combined.set(last_mine_arr, account.length);
    combined.set(rand_arr, account.length + last_mine_arr.length);
    hash = crypto.createHash('sha256').update(combined.slice(0, 24)).digest('Uint8Array');
    hex_digest = toHex(hash);

    good = hex_digest.substr(0, 4) === '0000';
    if (good) {
      last = parseInt(hex_digest.substr(4, 1), 16);
      good &= last <= difficulty;
      if (good) break;
    }
    itr++;
    if (itr % 1000000 === 0) {
      console.log(`Still mining - tried ${itr}`);
    };

    if (!good){
			hash = null;
		}; 
    if (itr >= 1000000 * 5) {
			rand_arr 	= null; 
			hex_digest  = `SORRY WE CAN NOT SOLVED LOOP ${ itr }`; 
			break; 
		}; 
  }
  const end = (new Date()).getTime();
  let rand_str;
  if(rand_arr){
    rand_str = toHex(rand_arr);
  }

  console.log(`Found hash in ${itr} iterations with ${account_str} ${rand_str} taking ${(end - start) / 1000}s`)
  const mine_work = { account: account_str, nonce: rand_str, answer: hex_digest };
  console.log(mine_work);
  res.send(rand_str);
}));

app.post('/noti_line', (req, res) => {
  console.log(req.body);
  // let lineNotify = require('line-notify-nodejs')(req.body.token);
  // lineNotify.notify({
  //   message: req.body.message,
  // }).then(() => {
  //   res.send('complete')
  // });
});
app.listen(port, "0.0.0.0");
console.log("Starting Server. port " + port);
console.log("http://localhost:" + port);
