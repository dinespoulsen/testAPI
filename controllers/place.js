import mongoose from 'mongoose';
import Place from'../models/place';

module.exports.controller = function(router) {
  router.route('/places')
    .post((req, res) => {

      var place = new Place();
      place.name = req.body.name;
      place.street = req.body.street;
      place.number = req.body.number;
      place.zipcode = req.body.zipcode;
      place.city = req.body.city;
      place.save((err) => {
          if (err)
              res.send(err);

          res.json({ message: 'Place created!' });
      });
    })
    .get((req, res) => {
      Place.find((err, places) => {
      if (err)
        res.send(err);

      res.json(places);
    });
  });

  router.route('/places/:place_id')

    .get((req, res) => {
        Place.findById(req.params.place_id, function(err, place) {
            if (err)
                res.send(err);
            res.json(place);
        });
      })
      .put((req, res) => {
      Place.findById(req.params.place_id, function(err, place) {

          if (err)
              res.send(err);

          place.name = req.body.name;
          place.save((err) => {
              if (err)
                  res.send(err);

              res.json({ message: 'Place updated!' });
          });
        });
      })
      .delete((req, res) => {
        Place.remove({
            _id: req.params.place_id
        }, (err, place) => {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
  });

};
