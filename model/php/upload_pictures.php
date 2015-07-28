<?php
function form_image(){
    ?>
    <input type="file" accept="image/*" capture>
    <canvas></canvas>
    <script>
    function drawOnCanvas(file) {
  var reader = new FileReader();

  reader.onload = function (e) {
    var dataURL = e.target.result,
        c = document.querySelector('canvas'), // see Example 4
        ctx = c.getContext('2d'),
        img = new Image();

    img.onload = function() {
      c.width = img.width;
      c.height = img.height;
      ctx.drawImage(img, 0, 0);
    };

    img.src = dataURL;
  };

  reader.readAsDataURL(file);
}
    </script>
    <img>
    <?php
}

function upload_image(){
    $target_dir = "img/";
    $target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
    $uploadOk = 1;
    $imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
    // Check if image file is a actual image or fake image
    if(isset($_POST["submit"])) {
        $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
        if($check !== false) {
            echo "File is an image - " . $check["mime"] . ".";
            $uploadOk = 1;
         } else {
            echo "File is not an image.";
            $uploadOk = 0;
         }
     }
     // Check if file already exists
     if (file_exists($target_file)) {
        echo "Sorry, file already exists.";
        $uploadOk = 1; //This is not an error : it's cool because it's 1/2 the ressources.
     }
     // Check file size
     if ($_FILES["fileToUpload"]["size"] > 1073741824) {
        echo "Sorry, your file is too large.";
        $uploadOk = 0;
     }
     // Allow certain file formats
     if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg") {
        echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
        $uploadOk = 0;
     }
     // Check if $uploadOk is set to 0 by an error
     if ($uploadOk == 0) {
        echo "Sorry, your file was not uploaded.";
     // if everything is ok, try to upload file
     } else {
         if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
             echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
         } else {
             echo "Sorry, there was an error uploading your file.";
         }
     }
     return $target_file; //This is the name of the image.
}

if($_POST['submit'] == "submit"){
    upload_image();
}else {
    form_image();
}
?>
