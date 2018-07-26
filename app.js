const createError = require('http-errors');
const express = require('express');
const app = express();

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
var expressValidator = require('express-validator');
const session = require('express-session');
const morgan = require('morgan');
var LocalStrategy = require('passport-local').Strategy;
var finalhandler = require('finalhandler');
const { url } = require('./config/database');

global.globalString = "String Global";
global.globalClaseId="Clase";
// concetarse a la base de datos
mongoose.connect(url);
require('./models/User');
require('./models/Clases');
require('./models/Alumnos');
require('./models/Evaluaciones');


//require('./config/passport')(passport);


// establecer rutas
var routes = require('./routes/index'); // va index en vez de routes
var users = require('./routes/users');

//var app = express();



// establecer puerto
app.set('port', process.env.PORT || 3001);
//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// config
app.use(logger('dev'));
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// establecer carpeta estatica
app.use(express.static(path.join(__dirname, 'public')));

//bodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));
app.use(cookieParser());
// Express secion
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));
// pasport initialize
app.use(passport.initialize());
app.use(passport.session());
// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});


//routes
//require('./routes/routes.js')(app, passport);
//require('./routes/index.js')(app, passport);
app.use('/', routes);//(app, passport); // se añadio el app, passport
app.use('/users', users);
//require('./rotes/index.js')(app, passport);

//static files
//app.use(express.static(path.join(__dirname, 'public')));
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});

module.exports = app;
