var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var aboutRouter = require('./routes/about');
var contactRouter = require('./routes/contact');
var petsRouter = require('./routes/pets');
var usersRouter = require('./routes/users');
var userLoginRouter = require('./routes/userLogin');
var orgLoginRouter = require('./routes/orgLogin');
var orgRegisterRouter = require('./routes/orgRegister');
var userRegisterRouter = require('./routes/userRegister');
var petProfileRouter = require('./routes/pet_profile');
var orgDashRouter = require('./routes/orgDashboard');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/userLogin', userLoginRouter);
app.use('/orgLogin', orgLoginRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
//app.use('/browse', browseRouter);
app.use('/orgRegister', orgRegisterRouter);
app.use('/userRegister', userRegisterRouter);
app.use('/pets', petsRouter);
app.use('/pet_profile', petProfileRouter);
app.use('/orgDashboard', orgDashRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
