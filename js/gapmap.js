const settings = [
    { type: "Line", key: 'topGap', zIndex: 1, title: 'HUB Top Gaps', data: topCommitteeJson, color: '#FF7F00', checked: showTopGaps},
    //{ type: "Line", key: 'HUBgap', zIndex: 2, title: 'HUB Major Gaps', color: '#CE424C', checked: false},
    { type: "Line", key: 'HUBgapNov2021', zIndex: 3, title: 'HUB Gaps/Hotspots', data: HUBGapsJson2022, color: '#9031AA', icon:'img/purplePinIcon2.png', checked: showHUBgaps},
    { type: "Point", key: 'ICBCcrashes', zIndex: 4, title: 'ICBC Cyclist Crashes', data: ICBCcrashesJsonApr2022, icon:'img/circle-exclamation-solid.svg', checked: showCrashes},
    { type: "Line", key: 'designLowStress', zIndex: 5, title: 'Low Traffic Stress', data: designLowStressJson, color: '#4292C6', checked: showExistingLowStress},
    { type: "Line", key: 'designHighStress', zIndex: 6, title: 'High Traffic Stress', data: designHighStressJson, color: '#A63603', checked: showExistingHighStress},
    { type: "Point", key: 'trainParkade', zIndex: 7, title: 'Train Stations/Parkades', data: trainStationsJson, data1: bikeParkadesJson, icon:'img/train-subway-solid.svg', icon1:'img/square-parking-solid.svg', checked: showStations},
    { type: "Point", key: 'schools', zIndex: 8, title: 'Schools', data: schoolsJson, icon:'img/graduation-cap-solid.svg', checked: showShools},
    { type: "Point", key: 'food', zIndex: 9, title: 'Grocery', data: foodJson_Apr2022, icon:'img/cart-shopping-solid.svg', checked: showFood},
    { type: "Point", key: 'adoptGap', zIndex: 10, title: 'HUB Adopt a Gap', data: adoptGapsJson, icon:'img/adopt.png', checked: showAdoptGap},
    { type: "Point", key: 'bikeMaps', zIndex: 11, title: 'BikeMaps.org', data: bikeMapsJsonApr2022, icon:'img/BikeMapsRound.png', checked: showBikeMaps},
    { type: "Point", key: 'triCityFix', zIndex: 12, title: 'TriCityFix App', data: triCityFixJson2, icon:'img/TriCityFixRound2.png', checked: showTriCityFix},
    { type: "Point", key: 'veloCanada', zIndex: 13, title: 'Velo Pedal Poll', data: veloData2021, icon:'img/VeloBikesRound2.png', checked: showVeloBikes}]
// note: zIndex currently not used. Leaving for future improvments.

// Create variable to hold map element, give initial settings to map
//var centerCoord = [49.254667, -122.825015]
var centerCoord = [49.266872, -122.799271]
if (L.Browser.mobile) {
    // increase tolerance for tapping (it was hard to tap on line exactly), zoom out a bit, and remove zoom control
    var myRenderer = L.canvas({ padding: 0.1, tolerance: 5 });
    var map = L.map("map", { center: centerCoord, zoom: 11, minZoom: 10, renderer: myRenderer, zoomControl: false });
} else {
    var map = L.map("map", { center: centerCoord, zoom: 12, minZoom: 10,});
}

// Add OpenStreetMap tile layer to map element
L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
}
).addTo(map);

