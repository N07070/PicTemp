<script>
// alerts "Hey" every second
var i = 0;
setInterval(function(){
    main(i);
    i++;
}, 10000);
</script>
<div class="result">
    <img src="">
    <!--
    A solution could be to pass the current image number wanted in AJAX to the server that would then fix all of this shit together.
    For example:
    - I come on to this page, a first AJAX request is made for the first image.
    - The server understands that I want the last image in the database,
        and give me the image ID ( it's file name)
    - AJAX waits ten seconds or for a click
    - I makes a new request and decrements the picture number until it gets to 0
    - It then displays that the user should get a life an stop watching some useless things. #jk
    -->
</div>
