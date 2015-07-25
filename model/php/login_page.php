<?php

$html_page = '<div class="container">

      <form class="form-signin" action="login_page.php">
        <h2 class="form-signin-heading">Connectez-vous</h2>
        <label for="inputEmail" class="sr-only">Adress email</label>
        <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
        <label for="inputPassword" class="sr-only">Mot de passe</label>
        <input type="password" id="inputPassword" class="form-control" placeholder="Password" required>
        <div class="checkbox">
          <label>
            <input type="checkbox" value="remember-me"> Remember me
          </label>
        </div>
        <button class="btn btn-lg btn-primary btn-block" type="submit">Se connecter</button>
      </form>

    </div> <!-- /container -->'

$user_email = $_POST['inputEmail'];
$user_password = $_POST['inputPassword'];

//Configure the connexion to the databse
$database_name = "pictemp";
$username = "derp";
$password = "derp";

if(!empty($email) && !empty($password)){
    // Connect to the database
    try {
        // Connection
    } catch (Exception $e) {
        // Error connecting to the databse
    }

    // Try selecting a  a login & password match
    if (true) {
        // Create the login token and shit
    }else {
        echo($html);
    }
}else {
    echo($html);
}