map.attributionControl.addAttribution('<a href="https://wiki.bikehub.ca/sites/committees/index.php?title=Tri-Cities_Committee_Wiki">Tri-CitiesHUB</a>');
map.attributionControl.addAttribution('<a href="https://public.tableau.com/app/profile/icbc/viz/ICBCReportedCrashes/ICBCReportedCrashes">ICBC</a>');
map.attributionControl.addAttribution('<a href="https://bikehub.ca/get-involved/ungapthemap">HUBAdoptGap</a>');
map.attributionControl.addAttribution('<a href="https://bikemaps.org">BikeMaps</a>');
map.attributionControl.addAttribution('<a href="https://apps.apple.com/ca/app/tricityfix/id1476599668">TriCityFix</a>');
map.attributionControl.addAttribution('<a href="https://www.velocanadabikes.org/pedalpoll/pedal-poll-sondo-velo-2021-results/">VeloPedalPoll</a>');
map.attributionControl.addAttribution('<a href="https://github.com/BikeOttawa">BikeOttawa</a>');
map.attributionControl.addAttribution('<a href="https://www.sd43.bc.ca/Schools/DistrictMap/Pages/default.aspx#/=">SchoolDistrictNo43</a>');
map.attributionControl.addAttribution('<a href="https://www.google.com/maps/d/u/0/viewer?mid=1NY6gbgDuGzDOrFBa-RNHFzVd4PkRbHM0&ll=49.273934982609674%2C-122.7769743&z=13">FoodAssetMap</a>');
map.attributionControl.addAttribution('updated May 2022');

//--------------- add layers ---------------
var layerGroup = new L.LayerGroup();
layerGroup.addTo(map);

lineWeight = 4
if (!L.Browser.mobile) {
    lineWeight = lineWeight + 1
}
lineOpacity = 0.55
lineOpacityHighlight = 0.8

// generic pop-up function for geojson
function onEachFeatureGeoJson(feature, layer) {
    var popupContent = ""
    if (feature.properties) {
        for (let property in feature.properties) {
            //console.log('Dragana:: tag ' + JSON.stringify(tag) +', value: '+ way.tags[tag])
            if (feature.properties[property] != null){
                if (popupContent != "") {
                    popupContent += "<br>";
                }
                popupContent += "<b>" + property + ": </b>";
                popupContent += feature.properties[property];
            }
          }
    }
    layer.bindPopup(popupContent);
}

// Committe Top gaps =======================================================
// data source: https://wiki.bikehub.ca/sites/committees/index.php?title=Tri-Cities_Committee_Wiki

// style for lines
var topGapStyle = {
    "color": settings[0].color, // darkOrange_color ("Paired")
    "weight": lineWeight,
    "opacity": lineOpacity
};
var topGapStyleHighlight = {
    "color": settings[0].color,
    "weight": lineWeight+1,
    "opacity": lineOpacityHighlight
};

function styleTop(feature) {
    // for straight line make wider, more transparent and rounded corners
    var weight = lineWeight;
    var opacity = lineOpacity;
    if (feature.properties.type == "line"){
        weight = lineWeight + 13;
        opacity = 0.3
    }
    return {
        weight: weight,
        opacity: opacity,
        color: settings[0].color
    };
}

// functions to highlight lines on click
function highlightFeatureTop(e) {
    var layer = e.target;
    var newOpacity = lineOpacityHighlight;
    var newWeight = lineWeight+1;
    if (layer.feature.properties.type == "line"){
        newOpacity = 0.5
        newWeight = lineWeight + 14;
    }
    layer.setStyle({opacity :newOpacity, weight: newWeight});
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}
function resetHighlightTop(e) {
    topGapLayer.resetStyle(e.target);
}

// add popup and highlight
function onEachFeatureTop(feature, layer) {
    var popupContent = ""
    if (feature.properties) {
        if (feature.id) {
            popupContent += "<b>Gap #";
            popupContent += feature.id + "</b>";
        }
        if (feature.properties.location) {
            popupContent += "<br><b>Location: </b>";
            popupContent += feature.properties.location;
        }
        if (feature.properties.description) {
            popupContent += "<br><b>Description: </b>";
            popupContent += feature.properties.description;
        }
    }
    layer.bindPopup(popupContent);

    layer.on({
        mouseover: highlightFeatureTop,
        mouseout: resetHighlightTop,
    });
}

var topGapLayer = new L.geoJSON(settings[0].data, {
    style: styleTop,
    onEachFeature: onEachFeatureTop,
});
if (settings[0].checked){
    layerGroup.addLayer(topGapLayer);
}

// [Feb 14, 2022] - committee doesn't have this so removing
// MAJOR HUB gaps ========================================================
// data source: https://bikehub.ca/get-involved/ungapthemap/adopt-gap
// to process - HUBgapMap.R

