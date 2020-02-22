let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
const passport = require('passport');
const redis = require('redis');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
//let redisClient = redis.createClient();
let logger = require('morgan');

let config = require('./config/config.js');

let auth = require('./modules/authentication');
let routers = require('./routes/routes');

const app = express();

auth.init(app);

app.use(session({
  secret: config.redisStore.secret,
  saveUninitialized: false,
  resave: false,
  //store: new RedisStore({
  //    client: redisClient
  //}),
  cookie: {
      secure: false
  },
}));

app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

routers(app, passport, auth);

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
