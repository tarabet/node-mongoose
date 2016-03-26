var mongoose = require('mongoose');
var assert = require('assert');

var Promotions = require('./models/promotions');

var url = 'mongodb://localhost:27017/conFusion';

mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error'));
db.once('open', function() {
  console.log('Connect successful');

  Promotions.create({
    name: 'Solopizza',
    image: './images/someimage.png',
    label: 'Hot',
    price: '45,56',
    description: 'Promotion test'
  }, function(err, promo) {
    if(err) throw err;
    console.log('Promotion created');
    console.log(promo);

    var id = promo._id;

    setTimeout(function() {
      Promotions.findByIdAndUpdate(id, {
        $set: {
          description: 'Updated promo test'
        }
      }, {
        new: true
      })
      .exec(function(err, promo) {
        if(err) throw err;
        console.log('Updated Promotion!');
        console.log(promo);

        db.collection('promotions').drop(function(err) {
          console.log('Promotions collection dropped');
          db.close();
        });
      })
    }, 3000);
  });
});

