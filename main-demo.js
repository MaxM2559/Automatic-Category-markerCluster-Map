// Creating map
var southWest = L.latLng(180, 180),
northEast = L.latLng(-180, -180),
  bounds = L.latLngBounds(southWest, northEast);
var map = L.map("map", {preferCanvas: true, maxBounds: bounds, minZoom: 4}).setView([40, -95], 6);


// Layers for map view - Add more layers from https://leaflet-extras.github.io/leaflet-providers/preview/
var osmLayer = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxBounds: bounds,
}).addTo(map);
var streetMap = L.tileLayer('https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png', {
	maxZoom: 18,
  maxBounds: bounds,
	attribution: 'Map <a href="https://memomaps.de/">memomaps.de</a> <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
var WorldImage = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  maxBounds: bounds,
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});
var whiteBackground = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
	maxZoom: 16
});


// Create the geocoding control and add it to the map
var searchControl = L.esri.Geocoding.geosearch({
  providers: [
    L.esri.Geocoding.arcgisOnlineProvider({
      apikey: 'AAPKefe7d56a828141d8b69a56a9ee8002bcv32Kl-xhxV1hrewImGAIOSeYBoa_FhN5FtFKlpjArQ5WcFhIbfo3xbCFV9rcIKQx'
    })
  ]
}).addTo(map);
 

// Function that gives LatLongs from clicking
var popup = L.popup();
function onMapClick(e) {
      popup
          .setLatLng(e.latlng)
          .setContent("You clicked the map at " + e.latlng.toString())
          .openOn(map);
  }
map.on('click', onMapClick);


// Function that gives a random color - remove if set colors for different industries are chosen
function getColor(){
    const color = "#" + Math.floor(Math.random()*16777215).toString(16);
    return color;
}


// Creating search function on map
var results = L.layerGroup().addTo(map);
// listen for the results event and add every result to the map
searchControl.on("results", function (data) {
  results.clearLayers();
  for (var i = data.results.length - 1; i >= 0; i--) {
    results.addLayer(L.marker(data.results[i].latlng));
  }
});


// Main function 
//
// Function that retrieves data, creates all markers, creates and add marker clustering, 
// and creates layer control.
//
// This function creates keyList array that stores industries, the color associated, and
// and the layer of markers that are associated with that industry. 
//
// This function also adds layer control, which allows the user to change the texture
// view of the map as well show/hide various industry locations.

getData();
async function getData() {
  const response = await fetch('demo-points.csv');  // csv file here
  const data = await response.text();

  map.on('click', onMapClick);

  var markersCluster = L.markerClusterGroup();
  let keyList = [];
  const rows = data.split('\n').slice(1);

  for (let i = 0; i < rows.length; i++) {
    var keyStatus = "nothing"
    const row = rows[i].split(',');
    // selecting data may vary based on how data is organized
    const name = row[0];
    const lat = row[1];
    const long = row[2];
    const category = row[3];
    // const symb = row[4];
    // const name = row[5];
    // const naicscode = row[6];

    // Check if industry is already in keyList; if so, then add marker to existing layer
    for (const element of keyList) {
        if (category == element[0]) {
            var marker = L.circleMarker([lat, long], {color: element[1], radius: 10});
            keyStatus = element[1];
            marker.addTo(element[2]);
        };
    }

    // If industry does not already exist in keyList, then create layer of industry with new color
    if (keyStatus == "nothing") {
        const newColor = getColor();
        var marker = L.circleMarker([lat, long], {color: newColor, radius: 10});
        eval('var ' + 'Layer' + i.toString() + ' = L.layerGroup([marker])')
        eval('keyList.push([category, newColor, Layer'+i.toString()+'])');
    }

    // pop up descriptions including Name, Exchange, Symbol, and Naics code
    marker.bindPopup("<b>Name: </b>" + name + "<br><b>Category: </b>" + category);
    map.addLayer(markersCluster); // add marker cluster by default
  }

  for (let i = 0; i < keyList.length; i++){
    markersCluster.addLayer(keyList[i][2])
  }

  keyList.pop();

  // adding various map textures options from before
  var baseMaps = {
    'OSM': osmLayer,
    'Street map': streetMap,
    'Satilite view': WorldImage,
    'White Background' : whiteBackground
  }

  // adding industry view options
  var layerMap = {"<span style='color:blue'>Toggle clustering</span>" : markersCluster};
  // creaing layer control for industries and legend for colors
  for (let p = 0; p< keyList.length; p++){
    let joshFinal = "<span style='color:" + keyList[p][1].toString() +"'>" + "◼ " +"</span>";
    layerMap[joshFinal + keyList[p][0]] = keyList[p][2];
  }

  // adding layer control to map
  L.control.layers(baseMaps, layerMap).addTo(map);


  //adding Scale at bottom of map
  L.control
  .scale({
    imperial: true,
  })
  .addTo(map);

  var popup = L.popup()
    .setLatLng([40, -95])
    .setContent("Note the layer cotrol panel at the top right. All the category options were created automatically based data from a CSV file.")
    .openOn(map);

}