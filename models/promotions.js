var mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);

var Schema = mongoose.Schema;
var Currency = mongoose.Types.Currency;

var promotionsSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  price: {
    type: Currency,
    default: 'no price'
  },
  description: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

var Promotions = mongoose.model('Promotion', promotionsSchema);

module.exports = Promotions;

