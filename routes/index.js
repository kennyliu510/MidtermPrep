

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var mongoose = require('mongoose');
var Music = mongoose.model('Music');

router.get('/musics', function(req, res, next) {
  Music.find(function(err, musics){
    if(err){ return next(err); }
    res.json(musics);
  });
});

router.get('/musics/:music', function(req, res) {
  res.json(req.music);
});

router.post('/musics', function(req, res, next) {
  var music = new Music(req.body);
  music.save(function(err, music){
    if(err){ return next(err); }
    res.json(music);
  });
});

router.param('music', function(req, res, next, id) {
  var query = Music.findById(id);
  query.exec(function (err, music){
    if (err) { return next(err); }
    if (!music) { return next(new Error("can't find music")); }
    req.music = music;
    return next();
  });
});

router.put('/musics/:music/upvote', function(req, res, next) {
  req.music.upvote(function(err, music){
    if (err) { return next(err); }
    res.json(music);
  });
});

module.exports = router;



