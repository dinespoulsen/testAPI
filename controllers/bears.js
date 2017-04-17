import mongoose from 'mongoose';
import Bear from'../models/bear';

module.exports.controller = function(router) {
  router.route('/bears')
    .post((req, res) => {

      var bear = new Bear();
      bear.name = req.body.name;
      bear.save((err) => {
          if (err)
              res.send(err);

          res.json({ message: 'Bear created!' });
      });
    })
    .get((req, res) => {
      Bear.find((err, bears) => {
      if (err)
        res.send(err);

      res.json(bears);
    });
  });

  router.route('/bears/:bear_id')

    .get((req, res) => {
        Bear.findById(req.params.bear_id, function(err, bear) {
            if (err)
                res.send(err);
            res.json(bear);
        });
      })
      .put((req, res) => {
      Bear.findById(req.params.bear_id, function(err, bear) {

          if (err)
              res.send(err);

          bear.name = req.body.name;
          bear.save((err) => {
              if (err)
                  res.send(err);

              res.json({ message: 'Bear updated!' });
          });
        });
      })
      .delete((req, res) => {
        Bear.remove({
            _id: req.params.bear_id
        }, (err, bear) => {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
  });

};
