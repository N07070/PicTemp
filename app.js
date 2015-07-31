//Define variables & dependencies

//Dependencies
var path = require('path');
var flash = require('connect-flash');
var passport = require('passport');

// Load the controller
var index = require('./controllers/index');

// Load express 4 dependencies
var express = require('express');
var logger = require('morgan');
var session = require('express-session');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var router = express.Router();

var app = express();

app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(cookieParser());
app.use(session({   resave: true,
                    saveUninitialized : false,
                    secret: '1879JD1çud!&ç!éu& —}çÂJ18 Âê9Âê8 SÂ Â21 JEi  ÂÂ&çÂÂs&é sjç& ié&çàéà' })); // Change this to a config file. asdksjdalk
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(express.static(path.join(__dirname, '/public')));
app.use('/images', express.static(path.join(__dirname, '/writable')));
app.use('/assets', express.static(path.join(__dirname, '/assets')));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.engine('html', require('ejs').renderFile);

app.use('/', index);

//Start the server
app.listen(3000, function() {
  console.log("Express server up and running.");
});
