

function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js' +
      '?key=AIzaSyCgzwlVgB2yRIIW89qbpi9dAiWlD1DAjy0' + '&libraries=places'+
      '&callback=summer.init';
  document.body.appendChild(script);
}

if (window.summer === undefined)
  var summer = {};
if(summer.dom===undefined)
  summer.dom={};
if (summer.plugins === undefined)
  summer.plugins = {};
(function () {
  var googleMaps =function() {
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
        destination: summer.plugins['google-maps'].address,
        travelMode: google.maps.TravelMode.TRANSIT
      };
      directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          summer.plugins['google-maps'].directionsDisplay.setDirections(result);
        }
      });
      summer.plugins['google-maps'].map = new google.maps.Map(summer.dom.mapCanvas, {
        zoom: 17,
        scrollwheel: false,
        center: start,
        styles: []
      });
      summer.plugins['google-maps'].directionsDisplay.setMap(summer.plugins['google-maps'].map);
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
        case error.UNKNOWN_ERR:
          console.warn("An unknown error occurred.");
          break;
      }
      summer.plugins['google-maps'].map = new google.maps.Map(summer.dom.mapCanvas, {
        zoom: 17,
        scrollwheel: false,
        center: summer.plugins['google-maps'].codeAddress(summer.plugins['google-maps'].address),
        styles: []
      });

    }


  };

  summer.plugins['google-maps'] = googleMaps;
}());

summer.init = function() {
  summer.dom.mapCanvas = document.getElementById('map-canvas');
  summer.plugins['google-maps'].directionsDisplay = new google.maps.DirectionsRenderer();
  summer.plugins['google-maps'].address = summer.dom.mapCanvas.getAttribute('data-address');
  summer.plugins['google-maps']();
}



summer.plugins['google-maps'].codeAddress=function codeAddress(address) {
  summer.plugins['google-maps'].geocoder = new google.maps.Geocoder();
  summer.plugins['google-maps'].geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      summer.plugins['google-maps'].map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: summer.plugins['google-maps'].map,
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
