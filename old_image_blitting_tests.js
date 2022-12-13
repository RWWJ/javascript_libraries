

let ImageElement = document.getElementById( "ImageID" );
let Canvas = document.getElementById( "CanvasID" ).getContext( "2d" );
let CanvasWidth = Canvas.canvas.width;
let CanvasHeight = Canvas.canvas.height;


// Test some canvas image copying (blitting)
function testOnClick( event ) {
  // Copy Canvas to ImageElement
  let imageDataURL;

  // Copy a PORTION of the Canvas
  let tempCanvas = document.createElement("canvas");
  tempCanvas.width = 100;
  tempCanvas.height = 100;

  tempCanvas.getContext("2d").drawImage(Canvas.canvas, 100, 100, 100, 100, 0, 0, 100, 100 );
  imageDataURL = tempCanvas.toDataURL();
  ImageElement.src = imageDataURL;
}


function clearCanvasOnClick( event ) {
  Canvas.clearRect(0,0,CanvasWidth,CanvasHeight);
}



function drawObjectOnClick( event ) {
  let radius = 30;
  // Need these to test History
  let oldX = PlayerX;
  let oldY = PlayerY;


  PlayerX += 50;
  PlayerY += 50;

  Canvas.strokeStyle = "red";

  Canvas.beginPath();
  Canvas.arc( PlayerX, PlayerY, radius, 0, 2*Math.PI );
  Canvas.stroke();

  HistoryAdd(
    {
      commonData: {type:"circle"},
      previousData: {x:oldX, y:oldY},
      nextData: {x:PlayerX, y:PlayerY},
      action: (commonData, data) => {
        Canvas.beginPath();
        Canvas.arc(data.x,data.y,radius,0, 2*Math.PI);
        Canvas.stroke();

        PlayerX = data.x;
        PlayerY = data.y;
      }
    }  );

}


function keyboardDownEventHandler( event ) {

  // Handle the Ctl-Z key for history undo
  // if( event.ctrlKey && event.code == "KeyZ" ) {
  if( event.ctrlKey && event.key == "z" ) {
    HistoryUndo( );

    event.stopPropagation();
  }

  // Handle the Ctl-Y key for history undo
  // if( event.ctrlKey && event.code == "KeyY" ) {
  if( event.ctrlKey && event.key == "y" ) {
    HistoryRedo( );

    event.stopPropagation();
  }
}




//
