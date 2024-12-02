//Taken from https://stackoverflow.com/questions/23666040/how-can-i-have-layouts-on-a-purely-static-website

$(document).ready(function() {
    $( "#loaded-footer" ).load( "layout/footer.html #footer", function() {
      console.log("Should have loaded the footer."); // Callback optional here...
    });
});

function loadScript(a){var b=document.getElementsByTagName("head")[0],c=document.createElement("script");c.type="text/javascript",c.src="https://tracker.metricool.com/resources/be.js",c.onreadystatechange=a,c.onload=a,b.appendChild(c)}loadScript(function(){beTracker.t({hash:"79d23b4dd05eccdecf0d980f85773ce1"})});
