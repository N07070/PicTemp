// Dependencies
var express = require('express');
var router = express.Router();

var fs = require('fs');
var path = require('path');
var uid = require('uid2');
var mime = require('mime');
var walk    = require('walk');
var passport = require('passport');
var flash = require('connect-flash');
var LocalStrategy = require('passport-local').Strategy;

// Added by N07070
var mysql = require('mysql');
var moment = require('moment');
var validator = require('validator');
var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
var multer = require('multer');
// Global variables

//Constants
var TARGET_PATH = path.resolve(path.join(__dirname, './writable/'));
var IMAGE_TYPES = ['image/jpeg', 'image/png'];

// Change this to a database to be able to add users
var users = [
    { id: 1, username: 'john', password: 'john123' } // Hash passwords !
  , { id: 2, username: 'jane', password: 'jane123' } // Hash passwords !
];

router.use(bodyParser.urlencoded({ extended: true }));

// Functions
function verify_user_input(verify_email , verify_username , verify_password1 , verify_password2 , verify_age ){

    // With the validator module, check each user input.
    if (validator.isEmail(verify_email)){
        if (validator.isAlpha(verify_username) == true || validator.isAlphanumeric(verify_username) == true || validator.isInt(verify_username) == true ) {
            if (validator.equals(verify_password1,verify_password2)) {
                if (validator.isInt(verify_age, { min : 13, max : 99})) {
                    return true;
                } else {
                    console.log('The user is too old or to young.');
                }
            } else {
                console.log("Both passwords do not match.");
            }
        }else {
            console.log("The username is not valid.");
        }
    }else {
        console.log("The email is invalid.");
    }
}

function register_new_user(req,res){
    //verify user input.
    var username = req.body.user_username; // check that it is a valid email
    var email = req.body.user_email; // check that it's a username that's alphanumerical
    var password_1 = req.body.user_password; // check that both passwords are equal and then hash the shit out of them.
    var password_2 = req.body.user_password_confirmation;
    var age = validator.toInt(req.body.user_age); // be sure it's a number between 13 and 99 ( assuming you're dead by then, or not on internet tho. )

    if (verify_user_input(email,username,password_1,password_2,age) === true) {

        // Hash password using bcrypt
        password_1 = bcrypt.hashSync(password_1, 11);
        console.log("All good in the hood !");
        // connect to the mysql database.
        var connection = mysql.createConnection({
            host: "localhost",
            user: "derp",
            password: "derp",
            database: "pic_temp"
        });

        // Create a new connection to it
        connection.connect();

        // Insert new user.
        var new_user = {
            user_id: null, // mySQL will take care of that and John. Poor John. He didn't know better. /s
            user_email: email,
            user_username: username,
            user_password: password_1,
            user_age: age,
            user_creation_date: moment().format(), // so we know how old our users are.
            user_is_moderator: false, // well, you're not.
            user_subscribed_flows: "default", // only the principal one, let the user add more later.
            user_moderator_of: null,
            user_is_admin: false,
            user_is_premium: false
        };

        var query = connection.query('insert into pic_temp_users set ?', new_user, function (err, res){
            if (err){
                console.error(err);
            }
            console.log(res);
        });

        connection.end(function(err) {
            // The connection is terminated now
            if (err) {
                console.error(err);
            }
        });

    }else {
        console.log("\n\nThe user has not entered proper informations.\n\n");
    }
}

function find_user(user_email,password){

    var password_from_database;

    // Evaluate both users input
    if (validator.isEmail(user_email)){
        password = validator.escape(password);

        // Connect to the database
        var connection = mysql.createConnection({
            host: "localhost",
            user: "derp",
            password: "derp",
            database: "pic_temp"
        });

        // Create a new connection to it
        connection.connect();

        // Get the password from the row where there is the user's email.
        var query = connection.query("SELECT user_id,user_password,user_email FROM pic_temp_users WHERE user_email = " +  connection.escape(user_email), function(err, result) {
            if (err) {
                console.error(err);
            }else {
                password_from_database = result;
            }
        });

        console.log(query);

        // If it's okay, return true
        if (bcrypt.compareSync(password, password_from_database)){
            console.log('This user is A-okay !');
            return true
        }else {
            console.log("The user did not put in correct information.");
        }
    }else {
        console.log("The user did not put in correct information.");
    }
}

function findById(id, fn) {
    var idx = id - 1;

    // If there is a user with the id, then do something ?
    if (users[idx]) {
        fn(null, users[idx]); // OK
    } else {
        fn(new Error('User ' + id + ' does not exist')); // Nope
    }
}

function findByUsername(username, fn) {
    // If there is a username with that username, then return something
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
        // Try to find a matching username.
        findByUsername(username, function(err, user) {
            if (err) {
                return done(err);
            }
            if (!user || user.password != password) {
                return done(null, false, { message: 'The username and password do not match. Sorry !'});
            }else {
                console.log(user);
                return done(null, user);
            }
      })
    });
  }
));

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

// Define routes
router.get('/', ensureAuthenticated, function(req, res, next) {
	res.render('index');
});

router.get('/about', function(req, res) {
  res.send('About page. Hey, it\'s a WIP.');
});

router.post('/upload', ensureAuthenticated, function(req, res, next) {
	var is;
    var os;
    var targetPath;
    var targetName;
    console.log(req.files);
    var tempPath = req.files.file.path;
    //get the mime type of the file
    var type = mime.lookup(tempPath);
    //get the extenstion of the file
    var extension = tempPath.split(/[. ]+/).pop();

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

router.get('/all', ensureAuthenticated, function(req, res, next) {
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

router.get('/login', function(req, res){
  res.render('login', { user: req.user, message: req.flash('error') });
});

router.post('/login',
    passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
    function(req, res) {
        res.redirect('/');
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.get('/register', function(req, res){
    res.render('register');
})

router.post('/register', function(req, res){
    register_new_user(req);
    res.redirect('/');
})

router.get('/login/lost_password', function(req, res){
    res.render('lost_password');
})

router.post('/login/lost_password', function(req,res){
    res.render('lost_password', {message: req.flash('Hey !')})
})

module.exports = router;
