//
//      file_tests.js
//

// 29 Nov 2022  Created from the test code in files.js


var FileTestsJsVersion = "1.0"



//
// Test all the functions in File.js
//
function testFileFunctions( canvas ) {
    let textArea = "";
    let menuEntries = [
      {name:"Test One", action:()=>{
        textArea.value += "\nExecuted Test 1";
      }},

      {name:"Test cloneObj()", action:()=>{
        let then = new Date();
        let obj1 = {a:1,b:{z:7,x:0},c:[3,4,{y:5,t:9}]};
        let arr1 = [45, {a:then,b:{z:7,x:0},c:[3,4,{y:5,t:9}]}, 12];
        let obj2 = cloneObj(obj1);

        textArea.value = `obj1:  ${JSON.stringify(obj1)}\n`;
        textArea.value += `clone: ${JSON.stringify(obj2)}\n\n`;
        obj2.b.z = 666;
        textArea.value += `obj1:  ${JSON.stringify(obj1)}\n`;
        textArea.value += `edit: ${JSON.stringify(obj2)}\n\n`;

        textArea.value += `arr1:  ${JSON.stringify(arr1)}\n`;
        let dummyForDelay = document.querySelectorAll("button");
        console.log(dummyForDelay);
        let now = new Date();

        let arr2 = cloneObj(arr1);
        textArea.value += JSON.stringify(now) + "\n";
        textArea.value += `clone: ${JSON.stringify(arr2)}\n\n`;

        arr2[1].c[2].y = 888;
        arr2[2] = 222;
        textArea.value += `arr1:  ${JSON.stringify(arr1)}\n`;
        textArea.value += `edit: ${JSON.stringify(arr2)}\n\n`;
      }},

      {name:"Test: fileLoadImage()", action:()=>{
        fileLoadImage( "", resultObj => {
          resultObj.element.width = 400;
          resultObj.element.length = 400;
          // Can use the image URL as the source for an image element
          if( resultObj.image ) document.getElementById("ImageID").src = resultObj.image;
          // Or can use image element itself to draw on a canvas
          canvas.drawImage( resultObj.element, 0, 0, 300, 300 );

          textArea.value = "<" + resultObj.fileName + "> Image Element " + resultObj.element.id + ": " +
              resultObj.element.width +","+ resultObj.element.height;
        } );
      }},
      {name:"Test: saveCanvas()", action:()=>{
        canvas.fillStyle = "yellow";
        canvas.fillRect( 50, 120, 200, 50 );
        canvas.fillStyle = "blue";
        canvas.fillRect( 150, 10, 15, 280 );
        fileSaveCanvas( "Some Canvas.png", canvas );
      }},

      {name:"Test: fileFileOfImageTextFiles()", action:()=>{
        let element = document.getElementById("TestAreaID");

        // We get a callback for every file loaded from the filelist in our specified file
        //
        fileFileOfImageTextFiles( "TestFiles/ImageList.txt", (results) => {
          // results is {image:imageElement, text:text}
          element.innerHTML += "<h1>NEXT FILE</h1>";
          if( results.text ) element.innerHTML += "<p>" + results.text + "</p>";
          else element.innerHTML += "<p> ERROR: FAILED TO LOAD TEXT</p>";
          if( results.image ) {
            results.image.style.maxWidth = "100px";
            results.image.style.maxHeight = "100px";
            element.appendChild(results.image);
          }
          else element.innerHTML += "<p> ERROR: FAILED TO LOAD IMAGE</p>";
        } );
      }},
      {name:"Test: fileFileOfTextFiles()", action:()=>{
        let element = document.getElementById("TestAreaID");

        // We get a callback for every file loaded from the filelist in our specified file
        //
        fileFileOfTextFiles( "TestFiles/FileList.txt", (textObj) => {
          if( textObj.fileName && textObj.text ) element.innerHTML += `<h1>NEXT FILE: ${textObj.fileName}</h1> <p>${textObj.text} </p>`;
          else if( textObj.fileName ) element.innerHTML += `<h1>NEXT FILE: ${textObj.fileName}</h1> ERROR: FAILED TO LOAD </p>`;
          else  element.innerHTML += "<h1>NEXT FILE</h1> <p> ERROR: FAILED TO LOAD </p>";
        } );
      }},
      {name:"Test: fileReadText()", action:()=>{
        fileReadText( "TestFiles/FileList.txt", result => {
        // fileReadText( "https://icanhazdadjoke.com/", result => {
       // fileReadText( "https://jsonplaceholder.typicode.com/todos/1", result => {
          textArea.value = "<" + result.fileName + "> Contents: " + result.text;
        } );
      }},
      {name:"Test: fileReadTextPrompt()", action:()=>{
        fileReadTextPrompt( result => {
          textArea.value = "<" + result.fileName + "> Contents: " + result.text;
        } );
      }},
      {name:"Test: fileSaveText()", action:()=>{
        fileSaveText( "Test - fileSaveText.txt", `
          If you ever go back into Wooly Swamp son you better not go at night
          There's things out there in the middle of them woods
          That'd make a strong man die from fright
          There's things that crawl and things that fly
          And things that creep around on the ground
          And they say the ghost of Lucias Clay gets up and it walks around.
        `);
      }},
      {name:"Test: fileSaveLargeText()", action:()=>{
        fileSaveLargeText( "Test - fileSaveLargeText.txt", `
          Four score and seven years ago our fathers brought forth on this continent, a new nation, conceived in Liberty,
          and dedicated to the proposition that all men are created equal.

          Now we are engaged in a great civil war, testing whether that nation, or any nation so conceived and so dedicated,
          can long endure. We are met on a great battle-field of that war. We have come to dedicate a portion of that field,
          as a final resting place for those who here gave their lives that that nation might live. It is altogether fitting
          and proper that we should do this.

          But, in a larger sense, we can not dedicate -- we can not consecrate -- we can not hallow -- this ground. The brave men,
          living and dead, who struggled here, have consecrated it, far above our poor power to add or detract. The world will little note,
          nor long remember what we say here, but it can never forget what they did here. It is for us the living, rather,
          to be dedicated here to the unfinished work which they who fought here have thus far so nobly advanced. It is rather for us
          to be here dedicated to the great task remaining before us -- that from these honored dead we take increased devotion to that
          cause for which they gave the last full measure of devotion -- that we here highly resolve that these dead shall not have died in vain --
          that this nation, under God, shall have a new birth of freedom -- and that government of the people, by the people, for the people,
          shall not perish from the earth.

          Abraham Lincoln
          November 19, 1863
        `);
      }},
      {name:"Test: fileSaveJson()", action:()=>{
        fileSaveJson( "Test - fileSaveJson.json", {title:"Test",name:"fileSaveJson()",stuff:[1,2,3]} );
      }},
      {name:"Test: fileReadJson()", action:()=>{
        // fileReadJson( "TestFiles/Test - fileSaveJson.json", resultObj => {
        //   textArea.value = `<${resultObj.fileName}> Title: ${resultObj.jsonObj.title} Name: ${resultObj.jsonObj.name} Stuff: ${resultObj.jsonObj.stuff}`;
        //   textArea.value += "\n\n<" + resultObj.fileName + "> Contents: " + JSON.stringify(resultObj.jsonObj);
        // fileReadJson( "https://icanhazdadjoke.com/", resultObj => {
        //   textArea.value = `<${resultObj.fileName}> Joke: ${resultObj.jsonObj.joke}`;
        // fileReadJson( "https://jsonplaceholder.typicode.com/todos/1", resultObj => {
        //   textArea.value = `<${resultObj.fileName}> Title: ${resultObj.jsonObj.title}`;
        fileReadJson( "https://www.themealdb.com/api/json/v1/1/random.php", resultObj => {
          textArea.value = `<${resultObj.fileName}> Recipe for: ${resultObj.jsonObj.meals[0].strMeal}`;
          document.getElementById("ImageID").src = resultObj.jsonObj.meals[0].strMealThumb;
        } );
      }},
      {name:"Test: fileReadJsonPrompt()", action:()=>{
        fileReadJsonPrompt( result => {
          textArea.value = "<" + result.fileName + "> Contents: " + JSON.stringify(result.jsonObj);
        } );
      }},
      {name:"Test: fileNamePrompt()", action:()=>{
        fileNamePrompt( "*.js,*.json", filename => {
          textArea.value = filename;
        } );
      }},
      {name:"Test: fileLoadImageCore()", action:()=>{
        fileLoadImage( "TestFiles/icon.png", resultObj => {
          // resultObj might be null if image file could not be loaded (not found etc...)
          if( resultObj ) {
            resultObj.element.width = 400;
            resultObj.element.length = 400;
//            document.body.appendChild(resultObj.element);
            canvas.drawImage( resultObj.element, 0, 0 );

            textArea.value = "<" + resultObj.fileName + "> Image Element " + resultObj.element.id + ": " + resultObj.element.width +","+ resultObj.element.height;
          }
          else textArea.value = 'ERROR fileTestFileFunctions(): fileLoadImageCore("icon.png") failed.';
        } );
      }},
      {name:"Test: fileLoadImage()", action:()=>{
        fileLoadImage( "", resultObj => {
          resultObj.element.width = 400;
          resultObj.element.length = 400;
          document.body.appendChild(resultObj.element);

          // Can use the image dataURL as the source for an image element
          if( resultObj.image ) document.getElementById("ImageID").src = resultObj.image;

          textArea.value = "<" + resultObj.fileName + "> Image Element " + resultObj.element.id + ": " + resultObj.element.width +","+ resultObj.element.height;
        } );
      }},
      {name:"Test: jsonToLocalStorage()", action:()=>{
        // Start clean (i.e. remove a possibly prevoiusly stored variable)
        removeFromLocalStorage( "FileTestStorage" );

        jsonToLocalStorage( "Something to say about jsonToLocalStorage()", "FileTestStorage" );
        textArea.value = "Run next text, jsonFromLocalStorage(), to verify this one";
      }},
      {name:"Test: jsonFromLocalStorage()", action:()=>{
        textArea.value = jsonFromLocalStorage( "FileTestStorage" );
      }},
      {name:"Test: removeFromLocalStorage()", action:()=>{
        removeFromLocalStorage( "FileTestStorage" );

        let value = jsonFromLocalStorage( "FileTestStorage" );
        textArea.value = "Remove " + (value ? "FAILED" : "SUCCEEDED");
      }},

    ];

    textArea = DialogActions( "File.js Test", menuEntries, 400, 0 );
}







//
