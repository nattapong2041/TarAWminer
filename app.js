import express from 'express';

const app = express();
const port = 8080;

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render("index", {});
});
app.get('/test', (req, res) => {
  res.send('FUCK')
});
app.listen(port,  "0.0.0.0");
console.log("Starting Server. port "+port);
console.log("http://localhost:"+port);