// var HUBgapStyle = {
//     "color": settings[1].color, // 'darkred'
//     "weight": lineWeight,
//     "opacity": lineOpacity
// };
// var HUBgapStyleHighlight = {
//     "color": settings[1].color, // 'darkred'
//     "weight": lineWeight+1,
//     "opacity": lineOpacityHighlight
// };

// function highlightFeatureHUB(e) {
//     var layer = e.target;
//     layer.setStyle(HUBgapStyleHighlight);
//     if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
//         layer.bringToFront();
//     }
// }
// function resetHighlightHUB(e) {
//     HUBgapLayer.resetStyle(e.target);
// }

// function onEachFeatureHUB(feature, layer) {
//     var popupContent = ""
//     if (feature.properties) {
//         if (feature.properties.Name) {
//             popupContent += "<b>Location: </b>";
//             popupContent += feature.properties.Name;
//         }
//         if (feature.properties.Description) {
//             popupContent += "<br><b>Description: </b>";
//             popupContent += feature.properties.Description;
//         }
//     }
//     layer.bindPopup(popupContent);

//     layer.on({
//         mouseover: highlightFeatureHUB,
//         mouseout: resetHighlightHUB,
//     });
// }

// var HUBgapLayer = new L.geoJSON(settings[1].data, {
//     style: HUBgapStyle,
//     onEachFeature: onEachFeatureHUB,
// })
// if (settings[1].checked){
//     layerGroup.addLayer(HUBgapLayer);
// }

// HUB gaps =========================================
// data source: https://www.google.com/maps/d/u/0/viewer?mid=1wlQVVmwJBDBVMZt2S5-5Ts5z9unilKHJ&ll=49.27104359118351%2C-122.81123126786682&z=14
// to process - HUBgapMap.R
var HUBallGapStyle = {
    "color": settings[1].color, // 'darkpurple'
    "weight": lineWeight,
    "opacity": lineOpacity
};
var HUBallGapStyleHighlight = {
    "color": settings[1].color, // 'darkpurple'
    "weight": lineWeight+1,
    "opacity": lineOpacityHighlight
};

function highlightFeatureHUBall(e) {
    var layer = e.target;
    if (typeof layer.setStyle === "function") { //for markers received error here "layer.setStyle is not a function"
        layer.setStyle(HUBallGapStyleHighlight);
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
    }
}
function resetHighlightHUBall(e) {
    if (typeof HUBallGapLayer.resetStyle === "function") {
        HUBallGapLayer.resetStyle(e.target);
    }
}

function onEachFeatureHUBall(feature, layer) {
    var popupContent = ""
    if (feature.properties) {
        if (feature.properties.Name) {
            popupContent += "<b>Location: </b>";
            popupContent += feature.properties.Name;
        }
        if (feature.properties.Description) {
            popupContent += "<br><b>Id: </b>";
            popupContent += feature.properties.Description;
        }
    }
    layer.bindPopup(popupContent);

    layer.on({
        mouseover: highlightFeatureHUBall,
        mouseout: resetHighlightHUBall,
    });
}

var HUBallIcon = L.icon({
    iconUrl: settings[1].icon,
    iconSize: [22, 31],
    iconAnchor: [11, 30],
    popupAnchor:  [0, -20]
});

var HUBallGapLayer = new L.geoJSON(settings[1].data, {
    style: HUBallGapStyle,
    onEachFeature: onEachFeatureHUBall,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: HUBallIcon
        });
    }
});
if (settings[1].checked){
    layerGroup.addLayer(HUBallGapLayer);
}

// ICBC cyclists crashes =========================================
// data source: https://public.tableau.com/app/profile/icbc/viz/ICBCReportedCrashes/ICBCReportedCrashes
// to process: TriCityHotspots.R
var icbcIcon = L.icon({
    iconUrl: settings[2].icon,
    iconSize: [20, 20], // size of the icon
    // iconAnchor: [11, 30],
    // popupAnchor:  [0, -20]
});

var icbcLayer = new L.geoJSON(settings[2].data, {
    onEachFeature: onEachFeatureGeoJson,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: icbcIcon
        });
    }
});
//adoptLayer.addTo(map);
if (settings[2].checked){
    layerGroup.addLayer(icbcLayer);
}

