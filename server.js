import express from'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import fs from 'fs';

let app = express();

dotenv.config();

mongoose.connect('mongodb://' + process.env.MONGO_USER + ':' + process.env.MONGO_PASS + '@ds163060.mlab.com:63060/testapi');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let port = process.env.PORT || 8080;

let router = express.Router();
router.use(function(req, res, next) {
    console.log('Something is happening.');
    next();
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

fs.readdirSync('./controllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
      let routerFunc = require('./controllers/' + file);
      routerFunc.controller(router);
  }
});
app.use('/api', router);
router.get('/', (req, res) => {
    res.json({ message: 'hooray! welcome to my testAPI' });
});





app.listen(port);
console.log('Server listening to port ' + port);
