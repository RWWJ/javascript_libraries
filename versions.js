//
//       versions.js
//
//  3 Dec 2022  Created


var VersionsJsVersion = "1.0";


//     Functions
// versions()


function versions( ) {
  let versions = "";

  console.log( `>>>   Versions : V${VersionsJsVersion}   <<<` );
  versions += `>>>   Versions : V${VersionsJsVersion}   <<<\n\n`;
  console.log( `Canvas : V${CanvasJsVersion}` );
  versions += `Canvas : V${CanvasJsVersion}\n`;

  console.log( `CanvasTests : V${CanvasTestsJsVersion}` );
  versions += `CanvasTests : V${CanvasTestsJsVersion}\n`;
  console.log( `DialogBox : V${DialogBoxJsVersion}` );
  versions += `DialogBox : V${DialogBoxJsVersion}\n`;
  console.log( `Files : V${FilesJsVersion}` );
  versions += `Files : V${FilesJsVersion}\n`;
  console.log( `FileTests : V${FileTestsJsVersion}` );
  versions += `FileTests : V${FileTestsJsVersion}\n`;
  console.log( `FullScreen : V${FullScreenJsVersion}` );
  versions += `FullScreen : V${FullScreenJsVersion}\n`;
  console.log( `Helpers : V${HelpersJsVersion}` );
  versions += `Helpers : V${HelpersJsVersion}\n`;
  console.log( `History : V${HistoryJsVersion}` );
  versions += `History : V${HistoryJsVersion}\n`;
  console.log( `Math : V${MathJsVersion}` );
  versions += `Math : V${MathJsVersion}\n`;
  console.log( `Sound : V${SoundJsVersion}` );
  versions += `Sound : V${SoundJsVersion}\n`;
  console.log( `Tests : V${TestsJsVersion}` );
  versions += `Tests : V${TestsJsVersion}\n`;

  return versions;
}



//
