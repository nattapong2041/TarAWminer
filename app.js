var express = require('express')
var app = express()
const port = 8080;


app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));


app.get('/',(req, res) => {
  res.render("index", {});
});
app.post('/noti_line',(req, res) => {
  console.log(req.body);
  // let lineNotify = require('line-notify-nodejs')(req.body.token);
  // lineNotify.notify({
  //   message: req.body.message,
  // }).then(() => {
  //   res.send('complete')
  // });
});



app.listen(port,  "0.0.0.0");
console.log("Starting Server. port "+port);
console.log("http://localhost:"+port);
