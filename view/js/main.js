function get_image_from_server(){
    $.get( "/?p=image&i="+Math.random(), function( data ) {
      $( "div" ).html( "<img src='"+data+"'>" );alert( "Data Loaded: " + data );
    });
}
