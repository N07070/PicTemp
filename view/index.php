<?php
//Include the passwords and shit in this file
include("../model/php/variables.php");

function is_logged_in(){
    # Is the user logged in ?
    return true;
};

if($_GET['p'] == "upload" && is_logged_in() == true){
    include("../model/php/upload_pictures.php");
    include("../model/php/header.php");
    include("../model/php/navigation.php");
    include("../model/php/footer.php");
    echo "upload";
}elseif($_GET['p'] == "photos" && is_logged_in() == true){
    include("../model/php/display_pictures.php");
    include("../model/php/header.php");
    include("../model/php/navigation.php");
    include("../model/php/footer.php");
    echo "photos";
}
else{
    include("../model/php/login_page.php");
    include("../model/php/header.php");
    include("../model/php/navigation.php");
    include("../model/php/footer.php");
    echo "login page";
}
?>