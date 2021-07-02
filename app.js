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
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(cors())

axios.defaults.headers.post['Content-Type'] = 'application/json';
async function getNonce(account) {
    return await axios.get(`http://139.180.187.234/mine_worker?account=${account}`)
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

app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
    var remember = request.body.remember;
	if (username && password) {
        request.session.loggedin = true;
        request.session.username = username;
        if(remember){
            request.session.cookie.maxAge = 2628000000;
        }
        response.redirect('/home');	
		response.end();
		
		// connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
		// 	if (results.length > 0) {
		// 		request.session.loggedin = true;
		// 		request.session.username = username;
		// 		response.redirect('/home');
		// 	} else {
		// 		response.send('Incorrect Username and/or Password!');
		// 	}			
		// 	response.end();
		// });
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.get('/logout', function(request, response) {
    if(request.session.loggedin){
        request.session.destroy();
    }
    response.redirect('/login');	
	response.end();

});


app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.locals.username = request.session.username;
        response.render('monitor', { username: request.session.username })
	} else {
        response.locals.username = request.session.username;
        response.render('monitor', { username: request.session.username })
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