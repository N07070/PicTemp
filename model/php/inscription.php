<?php
function inscription_form($error_message){
    ?>

    <div class="container">

          <form class="form-signin" action="/hello?p">
            <h2 class="form-signin-heading">Inscrivez-vous</h2>
            <?php if (!empty($error_message)): ?>
                <div class="alert alert-danger" role="alert"> <?php echo($error_message)?> </div>
            <?php endif; ?>
            <label for="inputEmail" class="sr-only">Adress email</label>
            <input type="email" id="inputEmail" class="form-control" placeholder="Adresse Email" required autofocus>

            <label for="inputUsername" class="sr-only">Nom d'utilisateur</label>
            <input type="text" id="inputUsername" class="form-control" placeholder="Pseudo" required>

            <label for="inputPassword" class="sr-only">Mot de passe</label>
            <input type="password" id="inputPassword" class="form-control" placeholder="Mot de passe" required>

            <label for="inputPassword2" class="sr-only">Mot de passe (vérification)</label>
            <input type="password" id="inputPassword2" class="form-control" placeholder="Mot de passe" required>

            <button class="btn btn-lg btn-primary btn-block" id="submit" type="submit" value="login_form_subit">Se connecter</button>
          </form>

    </div> <!-- /container -->
    <?php
}


function register_user(){
    // Verify user input
    $user_email = mysql_real_escape_string($_POST['inputEmail']);
    $user_password1 = mysql_real_escape_string($_POST['inputPassword']);
    $user_password2 = mysql_real_escape_string($_POST['inputPassword2']);
    $user_username = mysql_real_escape_string($_POST['inputUsername']);

    // Check if all the fields are used
    if (!empty($user_email) && !empty($user_username) && !empty($user_password1) && !empty($user_password2)){
        sleep(1); // Sleep one second to prevent sever spamming.
        // Check if the two passwords are the same
        if ($user_password1 == $user_password2){

            // Connect to database
            include('variables.php'); // File with all the variables
            try {
        		$pdo_options[PDO::MYSQL_ATTR_INIT_COMMAND] = "SET NAMES utf8";
        		$database_connexion = new PDO('mysql:host=localhost;dbname='.$mysql_database_name, $mysql_user, $mysql_password, $pdo_options);
        	    $database_connexion->setAttribute(PDO::ATTR_EMULATE_PREPARES, false); // Prevent SQL injections
            }
            catch (Exception $e){
            	die('Erreur lors la connexion à la BDD: ' . $e->getMessage());
            }

            // Check if the user is not already in the database ( a email == a user)
            $reponse = $database_connexion->prepare('SELECT * FROM :user_table WHERE user_email = :user_email');

            $reponse->bindValue('user_database',$mysql_user_table_name,'user_email',$user_email,PDO::PARAM_INT);
            try {
                $reponse->execute();
                $is_user_in_databse = $reponse->fetch();
            }
            catch(Exception $e){
                echo('Error : '.$e->getMessage());
            }
            if(empty($is_user_in_databse)){
                // Check if the username is valid
                if (ctype_alnum($user_username)){
                    if (filter_var($user_email, FILTER_VALIDATE_EMAIL)) {
                        // Encrypt the password
                        echo($user_email."\n");
                        echo($user_username."\n");
                        echo(password_hash($user_password1, PASSWORD_DEFAULT)."\n");

                        // Put the user information in the database

                        // TODO : make the actual insertion,then display the incristion form saying "It's all okay !"
                    } else {
                        inscription_form("Veuilliez utiliser un email valide. ( De la forme xxx@xxx.xxx )");
                    }
                } else {
                    inscription_form("Veuilliez utiliser uniquement des chiffres ou/et des lettres pour votre pseudo.");
                }
            }else {
                inscription_form("Cet email est déjà utilisé. Si vous avez perdu votre mot de passe, essayez de demander un nouveau mot de passe <a href='/?p=login'>ici.</a>");
            }
        }else {
            inscription_form("Les deux mots de passe ne correspondent pas. Veuilliez les faire correspondre.");
        }
    }else {
        inscription_form("Veuilliez remplir tout les champs.");
    }

}

if($_POST['sumbit'] == "inscription_submit"){
    //register_user();
}else {
    inscription_form("");
}
?>
