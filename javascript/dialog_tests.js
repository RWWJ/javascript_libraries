//
//    dialog_tests.js
//

//
//  15 Dec 2022  Created
//  16 Dec 2022  Added some functionality
//

let DialogTestsJsVersion = "0.1";


function dialogTestsOnClick( event ) {
  let result = null;
  let x = 20;
  let y = 100;

  DialogYesNo( "YesNo Test", "Do you like this test?", x, y, yesNoResult => {
    console.log( `DialogYesNo() returned: ${yesNoResult}`);
    testArea( `DialogYesNo() returned: ${yesNoResult}` );
  } );

  x += 100;
  y += 50;
  DialogOk( "Ok Test", "This is a test.", x, y, okResult => {
    console.log( `DialogOk() returned: ${okResult}`);
    testArea( `DialogOk() returned: ${okResult}` );
  } );


  x += 100;
  y += 50;
  DialogMenu( "Menu Test", ["", "Do One", "Do Two"], x, y, menuResult => {
    console.log( `DialogMenu() returned: ${menuResult}`);
    testArea( `DialogMenu() returned: ${menuResult}` );
  } );


  x += 100;
  y += 50;
  // [{name:"someName", action:actionFunction}, {name:"AName", action:actionFunction}, ...]
  let actions = [
    {name:"Say hi", action: _ => {
      console.log("HI");
      testArea( "HI" );
    }},
    {name:"Goodbye", action: _ => {
      console.log("BYE");
      testArea( "BYE" );
    }},
    {name:"Texting", action: _ => {
      console.log( "DialogActions(): See text area" );
      testArea( "DialogActions(): See text area" );
      actionsResult.value = "DialogActions() is texting.";
    }},
  ];
  let actionsResult = DialogActions( "Actions Test", actions, x, y );

}







//
