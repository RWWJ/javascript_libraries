//
//      history
//


var HistoryJsVersion = "1.1";




// Store and retrieve ^Z/^Y (unDo/reDoo) history
let HistoryCurrent = -1;  // Need to know where we are if we start pressing ^Z and ^Y
let HistoryMax = 10;      // After debug and development is over, we can make this much bigger (100 maybe?)

let History = [];   // Holds the actual history Payload objects for each level of unDo/redo

// Custom data that application must supply to the History mechanism
let Payload = {
  commonData: {},
  previousData: {},
  nextData: {},
  // data will be either previousData or nextData, depening on if it's do or unDo
  action: function (commonData, data) {},
};

// ....
          // // Need this for the HistoryAdd() call below
          // let oldValue = ViewPort.getImgAtXY( x, y, ActiveLayer );
          //
          // ViewPort.cellToXY( cell.col, cell.row, SrcCellImage, ActiveLayer );
          //
          //
          //
          // // NOTE: EditTileMap version
          // // [{layer:layer#,location:{col:col#,row:row#},previousData:{col:col#,row:row#},newData:{col:col#,row:row#}}, ...]
          // HistoryAdd( {commonData:{layer:ActiveLayer,location:{col:cell.col,row:cell.row}}, previousData:{value:oldValue}, nextData:{value:SrcCellImage},
          //   action: (common, data)=> {
          //     // store data.value (image sprite col,row), to layer 0, common.location
          //
          //     // Now write the values into the ViewPort cell
          //     // DEBUG Maybe I should pass ViewPort in the commonData
          //     ViewPort.cellToXY( data.location.col, data.location.row, data.value, data.layer );
          //
          //     // There may be some refresh/update display type things we need to do as well
          //   }
          // } );

// ....


          // NOTE: EditSpriteSheetInfo version
          // [{location:{col:col#,row:row#},previousData:{properties:{...}},newData:{properties:{...}}}, ...]
//          HistoryAdd( {commonData:{location:{col:cell.col,row:cell.row}}, previousData:{properties:{{},{},{},...}}, nextData:{properties:{{},{},{},...}},
//            action: (common, data)=> {
//              // store data.properties, to layer 0, common.location
//
//              // Use ViewPortLeft
//              // DEBUG Maybe I should pass ViewPortLeft in the commonData
//
//              // There may be some refresh/update display type things we need to do as well
//             }
//          } );



// ....


// ++++++++++++ Keyboard Handler examples required for ^z/^Y to work ==============
// function keyboardDownEventHandler( event ) {
//   // Handle the Ctl-Z key for history undo
//   if( event.ctrlKey && event.key == "z" ) {
//     HistoryUndo( );
//     event.stopPropagation();
//   }
//
//   // Handle the Ctl-Y key for history undo
//   if( event.ctrlKey && event.key == "y" ) {
//     HistoryRedo( );
//     event.stopPropagation();
//   }
// }


// ....


function HistoryClear( ) {

    // Clear the history buffer
    HistoryCurrent = -1;
    History = [];
}


// ....


//
// ==== HISTORY UNDO/REDO ^Z/^Y ====
//
// History array[]
//
// Init HistoryCurrent to -1
//
// Every time the application modifies something, we need to do these steps ( HistoryAdd() ):
//  1 Push the payload (specific to applications type of operation):
//      Payload = { commonData: {}, previousData: {}, nextData: {}, action: function (commonData, data) {} }
//        Where "action" is the application's function that will perform the unDo/do with the data we pass back to it
//        Where "data" will be either "previousData" or "nextData", depening on if it's do or unDo
//
//  2 Set HistoryCurrent = History.length
//      then store the payload in History[HistoryCurrent]
//
// For a ^Z ( HistoryUndo() ):
//   1 For ^Z, use History[HistoryCurrent]'s previousData to call payload.action(payload.commonData,payload.previousData), --HistoryCurrent
//
// For a ^Y ( HistoryDo() ):
//   1 For ^Y, ++HistoryCurrent, use History[HistoryCurrent]'s newData to call payload.action(payload.commonData,payload.previousData), --HistoryCurrent
//

function HistoryDisplay( ) {
  let x = 100;
  let y = 100;

  DialogHistory1( "EDIT HISTORY", HistoryCurrent, History, x, y );
}

//      Payload = { commonData: {}, previousData: {}, nextData: {}, action: function (commonData, data) {} }
//        Where data will be either previousData or nextData, depening on if it's do or unDo
function HistoryAdd( payload ) {
  let historyNum;

  // Remove oldest entry in History[] to make room for another entry. NOTE: You can not use .slice(), it does not modify original []
  if( History.length >= HistoryMax )  History.splice(0,1);

  historyNum = History.length;

  History[historyNum] = {};

  History[historyNum] = payload;

  // Negate any ^Z ^Y movement in the History buffer that we may have done.
  // Puts us at the end of the History buffer, so we are ready for new ^Z ^Y if any
  // Will be 0 for the first edit (addition to the History buffer)
  HistoryCurrent = historyNum;

  // HistoryDisplay( );
}


// For ^Z, use History[HistoryCurrent] payload's .previousData to call payload.action(), --HistoryCurrent
//
//      Payload = { commonData: {}, previousData: {}, nextData: {}, action: function (commonData, data) {} }
//        Where data will be either previousData or nextData, depening on if it's do or unDo
function HistoryUndo( ) {
  let payload;

  // Make sure there is a history entry to go backward to
  if( HistoryCurrent >= 0 ) {
    payload = History[HistoryCurrent];

    payload.action( payload.commonData, payload.previousData );

    --HistoryCurrent;

    // HistoryDisplay( );
  }

}


// For ^Y, ++HistoryCurrent, use History[HistoryCurrent]'s newData to set cell
//      Payload = { commonData: {}, previousData: {}, nextData: {}, action: function (commonData, data) {} }
//        Where data will be either previousData or nextData, depening on if it's do or unDo
//
function HistoryRedo( ){
  let payload;

  // Make sure there is a history entry to go forward to
  if( History.length > HistoryCurrent+1 ) {
    ++HistoryCurrent;

    payload = History[HistoryCurrent];

    payload.action( payload.commonData, payload.nextData );

    // HistoryDisplay( );
  }
}




// ....
