//Taken from https://stackoverflow.com/questions/23666040/how-can-i-have-layouts-on-a-purely-static-website

$(document).ready(function() {
      $( "#loaded-header" ).load( "layout/header.html #header", function() {
        console.log("Should have loaded the header."); // Callback optional here...
      });
  });