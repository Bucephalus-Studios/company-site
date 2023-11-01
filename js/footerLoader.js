//Taken from https://stackoverflow.com/questions/23666040/how-can-i-have-layouts-on-a-purely-static-website

$(document).ready(function() {
    $( "#loaded-footer" ).load( "layout/footer.html #footer", function() {
      console.log("Should have loaded the footer."); // Callback optional here...
    });
});