//
//	        Helpers.js
//
//        Misc Helper Classes and functions
//
//  RWWJ 26 Dec 2021	Created
//
//  RWWJ  1 Apr 2022	Added fullscreenToggle()
//			Version 1.1
//
//  RWWJ  2 Jul 2022  Fixed pageName() for Atom editor preview html, it seems to append a (second) .html extension
//                    Added decodeURI() to convert %20 back to a space (for html filenames with spaces, "Contact Us.html" et.al.)
//                    Fixed hostName() "." to "," conversion and eating last digit of IP. Remove port #
//			Version 1.5
//
//  RWWJ  21 Jul 2022 Fixed capitalizeWords() (more like finished it, is was totaly not correct/working)
//    Version 1.6


var HelpersJsVersion = "1.6";


// Import all with this statement (NOTE: change the directory as appropriate)
//import {fullscreenToggle, hostName, pageName, capitalizeWords, isCellPhone, cloneObj,
//        daysInMonth, loadScript, playSoundFile} from "../Javascript-Libraries/Helpers-Module.js";


 export {fullscreenToggle, pageName, hostName, capitalizeWords, isCellPhone, cloneObj, daysInMonth, loadScript, playSoundFile};


//        Functions
//
// fullscreenToggle( )
// hostName( )
// pageName( )
// capitalizeWords( str )
// isCellPhone( )
// cloneObj( src )
// cloneObj_OLD( src )
// daysInMonth( theDate = null )
// loadScript( jsFileName, callback = null )
// playSoundFileWebAudio( fileName, volume = 0.01 )
// playSoundFile( fileName, volume = 0.01 )




//
//
// Toggle Fullscreen mode
//
function fullscreenToggle( ) {
  if( document.fullscreenElement )  document.exitFullscreen();  // Exit is done on the document
  else document.documentElement.requestFullscreen();            // Enter is done on an element, which the document is not. The <html> tag is however.
}



//
// Returns the webpage name, i.e. the URL, minus the, server, port, extension, anchors ("#pageMarker" et.al.) and search string ("?string" if any)
//
// So we return, for example, "index", "About", etc..
//
// Browsers load index.html if the URL does not have a file name, so this routine does as well
//
// Could use location.pathname() instead of .href(), but still need to .split("/"), so code is no shorter
//
function pageName( ) {
  // return location.href.split("/").slice(-1).toString().replace(".html", "").split("?")[0].split("#")[0].replace("index", "Home") || "Home";
  // return location.href.split("/").slice(-1).toString().replace(".html", "").split("?")[0].split("#")[0] || "index";

  // FIX: Added decodeURI() to convert %20 back to a space (for html filenames with spaces, "Contact Us.html" et.al.)
  // return  decodeURI(location.href.split("/").slice(-1).toString().replace(".html", "").split("?")[0].split("#")[0] || "index");

  // FIX: For Atom editor preview html, it seems to append a (second) .html extension
  return  decodeURI(location.href.split("/").slice(-1).toString().replace(".html", "").replace(".html", "").split("?")[0].split("#")[0] || "index");
}



//
// Returns the webpage host name, i.e. the URL, minus the, protocol, port, path, page name, and search string ("?" if any)
//
// So we return, for example, just "google.com", "RipsPics.com", etc..
//
function hostName( ) {
  // return location.href.split("/").slice(2,3).toString().replace("www.", "").split(".").slice(0,-1).toString();

  // Fixes the .'s in domain names and ip address being replaced by ,'s (i.e. amzon.com bacame amazon,com, http://127.0.0.1:59730/index.html, becoming 127,0,0)
  // Also was eating the last digit of the ip address
  // And remove port
  return location.hostname.replace( "www.", "" );
}



//
// Capitalize all words that start with a character (i.e. not with a # or symbol)
//
function capitalizeWords( str ) {
  str.replace( /(^|\s)[a-z]/g , m => m.toUpperCase() );
}



