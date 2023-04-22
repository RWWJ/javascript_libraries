//
//       versions.js
//
//  3 Dec 2022   Created
//  16 Dec 2022  Removed console.log()'s
//               V1.1
//



var VersionsJsVersion = "1.1";


//     Functions
// versions()


function versions( ) {
  let versions = "";

  versions += `>>>   Versions : V${VersionsJsVersion}   <<<\n\n`;
  versions += `Canvas : V${CanvasJsVersion}\n`;

  versions += `CanvasTests : V${CanvasTestsJsVersion}\n`;
  versions += `DialogBox : V${DialogBoxJsVersion}\n`;
  versions += `Files : V${FilesJsVersion}\n`;
  versions += `FileTests : V${FileTestsJsVersion}\n`;
  versions += `FullScreen : V${FullScreenJsVersion}\n`;
  versions += `Helpers : V${HelpersJsVersion}\n`;
  versions += `History : V${HistoryJsVersion}\n`;
  versions += `Math : V${MathJsVersion}\n`;
  versions += `Sound : V${SoundJsVersion}\n`;
  versions += `Tests : V${TestsJsVersion}\n`;

  return versions;
}



//
