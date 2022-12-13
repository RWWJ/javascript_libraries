

  //
  // DEBUG This load .js code works, we just can't tell when the .js file is done loading (it's NOT immediately)
  //
  // Let's see if we can load a .js file
  //
  let script = document.createElement("script");
  script.async = false;  // Default is load async (not defer)
  script.src = "JavaScript/DialogBoxLibVersion.js";

  document.body.appendChild( script );

  // The functions in the .js file are NOT available imediately!!!
  // So delay for 100ms and THEN access one of the functions
  setTimeout( () =>
    DialogActions( "We loaded a Javascript (.js) file!!!", [{name:"OK",action:()=>setStatus("OK Then")}], 100, 50 ), 100);

  console.log("DEBUG: Trying to dynamically load a .js file");







  //


