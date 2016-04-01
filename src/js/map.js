var map;
var geocoder;

function initialize() {
  var mapContainer = document.getElementById('map-canvas');
  if(!mapContainer.length) return;

  var address = mapContainer.getAttribute('data-address');

  map = new google.maps.Map(mapContainer, {
    zoom: 17,
    scrollwheel: false,
    center: codeAddress(address),
    styles: []
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
  console.log('onload');
  loadScript();
};

