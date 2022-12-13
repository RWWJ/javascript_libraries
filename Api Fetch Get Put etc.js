//
//        API Fetch Get Put etc.js
//
//        Network (API) functions
//        Images, Json, Text, etc...
//


// 24 Oct 2022  Created



//
//
//
// NOTE: Example useage:
//    let someJson = JSON.stringify( {Player:"RWWJ", Dice:4, Sides:6} );
//    putJson( "https://jsonplaceholder.typicode.com/posts", someJson, responseJson => console.log(responseJson) );
//
function putJson( url, json, callback = null ) {
  let returnJson = {};  // Need to save the results for the .finally() clause, since it does NOT take parameters like .then() does

    fetch( url, {
      method:"post",
      body:json,
      headers:{"Content-type":"application/json; charset=UTF-8"}
    } )
    .then( response => {
      let jsonStream = null;

      if(response.ok) jsonStream = response.json(); // .status is in the range 200-299
      else if(response.status==404)  console.log("WARNING: <"+fileName+"> not found. " + response.statusText);
      else  console.log("ERROR: Could not open file or url: <"+fileName+">" + response.statusText);

      return jsonStream;
    } )
    // A .then() with both resolve/success() and reject/failure() callbacks
    .then( jsonObj => returnJson = jsonObj, error => {console.error("Bad .json file: "+error)} )  // Save json for .finally()
    .finally( () => {
      if( callback ) callback( returnJson );  // Return the results
    } );
}
















//

