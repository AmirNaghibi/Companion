// export function initMap() {
//   const directionsService = new window.google.maps.DirectionsService();
//   const directionsDisplay = new window.google.maps.DirectionsRenderer();
//   const chicago = new window.google.maps.LatLng(41.850033, -87.6500523);
//   const mapOptions = {
//     zoom:7,
//     center: chicago
//   }
//   const map = new window.google.maps.Map(document.getElementById('map'), mapOptions);
//   directionsDisplay.setMap(map);
// }

export function calcRoute(start, destination, cb) {
  const directionsService = new window.google.maps.DirectionsService();

  const request = {
    origin: `${start.lat},${start.lng}`,
    destination: `${destination.lat},${destination.lng}`,
    travelMode: 'WALKING'
  };
  directionsService.route(request, cb);
}