// ******** Existing Facilities Category: *************************************************
// LOW TRAFFIC STRESS BIKE DESIGNATED =========================================
// data source: OSM and Level of Traffic Stres BikeOttawa algorithm. in Notes "How to create LTS map:"
var lowStressStyle = {
    "color": settings[3].color, // light blue
    "weight": lineWeight - 1,  // had to adjust opacity and then line width becuase data seems messy
    "opacity": lineOpacity + 0.2
};
var lowStressHighlight = {
    "color": settings[3].color,
    "weight": lineWeight,
    "opacity": lineOpacityHighlight + 0.2
};

function highlightFeatureLowStress(e) {
    var layer = e.target;
    layer.setStyle(lowStressHighlight);
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}
function resetHighlightLowStress(e) {
    lowStressLayer.resetStyle(e.target);
}

function createPopupContent(feature) {
    var popupContent = ""
    if (feature.properties) {
      if (feature.properties.id) {
        popupContent +='<b><a href="https://www.openstreetmap.org/' + feature.properties.id + '" target="_blank">' + feature.properties.id + '</a></b><hr>'
        //popupContent += "<b>Id: </b>";
        //popupContent += feature.properties.id;
      }
      if (feature.properties.highway) {
        popupContent += "<b>category: </b>";
        popupContent += feature.properties.highway;
      }
      for (let property in feature.properties) {
        //console.log('Dragana:: tag ' + JSON.stringify(tag) +', value: '+ way.tags[tag])
        if ((property !== "id") && (property !== "decisionMsg") && (property !== "highway") && (feature.properties[property] != null)){
          popupContent += "<br><b>" + property + ": </b>";
          popupContent += feature.properties[property];
        }
      }
      if (feature.properties.decisionMsg) {
        popupContent += "<br><br><b>Decision Msg: </b>";
        popupContent += feature.properties.decisionMsg;
      }
    }
    return popupContent;
}

function onEachFeatureLowStress(feature, layer) {
    var popupContent = createPopupContent(feature)
    layer.bindPopup(popupContent);

    layer.on({
        mouseover: highlightFeatureLowStress,
        mouseout: resetHighlightLowStress,
    });
}

var lowStressLayer = new L.geoJSON(settings[3].data, {
    style: lowStressStyle,
    onEachFeature: onEachFeatureLowStress,
})
if (settings[3].checked){
    layerGroup.addLayer(lowStressLayer);
}

// HIGH TRAFFIC STRESS BIKE DESIGNATED =========================================
// data source: OSM and Level of Traffic Stres BikeOttawa algorithm. in Notes "How to create LTS map:"
var highStressStyle = {
    "color": settings[4].color, // brown
    "weight": lineWeight - 1,
    "opacity": lineOpacity + 0.2
};
var highStressHighlight = {
    "color": settings[4].color,
    "weight": lineWeight,
    "opacity": lineOpacityHighlight + 0.2
};

function highlightFeatureHighStress(e) {
    var layer = e.target;
    layer.setStyle(highStressHighlight);
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}
function resetHighlightHighStress(e) {
    highStressLayer.resetStyle(e.target);
}

function onEachFeatureHighStress(feature, layer) {
    var popupContent = createPopupContent(feature)
    layer.bindPopup(popupContent);

    layer.on({
        mouseover: highlightFeatureHighStress,
        mouseout: resetHighlightHighStress,
    });
}

var highStressLayer = new L.geoJSON(settings[4].data, {
    style: highStressStyle,
    onEachFeature: onEachFeatureHighStress,
})
if (settings[4].checked){
    layerGroup.addLayer(highStressLayer);
}

