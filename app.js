const express = require('express');
const videoRouter = require('./src/videos.js');

const app = express();
const port = 3000;

app.set('/src', 'views');
app.set('view engine', 'ejs');

app.use('/', videoRouter);

app.use(express.static('./public'));

app.listen(port);
