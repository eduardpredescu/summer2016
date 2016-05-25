



if (window.summer === undefined)
  var summer = {};
if(summer.dom===undefined)
  summer.dom={};
if(summer.utils===undefined)
    summer.utils={};
if (summer.plugins === undefined)
  summer.plugins = {};
if(summer.plugins.gm===undefined)
  summer.plugins.gm={};

(function () {
  var googleMaps =function() {
    var start = {};
    googleMaps.address=summer.plugins.gm.address;
    navigator.geolocation.watchPosition(showPosition, showError);
    function showPosition(position) {
      start = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var directionsService = new google.maps.DirectionsService();
      var request = {
        origin: start,
        destination: googleMaps.address,
        travelMode: google.maps.TravelMode.TRANSIT
      };
      directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          summer.plugins.gm.directionsDisplay.setDirections(result);
        }
      });
      googleMaps.map = new google.maps.Map(summer.dom.mapCanvas, {
        zoom: 17,
        scrollwheel: false,
        center: start,
        styles: []
      });
      summer.plugins.gm.directionsDisplay.setMap(summer.plugins.gm.map);
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
      googleMaps.map = new google.maps.Map(summer.dom.mapCanvas, {
        zoom: 17,
        scrollwheel: false,
        center: googleMaps.codeAddress(summer.plugins.gm.address),
        styles: []
      });

    }

  };
  googleMaps.codeAddress=function codeAddress(address) {
    googleMaps.geocoder = new google.maps.Geocoder();
    googleMaps.geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        googleMaps.map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: googleMaps.map,
          position: results[0].geometry.location
        });
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }
  summer.plugins.gm = googleMaps;
}());

summer.init = function() {
  summer.dom.mapCanvas = document.getElementById('map-canvas');
  summer.plugins.gm.directionsDisplay = new google.maps.DirectionsRenderer({
    draggable: true
  });
  summer.plugins.gm.address = summer.dom.mapCanvas.getAttribute('data-address');
  summer.plugins.gm();
}



summer.utils.once=function once(fn, context) {
  var result;

  return function() {
    if(fn) {
      result = fn.apply(context || this, arguments);
      fn = null;
    }

    return result;
  };
}
summer.utils.load=function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js' +
      '?key=AIzaSyCgzwlVgB2yRIIW89qbpi9dAiWlD1DAjy0' + '&libraries=places'+"&callback=summer.init";
  document.body.appendChild(script);
}
window.onload = function() {
  summer.utils.handler = summer.utils.once(onVisibilityChange(document.getElementById('map-canvas'),summer.utils.load()));
  if (window.addEventListener) {
    addEventListener('DOMContentLoaded', summer.utils.handler, false);
    addEventListener('load', summer.utils.handler, false);
    addEventListener('scroll', summer.utils.handler, false);
    addEventListener('resize', summer.utils.handler, false);
  } else if (window.attachEvent)  {
    attachEvent('onDOMContentLoaded', handler); // IE9+ :(
    attachEvent('onload', summer.utils.handler);
    attachEvent('onscroll', summer.utils.handler);
    attachEvent('onresize', summer.utils.handler);
  }
};