// TRAIN STATIONS AND PARKADES =====================================================
// data source: OSM - in Notes "Overpass API" 
function onEachFeatureTrain(feature, layer) {
    var popupContent = ""
    if (feature.properties) {
        if (feature.properties.subway && feature.properties.subway == "yes") {
            popupContent += "SkyTrain Station:";
        }else if (feature.properties.railway && feature.properties.railway == "station") {
            popupContent += "West Coast Express Station:";
        }
        if (feature.properties.name) {
            popupContent += "<br>";
            popupContent += feature.properties.name;
        }
    }
    layer.bindPopup(popupContent);
}
function onEachFeatureParkade(feature, layer) {
    var popupContent = "Bike Parkade"
    if (feature.properties) {
        if (feature.properties.operator) {
            popupContent += "<br>operator: ";
            popupContent += feature.properties.operator;
        }
        if (feature.properties.covered) {
            popupContent += "<br>covered: ";
            popupContent += feature.properties.covered;
        }
        if (feature.properties.charge) {
            popupContent += "<br>charge: ";
            popupContent += feature.properties.charge;
        }
        if (feature.properties.opening_hours) {
            popupContent += "<br>opening hours: ";
            popupContent += feature.properties.opening_hours;
        }
    }
    layer.bindPopup(popupContent);
}

var trainIcon = L.icon({
    iconUrl: settings[5].icon,
    iconSize: [22, 22]
});
var parkadeIcon = L.icon({
    iconUrl: settings[5].icon1,
    iconSize: [22, 22]
});

var trainLayer = new L.geoJSON(settings[5].data, {
    onEachFeature: onEachFeatureTrain,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: trainIcon
        });
    }
});
var parkadeLayer = new L.geoJSON(settings[5].data1, {
    onEachFeature: onEachFeatureParkade,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: parkadeIcon
        });
    }
});
if (settings[5].checked){
    layerGroup.addLayer(trainLayer);
    layerGroup.addLayer(parkadeLayer);
}

// SCHOOLS =========================================================================
// data source: https://www.sd43.bc.ca/Schools/DistrictMap/Pages/default.aspx#/=
// (R script to convert from kml to geojson - HUBgapMap.R)
var schoolIcon = L.icon({
    iconUrl: settings[6].icon,
    iconSize: [22, 22], // size of the icon
});

var schoolLayer = new L.geoJSON(settings[6].data, {
    onEachFeature: onEachFeatureGeoJson,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: schoolIcon
        });
    }
});
if (settings[6].checked){
    layerGroup.addLayer(schoolLayer);
}

// GROCERY =========================================================================
// data source: TriCities Food Asset Map from the report produced by a consultant hired by city of Port Moody 
// https://www.google.com/maps/d/u/0/viewer?mid=1NY6gbgDuGzDOrFBa-RNHFzVd4PkRbHM0&ll=49.273934982609674%2C-122.7769743&z=13
// (R script to convert from kml to geojson - HUBgapMap.R)
var foodIcon = L.icon({
    iconUrl: settings[7].icon,
    iconSize: [22, 22], // size of the icon
});

var foodLayer = new L.geoJSON(settings[7].data, {
    onEachFeature: onEachFeatureGeoJson,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: foodIcon
        });
    }
});
if (settings[7].checked){
    layerGroup.addLayer(foodLayer);
}

// ******** Community Feedback Category: **************************************************
// HUB Adopt-a-gap campain markers =========================================
// data source: https://bikehub.ca/get-involved/ungapthemap/adopt-gap
// to process - HUBgapMap.R
function onEachFeatureAdopt(feature, layer) {
    var popupContent = ""
    if (feature.properties) {
        if (feature.properties.Name) {
            popupContent += "<b>Name: </b>";
            popupContent += feature.properties.Name;
        }
        if (feature.properties.Description) {
            popupContent += "<br><b>Description: </b>";
            popupContent += feature.properties.Description;
        }
    }
    layer.bindPopup(popupContent);
}

var adoptIcon = L.icon({
    iconUrl: settings[8].icon,
    iconSize: [22, 22]
});

var adoptLayer = new L.geoJSON(settings[8].data, {
    onEachFeature: onEachFeatureAdopt,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: adoptIcon
        });
    }
});
if (settings[8].checked){
    layerGroup.addLayer(adoptLayer);
}

// BIKEMAPS.ORG =========================================
// data source: received by email on Aug 7, 2021
var bikeMapsIcon = L.icon({
    iconUrl: settings[9].icon,
    iconSize: [22, 22]
});

