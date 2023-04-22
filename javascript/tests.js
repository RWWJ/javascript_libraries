//
//     tests.js
//

//
//  16 Dec 2022  Changed version test to run from menu button, not at init
//               Added TestAreaElement global
//               V2.1
//



const TestsJsVersion = "2.1";


const FirstYear = "2021";


var Houdini = false;

let CanvasObj = null;

let Paused = false; // Toggled by the pressing either the "p" or "P" keys

let StatusElement = document.getElementById( "StatusID" );
let TestAreaElement = document.getElementById( "TestAreaID" );



// Kick it off
init();

//
// Get it all started
//
function init( ) {
  let thisYear = new Date().getFullYear();

  document.querySelector( "footer .Version" ).innerText = TestsJsVersion;

  if( FirstYear == thisYear ) document.querySelector( "footer .Year" ).innerText = thisYear;
  else document.querySelector( "footer .Year" ).innerText = `${FirstYear} - ${thisYear}`;

  TestAreaElement.innerText = "";

  // Alow for easily adding more sliders
  initSlider( "SliderID", "SliderValueID", useSliderValue );

  initCanvas( );
  // Quick Canvas test draw
  CanvasObj.strokeStyle = "blue";
  CanvasObj.lineWidth = "1";
  CanvasObj.strokeRect( 0, 0, CanvasObj.width-1, CanvasObj.height-1 );

  addEventListener( "keydown", event => {
    if( event.code === "KeyP" && event.ctrlKey && !event.repeat ) {
      event.preventDefault();
      togglePaused( );
    }
  } );



  status( "Initialization complete.")
}


function togglePaused( ) {
  Paused = !Paused;

  if( !Paused ) document.querySelector("header").classList.remove("Paused");
  else document.querySelector("header").classList.add("Paused");
}


function versionTestOnClick( ) {
  testArea( versions() );
}


function fileTestsOnClick(  ) {
  testFileFunctions( CanvasObj );  // In file_tests.js
}


function canvasTestsOnClick( ) {
  testCanvasFunctions( CanvasObj );  // In canvas_tests.js
}


let TestLocaton = {x:50, y:50};
function resetXYOnClick(event) {
  TestLocaton = {x:50, y:50};
}


function clearCanvasOnClick( event ) {
  CanvasObj.clear();
}


function drawObjectOnClick( event ) {
  let radius = 30;
  // Need these to test History
  let oldX = TestLocaton.x;
  let oldY = TestLocaton.y;


  TestLocaton.x += 50;
  TestLocaton.y += 50;

  CanvasObj.lineWidth = 2;

  CanvasObj.strokeArc( TestLocaton.x, TestLocaton.y, radius, 0, 360, "red" );
  CanvasObj.circle( TestLocaton.x, TestLocaton.y, radius/2, "orange" );
  CanvasObj.strokeOval( TestLocaton.x, TestLocaton.y, radius*0.8, radius*0.5, 45, "blue" );

  HistoryAdd(
    {
      commonData: {type:"circle"},
      previousData: {x:oldX, y:oldY},
      nextData: {x:TestLocaton.x, y:TestLocaton.y},
      action: (commonData, data) => {
        CanvasObj.strokeArc( TestLocaton.x, TestLocaton.y, radius, 0, 360, "red" );
        CanvasObj.circle( TestLocaton.x, TestLocaton.y, radius/2, 0, 360, "brown" );
        CanvasObj.strokeOval( TestLocaton.x, TestLocaton.y, radius*0.8, radius*0.5, 45, "brown" );

        TestLocaton.x = data.x;
        TestLocaton.y = data.y;
      }
    }  );

}


function initSlider( sliderId, valueId, useValueCallback ) {
  let sliderElement = document.getElementById( sliderId );
  let sliderValueElement = document.getElementById( valueId );

  let value = jsonFromLocalStorage(`Slider_${sliderId}`);
  if( value != null ) sliderElement.value = value;
  else value = sliderElement.value;

  sliderValueElement.innerText = `{${value}}`;
  useValueCallback( value ); // Initial slider value

  // input is an active event (fires as slider is moving)
  sliderElement.addEventListener( "input", event => {
    value = event.target.value;
    sliderValueElement.innerText = `  {${value}}`;
    useValueCallback( value );
  } );

  // change event only fires when slider stops moving, so good time to store value in localStorage
  sliderElement.addEventListener( "change", event => {
    value = event.target.value;
    jsonToLocalStorage( value, `Slider_${sliderId}` );
  } );
}



//
// Likely you would move this to your implementation javascript file and customize it appropriately
//
function useSliderValue( value ) {
  console.log( `Slider value = ${value}` );
}


function sliderValue( ) {
  return document.getElementById( "SliderID" ).value;
}



function status( text ) {
  if( StatusElement ) {
    StatusElement.innerText += "\n" + text;

    StatusElement.scrollTop = StatusElement.scrollHeight;
  }
  else console.log( `Status: ${text}` );
}



function testArea( text ) {
  if( TestAreaElement ) {
    TestAreaElement.innerText += "\n" + text;

    TestAreaElement.innerText.scrollTop = TestAreaElement.innerText.scrollHeight;
  }
  else console.log( `testArea(): ${text}` );
}



function initCanvas( ) {
  CanvasObj = new Canvas( document.querySelector(".ContentArea") );
}



function windowOnResize( event ) {
  // Canvas resizing is handled by the Canvas class object
}


//
// Toggle Houdini when user Alt-clicks on my EMail address
//
// css can target .Houdini to markup the <a> email address element (highligt, add text :after, etc...)
//
function houdini( event ) {
  if( event.altKey ) {
    Houdini = !Houdini;

    if( Houdini ) event.target.classList.add( "Houdini" );
    else          event.target.classList.remove( "Houdini" );
  }
}







//