//
// RWWJ Check userAgent for word "Mobi" (i.e. Mobile) or "Phone"
//   Most phone browsers include Mobile but NOT Phone
//   Some iPhone browsers include Phone but NOT Mobile
//   Some versions of Opera include Mobi but NOT Mobile, so we just use Mobi for our search string
//
// Seems to be no good way to check for cell phone, but if I just want to run my test code on my phone...
//
function isCellPhone( ) {
  return (navigator.userAgent.indexOf("Mobi") > 0) || (navigator.userAgent.indexOf("Phone") > 0);
}



//
// Returns a copy of the objects (sub-objects are copied too, not just their references)
//
// Recursive
//
// NOTE: This is similar to the first routine I wrote, but is a variation on code from a video by Dave Gray
//       It is more concise and fixes a couple of bugs that my routine had
//       Among other modifications, I added code for dates and catching non-cloneable items (functions et.al.)
//
function cloneObj( src ) {
  let dst;

  // Basic type, not an array, not null (is the typeof "object") not a date and not an object
  if( typeof src != "object" || src == null )  dst = src;
  else if(src instanceof Date) {  // Handle Dates, I don't use them, but may as well cover it
    dst = new Date();
    dst.setTime(src.getTime());
  }
  else if( typeof src == "object" ) { // Handle arrays ([]) and "real" objects (i.e. {})
    let next;
    dst = Array.isArray(src) ? [] : {};

    for( next in src ) {
      dst[next] = cloneObj(src[next]);
    }
  }
  else    console.error("ERROR cloneObj(): Unexpected data type"); // Can not clone functions, etc..

  return dst;
}



//
// Returns a copy of the objects (sub-objects are copied too, not just their references)
//
// Recursive
//
// BUG BUG BUG!!! 2D Arrays do not work. Inner array elements become objects
//
function cloneObj_OLD( src ) {
  let dst;

  if( Array.isArray(src) ) {  // Handle array objects
    let next;
    dst = [];
    for( next=0; next<src.length; ++next ) {
      if( typeof src[next] == "object" )  dst[next] = cloneObj(src[next]);
      else  dst[next] = src[next];
    }
  }
  else if(src instanceof Date) {  // Handle Dates, I don't use them, but may as well cover it
    dst = new Date();
    dst.setTime(dst.getTime());
  }
// BUG DEBUG typeof null is "object" as well. This might cause an infinte loop!!!
  else if( typeof src == "object" ) { // Handle "real" objects (i.e. {...})
    let prop;
    dst = {};

    // Walk (iterate over) the object properties
    // NOTE: Might be better to use a for loop on the array returned by Object.keys(src)
    //       So we don't have to call .hasOwnProperty() (i.e. does NOT walk inherited/standard JS properties)
    for( prop in src ) {
      if( src.hasOwnProperty(prop) ) {  // Don't copy parent (i.e. prototype) properties
        if( typeof src[prop] == "object" )  dst[prop] = cloneObj(src[prop]);
        else  dst[prop] = src[prop];
      }
    }
  }
  else {
    // Don't know what else it might be
    console.log("ERROR cloneObj(): Unexpected data type");
  }

  return dst;
}



//
// Defaults to today, but can pass in value valid for the Date constructor
// i.e. dateString, dateObject, or milliseconds since January 1, 1970, 00:00:00 UTC
//
function daysInMonth( theDate = null ) {
  let dt;
  dt = theDate ? new Date(theDate) : new Date();

  // Specifying a day of 0 makes us go to the last day of the month previous to the specified one
  return new Date( dt.getFullYear(), dt.getMonth()+1, 0 ).getDate();
}



//
// Load a .js script file by injecting a <script> tag into the <head> of the dom
//
// Since it loads asynchronously, we can provide a callback if we need to know when variables and functions
// in the file are ready to be used
//
function loadScript( jsFileName, callback = null ) {
    let scriptElement = document.createElement("script");

    if( callBack ) scriptElement.onload = callback;	// The callback function can use the newly loaded .js file

    scriptElement.src = jsFileName;

    // Trigger the load by adding it to the <head>
    document.head.appendChild(jsScript);
}



