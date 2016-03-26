var mongoose = require('mongoose');
var assert = require('assert');

var Dishes = require('./models/dishes-1');

var url = 'mongodb://localhost:27017/conFusion';

mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error'));
db.once('open', function() {
  console.log('Connect successful');

  var newDish = Dishes({
    name: 'Uthapizza',
    description: 'Test'
  });

  newDish.save(function(err) {
    if(err) throw err;

    console.log('New dish added');

    Dishes.find({}, function(err, dishes) {
      if(err) throw err;

      console.log('New dishes found:', dishes);

      db.collection('dishes').drop(function(err) {
        console.log('Dishes collection dropped');
        db.close();
      });
    });
  });
});
