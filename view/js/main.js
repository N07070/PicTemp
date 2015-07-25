function get_image_from_server(i){
    if (i == null ){
        i = 1;
    }
    $.get( "/?p=image&i="+i, function( data ) {
      $( "div" ).html( "<img src='"+data+"'>" );
    });
}

function main(e){
    get_image_from_server(e);
    // wait 10 secondes or a user input
}
