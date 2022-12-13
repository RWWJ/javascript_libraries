//
//      canvas_tests.js
//

// 29 Nov 2022  Created


var CanvasTestsJsVersion = "1.0"


function testCanvasFunctions( canvas ) {
  console.debug( "testCanvasFunctions(): NEED to implement.");

  canvas.clear();

  curves( canvas );

  slidePuzzle( canvas );
}


function slidePuzzle( canvas ) {

}


function curves( canvas ) {
  let x = 150;
  let y = 250;
  let w = 80;
  let h = 40;
  let r = 100;
  let lineW = 4;
  let color = "orangered";

  canvas.lineWidth = lineW;
  canvas.circle( x, y, r, color );
  canvas.strokeOval( x, y, w, h, 0, "cyan" );
  canvas.strokeOval( x, y, w, h, 22.5, "yellow" );
  canvas.strokeOval( x, y, w, h, 45, "green" );
  canvas.strokeOval( x, y, w, h, 90, "red" );
  canvas.strokeOval( x, y, w, h, 112.5, "blue" );
  canvas.strokeOval( x, y, w, h, 135, "IndianRed" );
}






//
