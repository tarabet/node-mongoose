var mongoose = require('mongoose');
var assert = require('assert');

var Dishes = require('./models/dishes-1');

var url = 'mongodb://localhost:27017/conFusion';

mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error'));
db.once('open', function() {
  console.log('Connect successful');

  Dishes.create({
    name: 'Uthapizza',
    description: 'Test'
  }, function(err, dish) {
    if(err) throw err;
    console.log('Dish created');
    console.log(dish);

    var id = dish._id;

    setTimeout(function() {
      Dishes.findByIdAndUpdate(id, {
        $set: {
          description: 'Updated test'
        }
      }, {
        new: true
      })
      .exec(function(err, dish) {
        if(err) throw err;
        console.log('Updated Dish!');
        console.log(dish);

        db.collection('dishes').drop(function(err) {
          console.log('Dishes collection dropped');
          db.close();
        })
      })
    }, 3000);
  });
});

