<?php

function login_form($error_message){
    ?>
    <div class="container">

          <form class="form-signin" action="/?p=login">
            <h2 class="form-signin-heading">Connectez-vous</h2>

            <?php if (!empty($error_message)): ?>
                <div class="alert alert-danger" role="alert"> <?php echo($error_message)?> </div>
            <?php endif; ?>

            <label for="inputEmail" class="sr-only">Adress email</label>
            <input type="email" id="inputEmail" class="form-control" placeholder="Adress email" required autofocus>

            <label for="inputPassword" class="sr-only">Mot de passe</label>
            <input type="password" id="inputPassword" class="form-control" placeholder="Mot de passe" required >

            <button class="btn btn-lg btn-primary btn-block" type="submit" value="login_form_subit">Se connecter</button>
            <a href="/?p=inscription"><br>Vous n'avez pas de compte ?</a>
          </form>

    </div> <!-- /container -->
    <?php
}

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
        //
        // Try selecting a  a login & password match
        // if (!true) {
        //     // Create the login token and shit
        // }else {
        //     login_form();
        // }
    }else {
        login_form("Veuilliez remplir les deux champs");
    }
}

if ($_POST['submit'] == 'login_form_submit') {
    connect_user();
}else {
    login_form("");
}
