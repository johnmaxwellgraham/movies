// server.js


var express    = require('express');        
var app        = express();                 
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://johnmaxwellgraham:twotimes@ds113785.mlab.com:13785/graham')
var Movie = require('./models/movie.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        

var router = express.Router();              


router.use(function(req, res, next) {
  // do logging
  console.log('Something is happening.');
  next(); 
});

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});


router.route('/movies')



.post(function(req, res) {
  
          var movie = new Movie();      
          movie.title = req.body.title; 
          movie.genre = req.body.genre;
          movie.length = req.body.length; 
          movie.save(function(err) {
              if (err)
                  res.send(err);
              res.json({ message: 'Movie created!' });
          }); 
      })

.get(function(req, res) {
  Movie.find(function(err, movies) {
      if (err)
          res.send(err);

      res.json(movies);
  });
})


router.route('/movies/:movie_id')
   
.get(function(req, res) {
  Movie.findById(req.params.movie_id, function(err, movie) {
      if (err)
          res.send(err);
      res.json(movie);
  });
})

.put(function(req, res) {
          Movie.findById(req.params.movie_id, function(err, movie) {
  
              if (err)
                  res.send(err);
  
              movie.title = req.body.title; 
              movie.genre = req.body.genre;
              movie.length = req.body.length; 
  
              
              movie.save(function(err) {
                  if (err)
                      res.send(err);
  
                  res.json({ message: 'Movie updated!' });
              });
  
          });
      })

      .delete(function(req, res) {
        Movie.remove({
            _id: req.params.movie_id
        }, function(err, movie) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

app.use('/api', router);
app.listen(port);
console.log('Magic happened on port ' + port);
