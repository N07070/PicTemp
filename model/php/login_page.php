<?php

function login_form(){
    ?>
    <div class="container">

          <form class="form-signin" action="/">
            <h2 class="form-signin-heading">Connectez-vous</h2>
            <label for="inputEmail" class="sr-only">Adress email</label>
            <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
            <label for="inputPassword" class="sr-only">Mot de passe</label>
            <input type="password" id="inputPassword" class="form-control" placeholder="Password" required>
            <button class="btn btn-lg btn-primary btn-block" type="submit" value="login_form_subit">Se connecter</button>
            <a href="/?p=inscription">Vous n'avez pas de compte ?</a>
          </form>

    </div> <!-- /container -->
    <?php
}

//Configure the connexion to the databse
$database_name = "pictemp";
$database_username = "derp";
$database_password = "derp";

function connect_user(){

    $user_email = $_POST['inputEmail'];
    $user_password = $_POST['inputPassword'];

    if(!empty($user_email) && !empty($user_password)){
        // // Connect to the database
        // try {
        //     // Connection
        // } catch (Exception $e) {
        //     // Error connecting to the databse
        // }

        // Try selecting a  a login & password match
        // if (!true) {
        //     // Create the login token and shit
        // }else {
        //     login_form();
        // }
    }else {
        login_form();
        echo "string";
    }
}

if ($_POST['submit'] == 'login_form_submit') {
    connect_user();
}else {
    login_form();
}
