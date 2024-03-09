// Verify links are working -- comment out console.log after verification
// console.log("Start creating Map, use logic_1");

// logic_1: Create initial base tile layers, a Leaflet layergroup for earthquakes, and a layer control toggle.

// logic_2: get USGS earthquake data, use it to create circleMarker for each earthquake
// use a common radius, common color, and popup with location, time, magnitude, and depth.

// logic_3: configure every circleMarker for each earthquake to reflect the Magnitude and Depth of the earthquake.
// Magnitude will be represented by "size" and Depth will be represented by "color". 

// logic_4: create a basic legend for the colors used to indicate the depth of an earthquake in the circleMarker function.
// will also provide info box explaining how the circleMArker radius coralates to earthquake size as well.

// Create the base layers.
let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' +
    `<br> Analyst: Steven Tuttle <a href="https://github.com/SteveTuttle/leaflet-challenge">Project GitHub Repository</a>`
})

let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)' +
    `<br> Analyst: Steven Tuttle <a href="https://github.com/SteveTuttle/leaflet-challenge">Project GitHub Repository</a>` 
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
    // Test the response, send the data features to look at first object. -- comment out console.log after verification
    console.log(data.features[0]);

    // Create function for "size" with geojsonMarker
    function sizeMarker(magnitude) {
        return magnitude * 5
    }

    // Create function for "depth" with geojsonMarker
    function depthMarker(depth) {
        return depth > 200 ? '#8c510a' :
            depth > 100 ? '#bf812d' :
            depth > 50 ? '#dfc27d' :
            depth > 25 ? '#f6e8c3' :
            depth > 10 ? '#c7eae5' :
            depth > 5 ? '#80cdc1' :
            depth > 1 ? '#35978f' :
                        '#01665e';
    }

    // Create GeoJSON data layer to provide visual earthquake data.
    // I will reference the documentation on the Leaflet website for the following.
    function markerStyle(feature) {
        return {
            radius: sizeMarker(feature.properties.mag),
            fillColor: depthMarker(feature.geometry.coordinates[2]),
            color: "black",
            weight: 0.5,
            opacity: 1,
            fillOpacity: 0.5
        };
    }

    L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);
        },

        // use markerStyle to define the circleMarker style
        style: markerStyle,

        // use onEachFeature to add the popups to show the location, magnitude, and depth and when the eathquake occurred.
        onEachFeature: function onEachFeature(feature, layer) {
            layer.bindPopup(`<h3>${feature.properties.place}</h3>
            <hr>
            <p>${new Date(feature.properties.time).toLocaleString()}</p>
            <h3>Magnitude: ${feature.properties.mag.toLocaleString()}</h3>
            <h3>Depth: ${feature.geometry.coordinates[2].toLocaleString()}</h3>
            `);
        }

    }).addTo(earthquakes);

    // Create Legend for the map
    let legend = L.control({position: 'bottomright'});

    legend.onAdd = function (myMap) {

        let div = L.DomUtil.create('div', 'info legend'),
            grades = [0, 1, 5, 10, 25, 50, 100, 200],
            labels = [];

        // loop through our density intervals and generate a label with a colored square for each interval
        div.innerHTML += `Surface Depth (km)<br>`
        for (let i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + depthMarker(grades[i] + 1) + '"></i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }

        return div;
    };

    legend.addTo(myMap);

    // Add Info Control on the map
    let info = L.control();

    info.onAdd = function () {
        this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
        this.update();
        return this._div;
    };

    // method that we will use to update the control based on feature properties passed
    info.update = function (props) {
        this._div.innerHTML = '<h4>USGS Realtime Earthquake Data for the Past 7 Days</h4>' +  
            `Circle radius correlates to earthquake Magnitude.` +
            '<br>' +
            `Circle color indicates earthquake Depth.`;
    };

    info.addTo(myMap);

});
