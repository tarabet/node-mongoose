var mongoose = require('mongoose');
var assert = require('assert');

var Leadership = require('./models/leadership');

var url = 'mongodb://localhost:27017/conFusion';

mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error'));
db.once('open', function() {
  console.log('Connect successful');

  Leadership.create({
    name: 'Taranenko Alexander',
    image: './images/leaderimage.png',
    designation: 'Head of retail',
    abbr: 'HeadOfRtl',
    description: 'Leader description test'
  }, function(err, leader) {
    if(err) throw err;
    console.log('Promotion created');
    console.log(leader);

    var id = leader._id;

    setTimeout(function() {
      Leadership.findByIdAndUpdate(id, {
        $set: {
          description: 'Updated Leader description test'
        }
      }, {
        new: true
      })
      .exec(function(err, leader) {
        if(err) throw err;
        console.log('Updated Promotion!');
        console.log(leader);

        db.collection('leaderships').drop(function(err) {
          console.log('Leaderships collection dropped');
          db.close();
        });
      })
    }, 3000);
  });
});

