<?php

function get_image($image_id){
    // Get image number from ID
        // Verify that the ID is real ( an number )
        // Get the image name from the ID
        // Return the image name.

    echo $image_id.".jpg";
}

get_image($_GET['i']);
?>
