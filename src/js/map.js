var map;
var geocoder;
var address;
var directionsDisplay;
var mapCanvas;

function loadScript() {
   var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js' +
      '?key=AIzaSyCgzwlVgB2yRIIW89qbpi9dAiWlD1DAjy0' + '&libraries=places'+
      '&callback=summermap.initialize';
  document.body.appendChild(script);
}

summermap = {};

summermap.initialize = function() {
  mapCanvas = document.getElementById('map-canvas');
  directionsDisplay = new google.maps.DirectionsRenderer();
  address = mapCanvas.getAttribute('data-address');
  mapper();

}


function mapper(){
  if (!mapCanvas) return;
  var start = {};
  navigator.geolocation.watchPosition(showPosition, showError);
  function showPosition(position) {
    start = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    var directionsService = new google.maps.DirectionsService();
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
  
  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.warn("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        console.warn("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        console.warn("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        console.warn("An unknown error occurred.");
        break;
    }
    map = new google.maps.Map(mapCanvas, {
      zoom: 17,
      scrollwheel: false,
      center: codeAddress(address),
      styles: []
    });

  }


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
  if (document.getElementById('map-canvas')) {
    loadScript();
  }

};
