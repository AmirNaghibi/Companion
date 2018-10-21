export function initMap() {
  var directionsService = new window.google.maps.DirectionsService();
  var directionsDisplay = new window.google.maps.DirectionsRenderer();
  var chicago = new window.google.maps.LatLng(41.850033, -87.6500523);
  var mapOptions = {
    zoom:7,
    center: chicago
  }
  var map = new window.google.maps.Map(document.getElementById('map'), mapOptions);
  directionsDisplay.setMap(map);
}

export function calcRoute(start, end) {
  var request = {
    origin: start,
    destination: end,
    travelMode: 'WALKING'
  };
  directionsService.route(request, function(result, status) {
    if (status == 'OK') {
      directionsDisplay.setDirections(result);
    }
  });
}
