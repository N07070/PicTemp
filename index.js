var fs = require("fs");
var host = "127.0.0.1";
var port = 8080;
var express = require("express");

var app = express();
app.use(express.static(__dirname + "/public")); //use static files in ROOT/public folder

app.get("/", function(request, response){ //root dir
    if (user_login("n07070","derp","09710742") == true) {
        console.log("Got a request");
        if ( /** if the user requests / **/) {
            display_all_images();
        }else if (/** if the user requests /upload **/) {
            upload_image();
        } else {
            display_all_images();
        }
    }else {
        //display login page and resend to the index
    }
});

app.listen(port, host);

function user_login(username,password,user_id){
    // lookup in the database if if find a username, password and user_id which is the same the ones given
    return true;
}

function log_in_form(){
    // display an html form,
        // if the users wants to register, display the registration page
    // otherwise get the credentials and send them to /
}


function register_user(){
    // display an html form,
    // verify all the inputs
    // put all of it in a database,
    // redirect towards the login page
}

function display_all_images(){
    /**
    - count the number of images in the database.
    - while all the images haven't been displayed,
        load them by bunch of 10 and display each one for
        10 seconds or until the user touches or inputs
    **/
    var number_of_images = get_number_of_image_from_database();
    var current_image = 0;
    while (current_image <= number_of_images) {
        get_image_from_database(current_image);
        current_image++;
    }
}

function upload_image(){
    // display a form
        // display a html form
    // hand the upload
        // get the image data
    // transform it in png if it's not
    // give the image a unique id
        // change the image name to <unique id>.png
    // put it's id + timestamp in the database
    return true;
}

function get_image_from_database(image_number){
    // get the image by it's number
        // connect to the database
        // from the table, get the number, and it's ID ( which is also the path, because the image if like ID.png)
    // display it for 10 seconds
        // when it starts to be displayed, initiate a countdown
        // when the countdown is finished it's done.
    // then hide it (and unload it)
    return true;
}
