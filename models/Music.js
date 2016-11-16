

var mongoose = require('mongoose');
var MusicSchema = new mongoose.Schema({
  title: String,
  album: String,
  artist: String,
  genre: String,
  coverUrl: String,
  upvotes: {type: Number, default: 0},
});

MusicSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};

mongoose.model('Music', MusicSchema);


