//
//        full_creen.js
//
//

//   FUNCTIONS
//


var FullScreenJsVersion = "1.0";




function fullScreenButtonOnClick( event ) {

    // Can only enter fullscreen in response to user input (i.e. a button click)
    //
    // If we are in fullscreen, then .fullscreenElement is the element that is fullscreen, otherwise null
    // NOTE <dialog> elements can NOT be set to fullscreen, tho most other DOM elements can
    if( document.fullscreenElement ) {
      // Always call .exitFullscreen on document, regardless of which element was used for fullscreen
      document.exitFullscreen()
      .then( () => console.log("Document Exited from Full screen mode") )
      .catch( err => console.error(err) );
    }
    else {
      // .documentElement is the top level element of the document, i.e. the <html> that encloses the <head> and <body>
      // Note, we can make other elements be fullscreen
      document.documentElement.requestFullscreen();

      console.log("Press <esc> to exit fullscreen");
      // Content.innerHTML += "<br>Press <esc> to exit fullscreen<br>";
    }

}






//
