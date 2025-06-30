const locateBtn = document.getElementById('locate');
const statusDiv = document.getElementById('status');
let map;

function initMap(lat, lon) {
  map = L.map('map').setView([lat, lon], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(map);
  L.marker([lat, lon]).addTo(map)
    .bindPopup('You are here.')
    .openPopup();
}

locateBtn.addEventListener('click', () => {
  if (!navigator.geolocation) {
    statusDiv.textContent = 'Geolocation is not supported by your browser';
    return;
  }
  statusDiv.textContent = 'Locating…';
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      statusDiv.textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;
      if (!map) {
        initMap(latitude, longitude);
      } else {
        map.setView([latitude, longitude]);
      }
    },
    () => {
      statusDiv.textContent = 'Unable to retrieve your location';
    }
  );
});