var bikeMapLayer = new L.geoJSON(settings[9].data, {
    onEachFeature: onEachFeatureGeoJson,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: bikeMapsIcon
        });
    }
});
if (settings[9].checked){
    layerGroup.addLayer(bikeMapLayer);
}

// WhatWeHeard map 
// data source: feedback received in TriCityFix app or tricitiesfix@gmail.com ====================
// todo: need to create one files for mulitple for each city. problem: "id" is not unique. also, how to keep track of photos? maybe just one geojson file?
function onEachFeatureTriCityFix(feature, layer) {
    var popupContent = ""
    if (feature.properties) {
        for (let property in feature.properties) {
            //console.log('Dragana:: tag ' + JSON.stringify(property) +', value: '+ feature.properties[property])
            if (feature.properties[property] != null && feature.properties[property] != "" && 
            property != 'key' && property != 'photo'){
                if (popupContent != "") {
                    popupContent += "<br>";
                }
                popupContent += "<b>" + property + ": </b>";
                popupContent += feature.properties[property];
            }
            if (property == "photo" && feature.properties["photo"] != "") {
                //console.log(city)
                popupContent += "<br><br>"
                imageSrc = "img/triCityFix/" + feature.properties.photo
                popupContent += "<a href='" + imageSrc + "' target='_blank'><img src='" + imageSrc + "' width='148' height='100'></img></a>"
            }
        }
    }
    layer.bindPopup(popupContent);
}

var triCityFixIcon = L.icon({
    iconUrl: settings[10].icon,
    iconSize: [22, 22]
});

var triCityFixLayer = new L.geoJSON(settings[10].data, {
    onEachFeature: onEachFeatureTriCityFix,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: triCityFixIcon
        });
    }
});
if (settings[10].checked){
    layerGroup.addLayer(triCityFixLayer);
}

// VeloCanadaBikes Pedal Poll
// data source: https://www.velocanadabikes.org/pedalpoll/pedal-poll-sondo-velo-2021-results/ ====================
var pedalPollIcon = L.icon({
    iconUrl: settings[11].icon,
    iconSize: [22, 22]
});

var pedalPollLayer = new L.geoJSON(settings[11].data, {
    onEachFeature: onEachFeatureGeoJson,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: pedalPollIcon
        });
    }
});
if (settings[11].checked){
    layerGroup.addLayer(pedalPollLayer);
}

// TODO: maybe add city plans and developments to come

