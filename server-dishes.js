var mongoose = require('mongoose');
var assert = require('assert');

var Dishes = require('./models/dishes');

var url = 'mongodb://localhost:27017/conFusion';

mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error'));
db.once('open', function() {
  console.log('Connect successful');

  Dishes.create({
    name: 'Uthapizza',
    image: './images/someimage.png',
    category: 'Appetizers',
    label: 'Hot',
    price: '45,56',
    description: 'Test',
    comments: [{
      rating: 3,
      comment: 'This is insane',
      author: 'Matt Daemon'
      }]
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

        dish.comments.push({
          rating: 5,
          comment: 'This is the second comment text',
          author: 'Second Author Name'
        });

        dish.save(function(err, dish) {
          if(err) throw error;
          console.log('Updated comments');
          console.log(dish);

          db.collection('dishes').drop(function(err) {
            console.log('Dishes collection dropped');
            db.close();
          });
        })
      })
    }, 3000);
  });
});