// Play sound files (mp3, wav, etc..)
//
// NOTE Does NOT work for .mp3 nor .ogg
//    Does work for .wav, m4a
function playSoundFileWebAudio( fileName, volume = 0.01 ) {
  let buffer = null;
  let sndContext = new AudioContext();
  let soundFileName = "Sounds/aliencom.wav";  // Works
  soundFileName = "Sounds/Charity Rag-BudShank-Saxophone.mp3"; // NOT working
  soundFileName = "Sounds/Dry Leaves Walking - RWWJ.m4a";  // Works
  // soundFileName = "Sounds/kindland - PublicDomain - Dark_Rainy_Night(ambience).ogg"; // NOT working
  // soundFileName = "Sounds/natural_bound-ElectronicBackgroundMusic.mp3"; // NOT working

  fetch(soundFileName)
  .then( response => {
    if(response.ok) return response.arrayBuffer();
    else throw new Error("playSoundFileWebAudio() Could not open file: <"+soundFileName+">");
  })
  .then (data => {
    console.log("playSoundFile(): Array Data");
    console.log(data);
    return sndContext.decodeAudioData( data );
  })
  .then( decodedData => {
    let sourceNode = sndContext.createBufferSource( );
    buffer = decodedData;
    sourceNode.buffer = buffer;

    sourceNode.connect( sndContext.destination );

    sourceNode.start( 0 );
    sourceNode.stop( 2 ); // Play for 2 seconds
  })
  .catch( error => console.log(error)
  );

}



//
// Play sound files (mp3, wav, etc..)
//
// Works with .wav, .mp3, .m4a
// Does NOT work with the .ogg file I have
//
function playSoundFile( fileName, volume = 0.01 ) {
  let sndElement = document.createElement( "audio" );

  fileName = "Sounds/aliencom.wav";  // Works
  fileName = "Sounds/Charity Rag-BudShank-Saxophone.mp3"; // Works
  fileName = "Sounds/Dry Leaves Walking - RWWJ.m4a";  // Works
  // fileName = "Sounds/kindland - PublicDomain - Dark_Rainy_Night(ambience).ogg"; // NOT working


  // sndElement.type="audio/wav";
  // NOTE: 0.5 is supposedly half volume. I don't believe it!
  sndElement.volume = 0.01;

  // Can set .autoplay in place of .play()
  // sndElement.autoplay=true;

  sndElement.src = fileName;

  // NOTE: Instead, we could set .autoplay=true
  sndElement.play();
  setTimeout(()=>sndElement.pause(),3000); // Play for 2 seconds

  // We can also pause the playback
  // Do NOT know how to auto-repeat (loop forever)
  // sndElement.pause();

  // We can also rewind the playback
  // sndElement.currentTime = 0;

  // Can mute it without changing the volume (that is, .volume=0 also mutes)
  // sndElement.muted = true;

  // We can loop forever
  // sndElement.loop = true;

}


//
// Play sound files (mp3, wav, etc..)
//
// Works with .wav, .mp3, .m4a
// Does NOT work with the .ogg file I have
//
function playSoundFile2( fileName, volume = 0.01 ) {
  let sndElement;

  fileName = "Sounds/aliencom.wav";  // Works
  fileName = "Sounds/Charity Rag-BudShank-Saxophone.mp3"; // Works
  fileName = "Sounds/Dry Leaves Walking - RWWJ.m4a";  // Works
  // fileName = "Sounds/kindland - PublicDomain - Dark_Rainy_Night(ambience).ogg"; // NOT working

  // Browser starts loading file imediatly, if a fileName is specified
  sndElement = new Audio( fileName );

  // sndElement.type="audio/wav";
  // NOTE: 0.5 is supposedly half volume. I don't believe it!
  sndElement.volume = 0.02;

  // Can set .autoplay in place of .play()
  sndElement.autoplay=true;

  // NOTE: Instead, we could set .autoplay=true
  // sndElement.play();
  // setTimeout(()=>sndElement.pause(),5000); // Play for 5 seconds

  // We can also pause the playback
  // sndElement.pause();

  // We can also rewind the playback
  // sndElement.currentTime = 0;

  // Can mute it without changing the volume (that is, .volume=0 also mutes)
  // sndElement.muted = true;

  // We can loop forever
  // sndElement.loop = true;
}




//
