<?php
function inscription_form(){
    ?>

    <div class="container">

          <form class="form-signin" action="/?p=inscription">
            <h2 class="form-signin-heading">Inscrivez-vous</h2>

            <label for="inputEmail" class="sr-only">Adress email</label>
            <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>

            <label for="username" class="sr-only">Nom d'utilisateur</label>
            <input type="text" id="inputUsername" class="form-control" placeholder="Nom d'utilisateur" required>

            <label for="inputPassword" class="sr-only">Mot de passe</label>
            <input type="password" id="inputPassword" class="form-control" placeholder="Password" required>

            <label for="inputPassword2" class="sr-only">Mot de passe (vérification)</label>
            <input type="password" id="inputPassword2" class="form-control" placeholder="Password" required>

            <button class="btn btn-lg btn-primary btn-block" type="submit" value="login_form_subit">Se connecter</button>
          </form>

    </div> <!-- /container -->
    <?php
}


function register_user(){
    // Verify user input
    if (!empty($_POST['inputEmail']) && !empty($_POST['inputUsername']) && !empty($_POST['inputPassword']) &&!empty($_POST['inputPassword2'])){
        // Connect to database
        // Check if the user is not already logged in
        // Check if the username is valid
        // Check if the two passwords are the same

        // Put the user information in the database
    }else {
        inscription_form();
    }

}

if($_POST['sumbit'] == "inscription_submit"){
    register_user();
}else {
    inscription_form();
}
?>
