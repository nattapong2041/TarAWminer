const express = require('express')
const axios = require('axios').default;
var app = express()
const port = 8080;
var cors = require('cors')
app.use(cors())

axios.defaults.headers.post['Content-Type'] = 'application/json';
async function getNonce(account) {
    return await axios.get(`http://139.180.216.175:8080/mine_worker?account=${account}`)
    .then(res => res.data)
        .then((json) => {
            return json
        })
        .catch((err) => {
            console.log('' + err.message);
            return null;
        });
}
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render("index", {});
});

app.get('/create', (req, res) => {
    res.render("create", {});
});

app.get('/mine_worker', (async (req, res) => {
    let account = req.query.account;
    if (account == undefined) {
        res.status(400);
        res.send('Not a wax account');
    }
    account = account.match(/^[a-z0-9.]{4,5}(?:.wam)/gm)
    if (!account || typeof account == "undefined" || account == '' || account == null) {
        res.status(400);
        res.send('Not a wax account');
    } else {
        account = account[0];
        await getNonce(account).then((result)=>{
            res.status(200);
            res.send(result);
        }).catch((err)=>{
            res.status(400);
            res.send('you are in mining queue');
        })
    }

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