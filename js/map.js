var map;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 44.8176274, lng: 20.4619759 },
    zoom: 15
  });
}