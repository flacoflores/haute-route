// Leaflet map initialization
function initMap(containerId, options) {
  options = options || {};
  var isMini = options.mini || false;
  var stages = options.stages || [];

  var map = L.map(containerId, {
    scrollWheelZoom: !isMini,
    zoomControl: !isMini,
  });

  // OpenTopoMap tiles — shows contour lines and trails
  L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
    maxZoom: 17,
    attribution:
      'Map data: &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="https://opentopomap.org">OpenTopoMap</a>',
  }).addTo(map);

  // Load GPX route trace
  if (options.gpxUrl) {
    new L.GPX(options.gpxUrl, {
      async: true,
      marker_options: { startIconUrl: null, endIconUrl: null, shadowUrl: null },
      polyline_options: {
        color: "#0ea5c0",
        weight: 4,
        opacity: 0.8,
        lineCap: "round",
      },
    })
      .on("loaded", function (e) {
        map.fitBounds(e.target.getBounds(), { padding: [30, 30] });
      })
      .addTo(map);
  }

  // Add day markers
  if (stages.length > 0) {
    var bounds = [];

    stages.forEach(function (stage) {
      var markerClass = "day-marker";
      if (stage.day === 1) markerClass += " day-marker--start";
      if (stage.day === stages.length) markerClass += " day-marker--end";

      var icon = L.divIcon({
        className: "",
        html: '<div class="' + markerClass + '">' + stage.day + "</div>",
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      var marker = L.marker([stage.lat, stage.lng], { icon: icon }).addTo(map);
      bounds.push([stage.lat, stage.lng]);

      // Popup content
      var popupHtml =
        '<div class="popup-title">Day ' +
        stage.day +
        ": " +
        stage.from +
        " → " +
        stage.to +
        "</div>" +
        '<div class="popup-stats">' +
        "<span>" +
        stage.distance +
        "</span>" +
        "<span>↑ " +
        stage.elevationGain +
        "</span>" +
        "<span>" +
        stage.time +
        "</span>" +
        "</div>";

      if (!isMini) {
        popupHtml +=
          '<a class="popup-link" href="/journal/during/">Read journal entry →</a>';
      }

      marker.bindPopup(popupHtml);
    });

    // If no GPX, fit to markers
    if (!options.gpxUrl && bounds.length > 0) {
      map.fitBounds(bounds, { padding: [30, 30] });
    }
  }

  return map;
}
