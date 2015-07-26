<?php

session_start();

//Include the passwords and shit in this file
include("../model/php/variables.php");

function is_logged_in(){
    if ($_SESSION['user_is_logged_in'] == true) {
        return true;
    } else {
        return false;
    }
};

if($_GET['p'] == "upload"  && is_logged_in() == true){
    // Upload pictures
    include("../model/php/header.php");
    include("../model/php/navigation.php");
    include("../model/php/upload_pictures.php");
    include("../model/php/footer.php");
}elseif($_GET['p'] == "photos" && is_logged_in() == true){
    // Display pictures
    include("../model/php/header.php");
    include("../model/php/navigation.php");
    include("../model/php/display_pictures.php");
    include("../model/php/footer.php");
}elseif ($_GET['p'] == "inscription") {
    // User registration
    include("../model/php/header.php");
    include("../model/php/navigation.php");
    include("../model/php/inscription.php");
    include("../model/php/footer.php");
}elseif ($_GET['p'] == "forgot") {
    // In case the user forgot his password
    include("../model/php/header.php");
    include("../model/php/navigation.php");
    include("../model/php/user_forgot.php");
    include("../model/php/footer.php");
}elseif ($_GET['p'] == "image") {
    // the page to get the picture
    include("../model/php/image.php");
}elseif ($_GET['p'] == "login") {

    include("../model/php/header.php");
    include("../model/php/navigation.php");
    include("../model/php/login_page.php");
    include("../model/php/footer.php");
}else{
    include("../model/php/header.php");
    include("../model/php/navigation.php");
    include("../model/php/login_page.php");
    include("../model/php/footer.php");
}
?>
