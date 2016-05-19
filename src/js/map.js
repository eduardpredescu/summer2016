var map;
var geocoder;
var start;
var address;
var directionsDisplay;

function loadScript() {
   var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js' +
      '?key=AIzaSyCgzwlVgB2yRIIW89qbpi9dAiWlD1DAjy0' + '&libraries=places'+
      '&callback=summermap.initialize';
  console.log(script);
  document.body.appendChild(script);
}

summermap = {};

summermap.initialize = function() {
  console.log('initialize');
  var mapCanvas = document.getElementById('map-canvas');
  if (!mapCanvas) return;
  console.log("passed");
  var directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  address = mapCanvas.getAttribute('data-address');
  codeAddress(address);
  console.log(address);
  navigate();
  console.log(start);
  var request = {
    origin: start,
    destination: address,
    travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function (result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(result);
    }
  });
  map = new google.maps.Map(mapCanvas, {
    zoom: 17,
    scrollwheel: false,
    center: start,
    styles: []
  });
  directionsDisplay.setMap(map);
}
function navigate(){
  if(navigate.geolocation) {
    navigate.geolocation.getCurrentPosition(function (position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      start = pos;
    });
  }
  else{
    console.log("Location not found!");
    start=new google.maps.LatLng(44.466119, 26.082391);
  }
}
function codeAddress(address) {
  geocoder = new google.maps.Geocoder();
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
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
  console.log('load');
  if (document.getElementById('map-canvas')) {
    console.log('before-script');
    loadScript();
    console.log('after-script');
  }

};
