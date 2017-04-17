import express from'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Bear from'./models/bear';

var app = express();
dotenv.config();
mongoose.connect('mongodb://' + process.env.MONGO_USER + ':' + process.env.MONGO_PASS + '@ds163060.mlab.com:63060/testapi');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();
router.use(function(req, res, next) {
    console.log('Something is happening.');
    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/bears')
  .post(function(req, res) {

    var bear = new Bear();
    bear.name = req.body.name;
    bear.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Bear created!' });
    });
  })
  .get(function(req, res) {
    Bear.find(function(err, bears) {
    if (err)
      res.send(err);

    res.json(bears);
  });
});

router.route('/bears/:bear_id')

  .get(function(req, res) {
      Bear.findById(req.params.bear_id, function(err, bear) {
          if (err)
              res.send(err);
          res.json(bear);
      });
    })
    .put(function(req, res) {
    Bear.findById(req.params.bear_id, function(err, bear) {

        if (err)
            res.send(err);

        bear.name = req.body.name;
        bear.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Bear updated!' });
        });
      });
    })
    .delete(function(req, res) {
      Bear.remove({
          _id: req.params.bear_id
      }, function(err, bear) {
          if (err)
              res.send(err);

          res.json({ message: 'Successfully deleted' });
      });
});

app.use('/api', router);

app.listen(port);
console.log('Server listening to port ' + port);
