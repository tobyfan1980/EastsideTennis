var mongoose = require('mongoose');
var eventSchema = new mongoose.Schema({
  event_type: String,
  location: String,
  datetime: Date,
  duration: Number,
  slots: Number,
  organizer: {type: mongoose.Schema.ObjectId, ref: 'User'},
  players: [{type: mongoose.Schema.ObjectId, ref: 'User'}]
});

mongoose.model('Event', eventSchema);

module.exports = mongoose.model('Event');
