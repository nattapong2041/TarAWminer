var express = require('express')
var app = express()
var fs = require('fs');
// const fetch = require("node-fetch");
// var tools1 = require('./public/js/waxjs');
// var tools2 = require('./public/js/atomicassets');
// eval(fs.readFileSync('public/js/waxjs.js') + '');
// eval(fs.readFileSync('public/js/atomicassets.js') + '');
// eval(fs.readFileSync('public/js/int64-buffer.min.js') + '');
// eval(fs.readFileSync('public/js/eosjs-numeric.js') + '');
// eval(fs.readFileSync('public/js/eosjs-serialize.js') + '');
// const crypto = require("node-webcrypto-p11");

// const crypto = new Crypto(config);

// const keys = await crypto.subtle.generateKey({
//   name:"RSASSA-PKCS1-v1_5",
//   modulusLength: 1024,
//   publicExponent: new Uint8Array([1, 0, 1]), 
//   hash: {
//       name: "SHA-1"
//   }}, 
//   true, 
//   ["sign", "verify"]
// );
const port = 8080;


app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.render("index", {});
});

const getRand = () => {
  const arr = new Uint8Array(8);
  for (let i = 0; i < 8; i++) {
      const rand = Math.floor(Math.random() * 255);
      arr[i] = rand;
  }
  return arr;
};

app.get('/mine_worker', async (req, res) => {
  let good = false,
        itr = 0,
        rand = 0,
        hash,
        hex_digest,
        rand_arr,
        last;
  var account = req.query.account;
  var last_mine_arr = req.query.account;
  while (!good) {
    rand_arr = getRand();

    const combined = new Uint8Array(account.length + last_mine_arr.length + rand_arr.length);
    combined.set(account);
    combined.set(last_mine_arr, account.length);
    combined.set(rand_arr, account.length + last_mine_arr.length);
    //hash = await crypto.subtle.digest('SHA-256', combined.slice(0, 24) );
    hash = await crypto.subtle.digest({algorithm: 'SHA-256', data:  combined.slice(0, 24)}).then()
    hex_digest = toHex(hash);

    if (is_wam) {
        good = hex_digest.substr(0, 4) === '0000';
    } else {
        good = hex_digest.substr(0, 6) === '000000';
    }

    if (good) {
        if (is_wam) {
            last = parseInt(hex_digest.substr(4, 1), 16);
        } else {
            last = parseInt(hex_digest.substr(6, 1), 16);
        }

        good &= last <= difficulty;
    }
    itr++;
    if (itr % 1000000 === 0) {
        console.log(`Still mining - tried ${itr} iterations`);
    }

    if (!good) {
        hash = null;
    }

    if (itr >= 1000000 * 10) break;
}
  try {
    res.send(mine_work.rand_str);
  } catch (err) {
    throw err;
  }

});

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
