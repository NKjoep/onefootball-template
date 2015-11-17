var express = require('express');
var path = require('path');

var app = express();

app.set('env', 'production'); //disable this to throw more error to the client

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//the static things...
app.use(express.static(path.join(__dirname, 'public')));

//connect our service
var player = require('./routes/player');
app.use('/player', player);

//I didn't provide an index, sto just redirect for demo purpose...
app.use('/', function(req, res) {
  res.redirect('/player/134');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
else {
  // production error handler, no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: null
    });
  });
}

module.exports = app;
