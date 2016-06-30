



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



summer.init = function() {

  summer.dom.mapCanvas = document.getElementById('map-canvas');
  summer.plugins.gm.directionsDisplay = new google.maps.DirectionsRenderer({
    draggable: true
  });
  summer.plugins.gm.map = new google.maps.Map(summer.dom.mapCanvas,summer.plugins.gm.mapOptions);
  summer.plugins.gm.geocoder = new google.maps.Geocoder();
  summer.plugins.gm.address = summer.dom.mapCanvas.getAttribute('data-address');
  summer.plugins.gm.run();
};




  summer.plugins.gm.mapOptions={
    zoom: 17,
    scrollwheel: false,
    center: new google.maps.LatLng(28.42, -81.58),
    styles: []
  };

summer.plugins.gm.searchAddress=function(address) {

    summer.maps.gm.geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        summer.plugins.gm.createMarker(results[0].geometry.location);

      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  };
  summer.plugins.gm.createMarker=function(latlng) {
    var marker;
    // If the user makes another search you must clear the marker variable
    if(marker != undefined && marker != ''){
      marker.setMap(null);
      marker = '';
    }

    marker = new google.maps.Marker({
      map: googleMaps.map,
      position: latlng
    });

  };
  summer.plugins.gm.start = {};
  function showPosition(position) {
    summer.plugins.gm.start = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    var directionsService = new google.maps.DirectionsService();
    var request = {
      origin: summer.plugins.gm.start,
      destination:  summer.plugins.gm.address,
      travelMode: google.maps.TravelMode.TRANSIT
    };
    directionsService.route(request, function (result, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        summer.plugins.gm.directionsDisplay.setDirections(result);
      }
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

    console.log( summer.plugins.gm.searchAddress(summer.plugins.gm.address));
    summer.plugins.gm.searchAddress(summer.plugins.gm.address);
  }


  summer.plugins.gm.run=function(){
    navigator.geolocation.watchPosition(showPosition, showError);
  };




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

window.onload = function() {
  summer.handler = summer.utils.once(onVisibilityChange(document.getElementById('map-canvas'),summer.init()));
  if (window.addEventListener) {
    addEventListener('DOMContentLoaded', summer.handler, false);
    addEventListener('load', summer.handler, false);
    addEventListener('scroll', summer.handler, false);
    addEventListener('resize', summer.utils.handler, false);
  } else if (window.attachEvent)  {
    attachEvent('onDOMContentLoaded', handler); // IE9+ :(
    attachEvent('onload', summer.handler);
    attachEvent('onscroll', summer.handler);
    attachEvent('onresize', summer.handler);
  }
};

