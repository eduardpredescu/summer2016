var map;
var geocoder;

function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp' +
      '?key=AIzaSyCgzwlVgB2yRIIW89qbpi9dAiWlD1DAjy0' +
      '&callback=initialize';
  document.body.appendChild(script);
}

function initialize() {
  var mapCanvas = document.getElementById('map-canvas');
  if(!mapCanvas) return;

  var address = mapCanvas.getAttribute('data-address');

  map = new google.maps.Map(mapCanvas, {
    zoom: 17,
    scrollwheel: false,
    center: codeAddress(address),
    styles: []
  });
}

function codeAddress(address) {
  geocoder = new google.maps.Geocoder();
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}

window.onload = function() {
  loadScript();
};
