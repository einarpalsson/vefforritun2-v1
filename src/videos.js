const express = require('express');
const app = express();
const router = express.Router();
const port = 3000;
const data = require('../videos.json');

console.log(router);

app.set('view engine', 'ejs');

app.use(express.static('../public'));

app.get('/index', (req, res, next) => {
  res.render('./index.ejs', data);
});

app.listen(port);

// app.get('/test', (req, res, next) => {
//   res.send(index)
// });
