<?php

session_start();

//Include the passwords and shit in this file
include("../model/php/variables.php");

function is_logged_in(){
    if ($_SESSION['user_is_logged_in'] == true) {
        return true;
    } else {
        header("Location: /");
    }
};

if($_GET['p'] == "upload"  /* && is_logged_in() == true*/){
    include("../model/php/header.php");
    include("../model/php/navigation.php");
    include("../model/php/upload_pictures.php");
    include("../model/php/footer.php");
    echo "upload";
}elseif($_GET['p'] == "photos" /*&& is_logged_in() == true*/){
    include("../model/php/header.php");
    include("../model/php/navigation.php");
    include("../model/php/display_pictures.php");
    include("../model/php/footer.php");
    echo "photos";
}elseif ($_GET['p'] == "inscription") {
    include("../model/php/header.php");
    include("../model/php/navigation.php");
    include("../model/php/inscription.php");
    include("../model/php/footer.php");
}elseif ($_GET['p'] == "image") {
    include("../model/php/image.php");
}else{
    include("../model/php/header.php");
    include("../model/php/navigation.php");
    include("../model/php/login_page.php");
    include("../model/php/footer.php");
}
?>
