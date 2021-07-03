const express = require('express')
const axios = require('axios').default;
var app = express()
var path = require('path')
var favicon = require('serve-favicon')

const port = 8080;
var cors = require('cors')
var session = require('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(express.urlencoded({ extended: true }));
app.use(express.json({
    type: "*/*" // optional, only if you want to be sure that everything is parset as JSON. Wouldn't reccomend
}));
app.use(cors())

axios.defaults.headers.post['Content-Type'] = 'application/json';
async function getNonce(account) {
    return await axios.get(`http://167.99.65.62:8080/mine_worker?account=${account}`)
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

app.get('/login', (req, res) => {
    res.render("login", {});
});

app.get('/register', (req, res) => {
    res.render("register", {});
});

app.post('/submit_register', async function(request, response) {
    var username = request.body.username;
    var password = request.body.password;
    var password2 = request.body.password2;
    let isSuccess = await axios.post(`http://167.99.65.62:8080/register`, {
        username: username,
        password1: password,
        password2: password2
    }).then(res => {
        if (res.status == 200){
            return true;
        }       
    }).catch((err) => {
        console.log('' + err.message);
        return false;
    });
    if (isSuccess) {
        response.redirect('/login');
        response.end();
    } else {
        res.render("register", {});
        response.end();
    }
    
});

app.post('/auth', async function (request, response) {
    var username = request.body.username;
    var password = request.body.password;
    var remember = request.body.remember;

    let isSuccess = await axios.post(`http://167.99.65.62:8080/login`, {
        username: username,
        password: password
    }).then(res => {
        if (res.status == 200){
            return true;
        }       
    }).catch((err) => {
        console.log('' + err.message);
        return false;
    });
    if (isSuccess) {
        request.session.loggedin = true;
        request.session.username = username;
        if (remember) {
            request.session.cookie.maxAge = 2628000000;
        }
        response.redirect('/home');
        response.end();
    } else {
        response.redirect('/login');
        response.end();
    }
});

app.get('/logout', function (request, response) {
    if (request.session.loggedin) {
        request.session.destroy();
    }
    response.redirect('/login');
    response.end();

});


app.get('/home', function (request, response) {
    if (request.session.loggedin) {
        response.locals.username = request.session.username;
        response.render('monitor', { username: request.session.username })
    } else {
        response.locals.username = request.session.username;
        response.redirect('/login')
        // response.redirect('/login')
    }

    response.end();
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
        await getNonce(account).then((result) => {
            res.status(200);
            res.send(result);
        }).catch((err) => {
            res.status(400);
            res.send('you are in mining queue');
        })
    }

}));

app.post('/addWam', async (request, response) =>{
    var username = request.body.username;
    var waxlist = request.body.waxlist;
    await axios.post(`http://167.99.65.62:8080/addwax`, {
        "username": username,
        "waxList": waxlist,
    }).then(res => {
        if (res.status == 200){
            response.redirect('/home');
            response.end();
        }       
    }).catch((err) => {
        response.send('Error cannot add wax account');
        response.end();
    });
});

app.post('/deleteWam', async (request, response) =>{
    var username = request.body.username;
    var wax = request.body.wax;

    await axios.post(`http://167.99.65.62:8080/deletewax`, {
        "username": username,
        "waxlist": ''+wax,
    }).then(res => {
        if (res.status == 200){
            response.redirect('/home');
            response.end();
        }       
    }).catch((err) => {
        response.send('Error cannot delete wax account');
        response.end();
    });
});

app.post('/addCode', async (request, response) =>{
    var username = request.body.username;
    var wax = request.body.wax;
    var code = request.body.code
    console.log(wax)
    console.log(code)
    await axios.post(`http://167.99.65.62:8080/addcode`, {
        "username": username,
        "wax": ''+wax,
        "code": ''+code
    }).then(res => {
        if (res.status == 200){
            response.redirect('/home');
            response.end();
        }       
    }).catch((err) => {
        response.send('Error cannot add code to wax account');
        response.end();
    });
});

app.get('/getAcc', async (request, response) =>{
    var username = request.body.username;
    console.log(wax)
    console.log(code)
    await axios.post(`http://167.99.65.62:8080/waxlist`, {
        "username": username,
    }).then(res => {
        if (res.status == 200){
            response.redirect('/home');
            response.end();
        }       
    }).catch((err) => {
        response.send('Error cannot add code to wax account');
        response.end();
    });
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