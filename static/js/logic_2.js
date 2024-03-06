// Verify links are working
console.log("Start creating Map, use logic_1");

// logic_1: Create initial base tile layers, a Leaflet layergroup for earthquakes, and a layer control toggle.

// logic_2: get USGS earthquake data, use it to create circleMarker for each earthquake
// use a common radius, common color, and popup with location, time, magnitude, and depth.

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

// Create a new empty Leaflet layergroup for earthquakes.
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
    zoom: 3.75,
    layers: [street, earthquakes]
});

// Create a layer control.
// Pass it our baseMaps and overlayMaps.
// Add the layer control to the map.
L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(myMap);

// Get earthquake data from USGS site. (use the link provided in the Challenge Instructions)
// For this challenge I will be using data as leasted for the "Past 7 Days" of this comment, with a magnitude of 1 or greater (M1.0+ Earthquakes)
let queryUrl = `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson`
// Perform a d3.json to AJEX fetch the query URL/
d3.json(queryUrl).then(function (data) {
    // Test the response, send the data features to look at first object.
    console.log(data.features[0]);

    // Create GeoJSON data layer to provide visual earthquake data.
    // I will reference the documentation on the Leaflet website for the following.
    var geojsonMarkerOptions = {
        radius: 8,
        fillColor: "#f03",
        color: "black",
        weight: 0.5,
        opacity: 0.75,
        fillOpacity: 0.5
    };

    L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions);
        },

        // use onEachFeature to add the popups to show the location, magnitude, and depth and when the eathquake occurred.
        onEachFeature: function onEachFeature(feature, layer) {
            layer.bindPopup(`<h3>${feature.properties.place}</h3>
            <hr>
            <p>${new Date(feature.properties.time)}</p>
            <h3>Magnitude: ${feature.properties.mag.toLocaleString()}</h3>
            <h3>Depth: ${feature.geometry.coordinates[2].toLocaleString()}</h3>
            `);
        }
        
    }).addTo(earthquakes);

});
