// Verify links are working
console.log("Start creating Map, use logic_1");

// Create initial base tile layers, a leaflet layergroup for earthquakes, and a layer control.

// Create the base layers.
let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

// Create a baseMaps object.
let baseMaps = {
"Street Map": street,
"Topographic Map": topo
};

// Create an empty leaflet layergroup for earthquakes
let earthquakes = new L.layerGroup();

// Create an overlay object to hold the overlay.
let overlayMaps = {
Earthquakes: earthquakes
};

// Create the map, giving it the streetmap and earthquakes layers to display on load.
let myMap = L.map("map", {
center: [
    37.09, -95.71
],
zoom: 5,
layers: [street, earthquakes]
});
