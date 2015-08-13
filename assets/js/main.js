function redirect_user_to_index() {
    setInterval(function(
        // similar behavior as an HTTP redirect
        window.location.replace("http://stackoverflow.com");
    ), 2000);
}