// Legend ========================================================================================
function addLegend() {
    const legend = L.control({ position: 'topright' })
    legend.onAdd = function (map) {
        const div = L.DomUtil.create('div')
        let legendHtml = '<div id="legendbtn" class="fill-darken2 pad1 icon menu button fr" style="display: none"></div>' +
            '<div id="legend" class="fill-darken1 round" style="display: block">' +
            '<div id="closebtn" class="fill-darken2 pad1 icon close button fr"></div>' +
            '<div class="clearfix"></div>' +
            '<form><fieldset class="checkbox-pill clearfix">'

        legendHtml += '<div class="button quiet col12">Tri-Cities Cycling Data</div>'

        //Gaps and Crashes div element that can collapse
        legendHtml += '<div class="button quiet col12">Gaps, Hotspots and Crashes:' + 
        '<div id="gcchevright" class="fill-darken2 icon chevronright button fr" style="padding: 0px; display: none"></div>' +
        '<div id="gcchevdown" class="fill-darken2 icon chevrondown button fr" style="padding: 0px; display: block"></div>' + 
        '</div>' +
        '<div id="gapscrash" style="display: block">';

         for (let setting of settings) {
            legendHtml += addLegendLine(setting)
            if (setting.key == "ICBCcrashes"){ //todo: this probably shouldn't be hardcoded
                legendHtml += '</div>' //end of Gaps and Crashes div that can collapse
                // add existing facilites note and colapse button
                //legendHtml += '<div class="button quiet col12">Existing Facilities:</div>'
                legendHtml += '<div class="button quiet col12">Existing Facilities:' + 
                '<div id="efchevright" class="fill-darken2 icon chevronright button fr" style="padding: 0px; display: none"></div>' +
                '<div id="efchevdown" class="fill-darken2 icon chevrondown button fr" style="padding: 0px; display: block"></div>' + 
                '</div>' +
                '<div id="existfacil" style="display: block">';  //start of Existing Facilities div element that can collapse
            }
            if (setting.key == "food"){ //todo: this probably shouldn't be hardcoded
                legendHtml += '</div>' //end of Existing Facilities div that can collapse
                // add community feedback category note and colapse button
                legendHtml += '<div class="button quiet col12">Community Feedback:' +
                '<div id="cfchevright" class="fill-darken2 icon chevronright button fr" style="padding: 0px; display: none"></div>' +
                '<div id="cfchevdown" class="fill-darken2 icon chevrondown button fr" style="padding: 0px; display: block"></div>' + 
                '</div>' +
                '<div id="commfeed" style="display: block">';  //start of Community Feedback div element that can collapse
            }
            if (setting.key == "veloCanada"){ //todo: this probably shouldn't be hardcoded
                legendHtml += '</div>' //end of Community Feedback div that can collapse
            }
        }

        // leaving this in for testing
        // legendHtml += '<input type="checkbox" id="topGap" onclick="toggleLayer(this)" checked><label for="topGap" id="topGap-label" class="button icon check quiet col12">&nbsp;<span style="display:inline-block; width:50px; height:8px; background-color:#FF7F00"></span>&nbsp;Committee Top Gaps </label>';
        // legendHtml += '<div class="button quiet col12">Existing Facilities:'+ '<div id="chevright" class="fill-darken2 icon chevronright button fr" style="padding:0px; display:block"></div>'+'<div id="chevdown" class="fill-darken2 icon chevrondown button fr" style="padding:0px; display:none"></div>'+'</div>'
        // legendHtml += '<div id="existfacil" style="display: none"><input type="checkbox" id="designLowStress" onclick="toggleLayer(this)"><label for="designLowStress" id="designLowStress-label" class="button icon check quiet col12">&nbsp;<span style="display:inline-block; width:50px; height:8px; background-color:#4292C6"></span>&nbsp;Low Traffic Stress </label>';
        // legendHtml += '<input type="checkbox" id="designHighStress" onclick="toggleLayer(this)"><label for="designHighStress" id="designHighStress-label" class="button icon check quiet col12">&nbsp;<span style="display:inline-block; width:50px; height:8px; background-color:#A63603"></span>&nbsp;High Traffic Stress </label></div>';

        // '<input type="checkbox" id="low_stress" checked="checked">' +
        // '<label for="low_stress" id="low_stress-label" class="button icon check quiet col12">' +
        // '&nbsp;<span style="display: inline-block;width:50px; height:8px;background-color:#377EB8"></span>&nbsp;Committee Top Gaps</label>' +

        // '<input type="checkbox" id="high_stress" checked="checked">' +
        // '<label for="high_stress" id="high_stress-label" class="button icon check quiet col12">' +
        // '&nbsp;<span style="display: inline-block;width:50px; height:8px;background-color:#377EB8"></span>&nbsp;HUB Major Gaps</label>' +

        // '<input type="checkbox" id="adopt_gap" checked="checked">' +
        // '<label for="adopt_gap" id="adopt_gap-label" class="button icon check quiet col12">' +
        // '&nbsp;' +
        // '<span style="display: inline-block;"><div style="display:flex; justify-content:center; align-items:center;"><img style="width:20px; height:20px;" src="img/adopt.png"></img>&nbsp;Adopt-a-Gap Campaign</div></span>' +
        // '</label>' +

        legendHtml += '<div class="button quiet col12">Click on map item for more info</div>'

        legendHtml += '</fieldset></form></div>'
        div.innerHTML = legendHtml

        // disable map zoom when double clicking anywhere on legend (checkboxes included)
        div.addEventListener('mouseover', function () { map.doubleClickZoom.disable(); });
        div.addEventListener('mouseout', function () { map.doubleClickZoom.enable(); });
        return div
    }
    legend.addTo(map)
}

