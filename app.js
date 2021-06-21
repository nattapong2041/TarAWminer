var express = require('express')
const { Worker } = require("worker_threads");
// const worker = new Worker("./mine_worker.js");
const { StaticPool } = require("node-worker-threads-pool");
var app = express()
const port = 8080;

const pool = new StaticPool({
  size: 8,
  task: "./mine_worker.js"
});
const fromHexString = hexString =>
  new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render("index", {});
});

app.get('/mine_worker', (async (req, res) => {
  // let account = [0, 0, 144, 134, 3, 126, 33, 0];
  // let account_str = 'wqobq.wam';
  // let difficulty = 0;
  // let last_mine_tx = '6c40c1904e2270ae2db7fc886ae22827fe52588141ac9b12b2ee3bb537b97402'.substr(0, 16);
  // let last_mine_arr = fromHexString(last_mine_tx);

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
    res.status(400);
    res.send('Invalid mine data ');
  }
  try{
    account = [req.query.account0,req.query.account1,req.query.account2,req.query.account3,req.query.account4,req.query.account5,req.query.account6,req.query.account7]
    account_str = req.query.account_str
    last_mine_tx  = req.query.last_mine_tx
  }catch(err){
    res.status(400);
    res.send('Invalid mine data ');
  }

let last_mine_arr = fromHexString(last_mine_tx);
  pool.exec({ acc: req.query.acc, account: account, account_str: account_str, difficulty: difficulty, last_mine_arr: last_mine_arr }).then(result => {
    if (result == null) {
      res.status(400);
      res.send('Taking too long');
    } else {
      res.status(200);
      res.send(result);
    }
  });
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
