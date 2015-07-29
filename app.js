//Define variables & dependencies
//Dependencies
var fs = require('fs');
var path = require('path');
var uid = require('uid2');
var mime = require('mime');
var walk    = require('walk');

//Constants
var TARGET_PATH = path.resolve(__dirname, './writable/');
var IMAGE_TYPES = ['image/jpeg', 'image/png'];

// Loading all the modules needed for the app
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var passport = require('passport')
var flash = require('connect-flash')
var LocalStrategy = require('passport-local').Strategy;
var mysql = require('mysql');
var moment = require('moment');;

// Change this to a database to be able to add users
var users = [
    { id: 1, username: 'john', password: 'john123' } // Hash passwords !
  , { id: 2, username: 'jane', password: 'jane123' } // Hash passwords !
];

function verify_user_input(verify_email,verify_username,verify_password1,verify_password2,verify_age){

    

    return true;
}

function register_new_user(req,res){
    //verify user input.
    var email = req.body.user_username; // check that it is a valid email
    var username = req.body.user_email; // check that it's a usermane that's alphanumerical
    var password_1 = req.body.user_password; // check that both passwords are equal and then hash the shit out of them.
    var password_2 = req.body.user_password_confirmation;
    var age = req.body.user_age; // be sure it's a number between 13 and 99 ( assuming you're dead by then, or not on internet tho. )

    if (verify_user_input(email,username,password_1,password_2,age)) {

        // connect to the mysql database.
        var connection = mysql.createConnection({
            host: "localhost",
            user: "derp",
            password: "derp",
            database: "pic_temp_users"
        });

        // Create a new connection to it
        connection.connect();

        // Insert new user.
        var new_user = {
            user_id: null, // mySQL will take care of that
            user_email: email,
            user_username: username,
            user_password: password,
            user_age: age,
            user_creation_date: moment().format('yyyy-mm-dd:hh:mm:ss'), // so we know how old our users are.
            user_is_moderator: false, // well, you're not.
            user_subscribed_flows: "default", // only the principal one, let the user add more later.
            user_moderator_of: null,
            user_is_admin: false,
            user_is_premium: false
        };

        var query = connection.query('inser into articles set ?', new_user, function (err, res){
            if (err){
                console.log(err);
            }
            console.log(res);
        });
    }
}

function findById(id, fn) {
  var idx = id - 1;
  if (users[idx]) {
    fn(null, users[idx]);
  } else {
    fn(new Error('User ' + id + ' does not exist'));
  }
}

function findByUsername(username, fn) {
  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    if (user.username === username) {
      return fn(null, user);
    }
  }
  return fn(null, null);
}

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    process.nextTick(function () {
      findByUsername(username, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
        if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
        return done(null, user);
      })
    });
  }
));


app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

app.configure(function() {
  app.use(express.logger());
  app.use(express.cookieParser());
  app.use(express.session({ secret: '1879JD1çud!&ç!éu&çJ1898S21JEi&çs&ésjç&ié&çàéà' })); // Change this to a config file. asdksjdalk
  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use('/images', express.static(__dirname + '/writable'));
  app.use('/assets', express.static(__dirname + '/assets'));
  app.use(app.router);
  app.engine('html', require('ejs').renderFile);
});

//Define routes
app.get('/', ensureAuthenticated, function(req, res, next) {
	res.render('index');
});

app.post('/upload', ensureAuthenticated, function(req, res, next) {
	var is;
    var os;
    var targetPath;
    var targetName;
    var tempPath = req.files.file.path;
    //get the mime type of the file
    var type = mime.lookup(req.files.file.path);
    //get the extenstion of the file
    var extension = req.files.file.path.split(/[. ]+/).pop();

    //check to see if we support the file type
    if (IMAGE_TYPES.indexOf(type) == -1) {
      return res.send(415, 'Supported image formats: jpeg, jpg, jpe, png.');
    }

    //create a new name for the image
    targetName = uid(22) + '.' + extension;

    //determine the new path to save the image
    targetPath = path.join(TARGET_PATH, targetName);

    //create a read stream in order to read the file
    is = fs.createReadStream(tempPath);

    //create a write stream in order to write the a new file
    os = fs.createWriteStream(targetPath);

    is.pipe(os);

    //handle error
    is.on('error', function() {
      if (err) {
        return res.send(500, 'Something went wrong');
      }
    });

    //if we are done moving the file
    is.on('end', function() {

      //delete file from temp folder
      fs.unlink(tempPath, function(err) {
        if (err) {
          return res.send(500, 'Something went wrong');
        }

        //send something nice to user
        res.render('image', {
          name: targetName,
          type: type,
          extension: extension
        });

      });//#end - unlink
    });//#end - on.end
});

app.get('/all', ensureAuthenticated, function(req, res, next) {
	var files   = [];

    // Walker options
    var walker  = walk.walk('./writable', { followLinks: false });

    walker.on('file', function(root, stat, next) {
        // Add this file to the list of files
        files.push({'filename': stat.name});
        next();
    });

    walker.on('end', function() {
        res.send(JSON.stringify(files));
    });
});

app.get('/login', function(req, res){
  res.render('login', { user: req.user, message: req.flash('error') });
});

app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
  function(req, res) {
    res.redirect('/');
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.get('/register', function(req, res){
    res.render('register');
})

app.post('/register', function(req, res){
    register_new_user(req,res);
    res.redirect('/');
})

app.get('/login/lost_password', function(req, res){
    res.render('lost_password');
})
//Start the server
server.listen(3000, function() {
  console.log("Express server up and running.");
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}