function addLegendLine(setting) {

    var spanHtml
    if (setting.type == "Line"){
        spanHtml = '<span style="display:inline-block; width:50px; height:8px; background-color:' + setting.color +'"></span>' +
        '&nbsp;' + setting.title
    }
    if (setting.type == "Point"){
        spanHtml = '<span style="display: inline-block;"><div style="display:flex; justify-content:center; align-items:center;">' + 
        '<img style="width:20px; height:20px;" src="'+ setting.icon +'"></img>&nbsp;'+ setting.title +'</div></span>'
    }

    checkedHtml = ""
    if (setting.checked){
        checkedHtml = 'checked'
    }
    var lineHtml = '<input type="checkbox" id="'+ setting.key +'" onclick="toggleLayer(this)" ' + checkedHtml + ' >' +
        '<label for="'+ setting.key +'" id="'+ setting.key +'-label" class="button icon check quiet col12">' +
        '&nbsp;' + spanHtml + ' </label>'

    //console.log('Dragana:: lineHtml ' + lineHtml + "***end")  
    return lineHtml
}

addLegend()

// show/hide legend
document.getElementById('legendbtn').onclick = function () { toggleDisplay(['legendbtn', 'legend']) };
document.getElementById('closebtn').onclick = function () { toggleDisplay(['legendbtn', 'legend']) };

// show/hide Gaps and Crashes section
document.getElementById('gcchevright').onclick = function () { toggleDisplay(['gcchevright', 'gcchevdown', 'gapscrash']) };
document.getElementById('gcchevdown').onclick = function () { toggleDisplay(['gcchevright', 'gcchevdown', 'gapscrash']) };

// show/hide Existing Facilities section
document.getElementById('efchevright').onclick = function () { toggleDisplay(['efchevright', 'efchevdown', 'existfacil']) };
document.getElementById('efchevdown').onclick = function () { toggleDisplay(['efchevright', 'efchevdown', 'existfacil']) };

// show/hide Community Feedback section
document.getElementById('cfchevright').onclick = function () { toggleDisplay(['cfchevright', 'cfchevdown', 'commfeed']) };
document.getElementById('cfchevdown').onclick = function () { toggleDisplay(['cfchevright', 'cfchevdown', 'commfeed']) };

function toggleDisplay(elementIds) {
    elementIds.forEach(function (elementId) {
        var x = document.getElementById(elementId);
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    });
}

function toggleLayer(checkbox) {
    var targetLayer = null;
    if (checkbox.id == "topGap"){
        targetLayer = topGapLayer
    }
    if (checkbox.id == "HUBgap"){
        targetLayer = HUBgapLayer
    }
    if (checkbox.id == "HUBgapNov2021"){
        targetLayer = HUBallGapLayer
    }
    if (checkbox.id == "ICBCcrashes"){
        targetLayer = icbcLayer
    }
    if (checkbox.id == "designLowStress"){
        targetLayer = lowStressLayer
    }
    if (checkbox.id == "designHighStress"){
        targetLayer = highStressLayer
    }
    if (checkbox.id == "schools"){
        targetLayer = schoolLayer
    }
    if (checkbox.id == "food"){
        targetLayer = foodLayer
    }
    if (checkbox.id == "adoptGap"){
        targetLayer = adoptLayer
    }
    if (checkbox.id == "bikeMaps"){
        targetLayer = bikeMapLayer
    }
    if (checkbox.id == "triCityFix"){
        targetLayer = triCityFixLayer
    }
    if (checkbox.id == "veloCanada"){
        targetLayer = pedalPollLayer
    }

    if (targetLayer){
        if (checkbox.checked){
            layerGroup.addLayer(targetLayer);
        }else{
            layerGroup.removeLayer(targetLayer); 
        }
     }else{
         // special case for train stations and parkades. I have two data layers because of different icons for each
        if (checkbox.id == "trainParkade"){
            if (checkbox.checked){
                layerGroup.addLayer(trainLayer);
                layerGroup.addLayer(parkadeLayer);
            }else{
                layerGroup.removeLayer(trainLayer); 
                layerGroup.removeLayer(parkadeLayer);
            }
        }
     }
}