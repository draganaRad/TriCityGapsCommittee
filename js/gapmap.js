const settings = [
    { type: "Line", key: 'topGap', zIndex: 1, title: 'HUB Top Gaps', data: topCommitteeJson, color: '#FF7F00', checked: showTopGaps},
    //{ type: "Line", key: 'HUBgap', zIndex: 2, title: 'HUB Major Gaps', color: '#CE424C', checked: false},
    { type: "Line", key: 'HUBgapLine', zIndex: 3, title: 'HUB Gaps', data: HUBGapsLinesApr2023, color: '#9031AA', checked: showHUBgaps},
    { type: "Point", key: 'HUBgapPoint', zIndex: 3, title: 'HUB Hotspots', data: HUBGapsPointsApr2023, icon:'img/purplePinIcon2.png', iconLegend:'img/purplePinIcon2Circle.png', checked: showHUBgaps},
    // { type: "Point", key: 'ICBCcrashes', zIndex: 4, title: 'ICBC Cyclist Crashes', data: ICBCcrashesJsonOct2024, icon:'img/circle-exclamation-solid.svg', checked: showCrashes},
    { type: "Point", key: 'ICBCcrashes', zIndex: 4, title: 'ICBC Cyclist Crashes', data: ICBCcrashesJsonOct2024, icon:'img/ICBCCrash.png', checked: showCrashes},
    { type: "Point", key: 'adoptGap', zIndex: 10, title: 'HUB Adopt a Gap', data: adoptGapsJson, icon:'img/adopt.png', checked: showAdoptGap},
    { type: "Point", key: 'HUBemail', zIndex: 11, title: 'HUB email', data: HUBemail, icon:'img/envelope-solid.svg', checked: showHUBemail},
    { type: "Line/Point", key: 'glenayre', zIndex: 11, title: 'Glenayre (for kids)', data: glenayre, checked: showGlenayre},
    { type: "Point", key: 'bikeMaps', zIndex: 11, title: 'BikeMaps.org', data: bikeMapsJson, icon:'img/BikeMapsRound.png', checked: showBikeMaps},
    { type: "Point", key: 'triCityFix', zIndex: 12, title: 'TriCityFix App', data: triCityFixJson2, icon:'img/TriCityFixRound2.png', checked: showTriCityFix},
    { type: "Point", key: 'veloCanada', zIndex: 13, title: 'Velo Pedal Poll', data: veloData2021, icon:'img/VeloBikesRound2.png', checked: showVeloBikes},
    { type: "Line", key: 'upcoming', zIndex: 6, title: 'Upcoming', data: HUBupcomingProjects, color: '#6666FF', checked: showUpcoming},
    { type: "Line", key: 'translinkMBN', zIndex: 6, title: 'TransLink MBN', data: translinkMBNJson, color: '#5B9F94', checked: showTranslinkMBN},
    { type: "Line", key: 'metrovanGreen', zIndex: 6, title: 'Metrovan Greenways', data: metrovanGreenJson, color: '#8FCD69', checked: showMetrovanGreen},
    { type: "Line", key: 'designLowStress', zIndex: 5, title: 'Low Traffic Stress', data: designLowStressJson, color: '#4292C6', checked: showExistingLowStress},
    { type: "Line", key: 'designHighStress', zIndex: 6, title: 'High Traffic Stress', data: designHighStressJson, color: '#A63603', checked: showExistingHighStress},
    { type: "Point", key: 'trainParkade', zIndex: 7, title: 'Train Stations/Parkades', data: trainStationsJson, data1: bikeParkadesJson, icon:'img/train-subway-solid.svg', icon1:'img/square-parking-solid.svg', checked: showStations},
    { type: "Point", key: 'schools', zIndex: 8, title: 'Schools', data: schoolsJson, icon:'img/graduation-cap-solid.svg', checked: showShools},
    { type: "Point", key: 'food', zIndex: 9, title: 'Grocery', data: foodJson, icon:'img/cart-shopping-solid.svg', checked: showFood}];
// note: order in settings is the order in legend
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
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions" target="_blank">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
}
).addTo(map);

map.attributionControl.addAttribution('<a href="https://wiki.bikehub.ca/sites/committees/index.php?title=Tri-Cities_Committee_Wiki" target="_blank">Tri-CitiesHUB</a>');
map.attributionControl.addAttribution('<a href="https://public.tableau.com/app/profile/icbc/viz/ICBCReportedCrashes/ICBCReportedCrashes" target="_blank">ICBC</a>');
map.attributionControl.addAttribution('<a href="https://bikehub.ca/get-involved/ungapthemap" target="_blank">HUBAdoptGap</a>');
map.attributionControl.addAttribution('<a href="https://www.google.com/maps/d/u/0/viewer?mid=1K4Dl701Fpj-rx68w2YdqRKghxzymJFk&ll=49.27449076794508%2C-122.87642890000002&z=13" target="_blank">Glenayre</a>');
map.attributionControl.addAttribution('<a href="https://bikemaps.org" target="_blank">BikeMaps</a>');
map.attributionControl.addAttribution('<a href="https://apps.apple.com/ca/app/tricityfix/id1476599668" target="_blank">TriCityFix</a>');
map.attributionControl.addAttribution('<a href="https://www.velocanadabikes.org/pedalpoll/pedal-poll-sondo-velo-2021-results/" target="_blank">VeloPedalPoll</a>');
map.attributionControl.addAttribution('<a href="https://open-data-portal-metrovancouver.hub.arcgis.com" target="_blank">MetroVancouver</a>');
map.attributionControl.addAttribution('<a href="https://github.com/BikeOttawa" target="_blank">BikeOttawa</a>');
map.attributionControl.addAttribution('<a href="https://www.sd43.bc.ca/Schools/DistrictMap/Pages/default.aspx#/=" target="_blank">SchoolDistrictNo43</a>');
map.attributionControl.addAttribution('<a href="https://www.google.com/maps/d/u/0/viewer?mid=1NY6gbgDuGzDOrFBa-RNHFzVd4PkRbHM0&ll=49.273934982609674%2C-122.7769743&z=13" target="_blank">FoodAssetMap</a>');

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
    onEachFeaturePopup(feature, layer);
}
function onEachFeaturePopup(feature, layer) {
    var popupContent = ""
    if (feature.properties) {
        for (let property in feature.properties) {
            //console.log('Dragana:: tag ' + JSON.stringify(property)); // +', value: '+ way.tags[tag])
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

// add boundaries
function styleBoundary(feature) {
    return {
        fillColor: 'transparent',
        weight: 0.5,  
        color: 'red',
        dashArray: '4',
        opacity: 0.2
    };
}
var geojsonLayer = L.geoJSON(C_boundary, {
    style: styleBoundary
}).addTo(map);
var geojsonLayer = L.geoJSON(PC_boundary, {
    style: styleBoundary
}).addTo(map);
var geojsonLayer = L.geoJSON(PM_boundary, {
    style: styleBoundary
}).addTo(map);
var geojsonLayer = L.geoJSON(BA_boundary, {
    style: styleBoundary
}).addTo(map);

// clusters --------
function createClusterGroup(clusterStyle) {
    var newClusterGroup = L.markerClusterGroup({
      maxClusterRadius: 60,
      disableClusteringAtZoom: 17,
      iconCreateFunction: function (cluster) {
        var childCount = cluster.getChildCount();
        var styleClassName = 'marker-cluster marker-' + clusterStyle
        return new L.DivIcon({ html: '<div><span>' + childCount + '</span></div>', className: styleClassName, iconSize: new L.Point(40, 40) });
      },
      //Disable all of the defaults:
      spiderfyOnMaxZoom: true, showCoverageOnHover: false, zoomToBoundsOnClick: false
    });
    return newClusterGroup
  }

// Committe Top gaps =======================================================
// data source: https://wiki.bikehub.ca/sites/committees/index.php?title=Tri-Cities_Committee_Wiki

const topGapDict = settings.find(dict => dict.key === "topGap");

// style for lines
var topGapStyle = {
    "color": topGapDict.color, // darkOrange_color ("Paired")
    "weight": lineWeight,
    "opacity": lineOpacity
};
var topGapStyleHighlight = {
    "color": topGapDict.color,
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
        color: topGapDict.color
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

var topGapLayer = new L.geoJSON(topGapDict.data, {
    style: styleTop,
    onEachFeature: onEachFeatureTop,
});
if (topGapDict.checked){
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
const HUBallGapDict = settings.find(dict => dict.key === "HUBgapLine");

var HUBallGapStyle = {
    "color": HUBallGapDict.color,
    "weight": lineWeight,
    "opacity": lineOpacity
};
var HUBallGapStyleHighlight = {
    "color": HUBallGapDict.color,
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

var HUBallGapLayer = new L.geoJSON(HUBallGapDict.data, {
    style: HUBallGapStyle,
    onEachFeature: onEachFeatureHUBall,
});
if (HUBallGapDict.checked){
    layerGroup.addLayer(HUBallGapLayer);
}

// HUB hotspots -------------------
const HUBhotspotDict = settings.find(dict => dict.key === "HUBgapPoint");

var HUBhotspotIcon = L.icon({
    iconUrl: HUBhotspotDict.icon,
    iconSize: [22, 31],
    iconAnchor: [11, 30],
    popupAnchor:  [0, -20]
});

var HUBhotspotLayer = new L.geoJSON(HUBhotspotDict.data, {
    onEachFeature: onEachFeatureHUBall,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: HUBhotspotIcon
        });
    },
    onAdd: function (map) {
        map.fire('data:loaded');
    }
});
//var HUBhotspotCluster = createClusterGroup('HUBhotspotcluster')
//HUBhotspotCluster.addLayer(HUBhotspotLayer);

if (HUBhotspotDict.checked){
   layerGroup.addLayer(HUBhotspotLayer)
}

// ICBC cyclists crashes =========================================
// data source: https://public.tableau.com/app/profile/icbc/viz/ICBCReportedCrashes/ICBCReportedCrashes
// to process: TriCityHotspots.R
const icbcDict = settings.find(dict => dict.key === "ICBCcrashes");

var icbcIcon = L.icon({
    iconUrl: icbcDict.icon,
    iconSize: [20, 20], // size of the icon
    // iconAnchor: [11, 30],
    // popupAnchor:  [0, -20]
});

var icbcLayer = new L.geoJSON(icbcDict.data, {
    onEachFeature: onEachFeatureGeoJson,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: icbcIcon
        });
    },
    onAdd: function (map) {
        map.fire('data:loaded');
    }
});
var icbcCluster = createClusterGroup('crashcluster')
icbcCluster.addLayer(icbcLayer);

if (icbcDict.checked){
   layerGroup.addLayer(icbcCluster)
}

// ******** Planned Category: ****************************************************************************************************
// UPCOMING PROJECTS  =========================================
// Note: had to manually add years after importing data from here (Colin):
// https://umap.openstreetmap.fr/en/map/hub-cycling-upcoming-projects_1020637#12/49.2782/-122.7726
const upcomingDict = settings.find(dict => dict.key === "upcoming");

var upcomingStyle = {
    "color": upcomingDict.color,
    "weight": lineWeight - 1,
    "opacity": lineOpacity + 0.2
};
var upcomingHighlight = {
    "color": upcomingDict.color,
    "weight": lineWeight,
    "opacity": lineOpacityHighlight + 0.2
};

function highlightFeatureUpcoming(e) {
    var layer = e.target;
    layer.setStyle(upcomingHighlight);
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}
function resetHighlightUpcoming(e) {
    upcomingLayer.resetStyle(e.target);
}

function onEachFeatureUpcoming(feature, layer) {
    var popupContent = ""
    if (feature.properties) {
        if (feature.properties.name) {
            popupContent += "<b>Name: </b>";
            popupContent += feature.properties.name;
        }
        if (feature.properties.description) {
            popupContent += "<br><b>Description: </b>";
            popupContent += feature.properties.description;
        }
        if (feature.properties.year) {
            popupContent += "<br><b>Year: </b>";
            popupContent += feature.properties.year;
        }
    }
    layer.bindPopup(popupContent);

    layer.on({
        mouseover: highlightFeatureUpcoming,
        mouseout: resetHighlightUpcoming,
    });
}

var upcomingLayer = new L.geoJSON(upcomingDict.data, {
    style: upcomingStyle,
    onEachFeature: onEachFeatureUpcoming,
})
if (upcomingDict.checked){
    layerGroup.addLayer(upcomingLayer);
}

// TRANSLINK MAJOR BIKE NETWORK  ===================================================
const translinkDict = settings.find(dict => dict.key === "translinkMBN");

var translinkStyle = {
    "color": translinkDict.color,
    "weight": lineWeight - 1,
    "opacity": lineOpacity + 0.2
};
var translinkHighlight = {
    "color": translinkDict.color,
    "weight": lineWeight,
    "opacity": lineOpacityHighlight + 0.2
};

function highlightFeatureTranslink(e) {
    var layer = e.target;
    layer.setStyle(translinkHighlight);
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}
function resetHighlightTranslink(e) {
    translinkLayer.resetStyle(e.target);
}

function onEachFeatureTranslink(feature, layer) {
    onEachFeaturePopup(feature, layer);

    layer.on({
        mouseover: highlightFeatureTranslink,
        mouseout: resetHighlightTranslink,
    });
}

var translinkLayer = new L.geoJSON(translinkDict.data, {
    style: translinkStyle,
    onEachFeature: onEachFeatureTranslink,
})
if (translinkDict.checked){
    layerGroup.addLayer(translinkLayer);
}

// METROVANCOUVER REGIONAL GREENWAYS NETWORK  ===================================================
const metrovanDict = settings.find(dict => dict.key === "metrovanGreen");

var metrovanStyle = {
    "color": metrovanDict.color,
    "weight": lineWeight - 1,
    "opacity": lineOpacity + 0.2
};
var metrovanHighlight = {
    "color": metrovanDict.color,
    "weight": lineWeight,
    "opacity": lineOpacityHighlight + 0.2
};

function highlightFeatureMetrovan(e) {
    var layer = e.target;
    layer.setStyle(metrovanHighlight);
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}
function resetHighlightMetrovan(e) {
    metrovanLayer.resetStyle(e.target);
}

function onEachFeatureMetrovan(feature, layer) {
    onEachFeaturePopup(feature, layer);

    layer.on({
        mouseover: highlightFeatureMetrovan,
        mouseout: resetHighlightMetrovan,
    });
}

var metrovanLayer = new L.geoJSON(metrovanDict.data, {
    style: metrovanStyle,
    onEachFeature: onEachFeatureMetrovan,
})
if (metrovanDict.checked){
    layerGroup.addLayer(metrovanLayer);
}

// TODO: add city plans


// ******** Existing Category: *********************************************************************************************
// LOW TRAFFIC STRESS BIKE DESIGNATED =========================================
// data source: OSM and Level of Traffic Stres BikeOttawa algorithm. in Notes "How to create LTS map:"
const designLowStressDict = settings.find(dict => dict.key === "designLowStress");

var lowStressStyle = {
    "color": designLowStressDict.color, // light blue
    "weight": lineWeight - 1,  // had to adjust opacity and then line width becuase data seems messy
    "opacity": lineOpacity + 0.2
};
var lowStressHighlight = {
    "color": designLowStressDict.color,
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

var lowStressLayer = new L.geoJSON(designLowStressDict.data, {
    style: lowStressStyle,
    onEachFeature: onEachFeatureLowStress,
})
if (designLowStressDict.checked){
    layerGroup.addLayer(lowStressLayer);
}

// HIGH TRAFFIC STRESS BIKE DESIGNATED =========================================
// data source: OSM and Level of Traffic Stres BikeOttawa algorithm. in Notes "How to create LTS map:"
const designHighStressDict = settings.find(dict => dict.key === "designHighStress");

var highStressStyle = {
    "color": designHighStressDict.color, // brown
    "weight": lineWeight - 1,
    "opacity": lineOpacity + 0.2
};
var highStressHighlight = {
    "color": designHighStressDict.color,
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

var highStressLayer = new L.geoJSON(designHighStressDict.data, {
    style: highStressStyle,
    onEachFeature: onEachFeatureHighStress,
})
if (designHighStressDict.checked){
    layerGroup.addLayer(highStressLayer);
}

// TRAIN STATIONS AND PARKADES =====================================================
// data source: OSM - in Notes "Overpass API" 
const trainParkadeDict = settings.find(dict => dict.key === "trainParkade");

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
    iconUrl: trainParkadeDict.icon,
    iconSize: [22, 22]
});
var parkadeIcon = L.icon({
    iconUrl: trainParkadeDict.icon1,
    iconSize: [22, 22]
});

var trainLayer = new L.geoJSON(trainParkadeDict.data, {
    onEachFeature: onEachFeatureTrain,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: trainIcon
        });
    }
});
var parkadeLayer = new L.geoJSON(trainParkadeDict.data1, {
    onEachFeature: onEachFeatureParkade,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: parkadeIcon
        });
    }
});
if (trainParkadeDict.checked){
    layerGroup.addLayer(trainLayer);
    layerGroup.addLayer(parkadeLayer);
}

// SCHOOLS =========================================================================
// data source: https://www.sd43.bc.ca/Schools/DistrictMap/Pages/default.aspx#/=
// (R script to convert from kml to geojson - HUBgapMap.R)
const schoolsDict = settings.find(dict => dict.key === "schools");

var schoolIcon = L.icon({
    iconUrl: schoolsDict.icon,
    iconSize: [22, 22], // size of the icon
});

var schoolLayer = new L.geoJSON(schoolsDict.data, {
    onEachFeature: onEachFeatureGeoJson,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: schoolIcon
        });
    }
});
if (schoolsDict.checked){
    layerGroup.addLayer(schoolLayer);
}

// GROCERY =========================================================================
// data source: TriCities Food Asset Map from the report produced by a consultant hired by city of Port Moody 
// https://www.google.com/maps/d/u/0/viewer?mid=1NY6gbgDuGzDOrFBa-RNHFzVd4PkRbHM0&ll=49.273934982609674%2C-122.7769743&z=13
// (R script to convert from kml to geojson - HUBgapMap.R)
const foodDict = settings.find(dict => dict.key === "food");

var foodIcon = L.icon({
    iconUrl: foodDict.icon,
    iconSize: [22, 22], // size of the icon
});

var foodLayer = new L.geoJSON(foodDict.data, {
    onEachFeature: onEachFeatureGeoJson,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: foodIcon
        });
    }
});
if (foodDict.checked){
    layerGroup.addLayer(foodLayer);
}

// ******** Community Feedback Category: **************************************************
// HUB Adopt-a-gap campain markers =========================================
// data source: https://bikehub.ca/get-involved/ungapthemap/adopt-gap
// to process - HUBgapMap.R
const adoptDict = settings.find(dict => dict.key === "adoptGap");

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
    iconUrl: adoptDict.icon,
    iconSize: [22, 22]
});

var adoptLayer = new L.geoJSON(adoptDict.data, {
    onEachFeature: onEachFeatureAdopt,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: adoptIcon
        });
    }
});
if (adoptDict.checked){
    layerGroup.addLayer(adoptLayer);
}

// HUB email =========================================
// data source: emails received from Colin F.
const HUBemailDict = settings.find(dict => dict.key === "HUBemail");

var HUBemailIcon = L.icon({
    iconUrl: HUBemailDict.icon,
    iconSize: [22, 22]
});

var HUBemailLayer = new L.geoJSON(HUBemailDict.data, {
    onEachFeature: onEachFeatureTriCityFix,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: HUBemailIcon
        });
    }
});
if (HUBemailDict.checked){
    layerGroup.addLayer(HUBemailLayer);
}

// Glenayre google my map data =========================================
// data source: email received from Colin F.
 const glenayreDict = settings.find(dict => dict.key === "glenayre");

// Function to style features based on color property
function glenayreStyleFeature(feature) {
  let color = feature.properties.color;
  // Add # if it's missing
  if (color && !color.startsWith("#")) {
    color = `#${color}`;
  }

  return {
    color: color || "#000000", // Default to black if color is missing
    weight: 5,
    opacity: 1
  };
}

// Function to handle popups
function glenayreOnEachFeature(feature, layer) {
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

    // Check if the feature has an image URL to display
    // console.log("DRAGANA:: glenayreOnEachFeature Enter: " + feature.geometry.type);
    if (feature.properties.local_image_path) {
        popupContent += '<img src="img/glenayre/' + feature.properties.local_image_path + '" width="200" />'; // Display image in popup
    }
    layer.bindPopup(popupContent);

    // layer.on({
    //     mouseover: highlightFeatureTop,
    //     mouseout: resetHighlightTop,
    // });
}

// Function to create appropriate Leaflet layer for each feature type
function glenayreCreateLayer(feature, latlng) {
    //console.log("DRAGANA:: Geometry Type: " + feature.geometry.type);
    //console.log("Feature:", feature);

  if (feature.geometry.type === "Point") {
    // For points, create a marker using the default icon
    // Create a resized version of the default Leaflet blue marker
    const resizedDefaultIcon = L.icon({
      iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png", // Default marker icon
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png", // Default shadow
      iconSize: [20, 32], // Adjust width and height (default is [25, 41])
      iconAnchor: [10, 32], // Adjust anchor point
      popupAnchor: [1, -30], // Adjust popup position
      shadowSize: [36, 36], // Adjust shadow size
      shadowAnchor: [12, 36] // Adjust shadow anchor
    });
    // Apply the resized icon to the marker
    const marker = L.marker(latlng, { icon: resizedDefaultIcon });
    glenayreOnEachFeature(feature, marker);
    return marker;

  } else if (feature.geometry.type === "LineString") {
    // For lines, create a polyline
    var polyline = L.polyline(latlng, glenayreStyleFeature(feature));
    glenayreOnEachFeature(feature, polyline);
    return polyline;
  }
  console.warn("glenayreCreateLayer::Unsupported geometry type:", feature.geometry.type);
  return null; // In case it's another geometry type
}

// Add GeoJSON layer to the map
var glenayreLayer = new L.geoJSON(glenayreDict.data, {
  pointToLayer: glenayreCreateLayer, // For point features
  // Apply styles to non-Point geometries (like LineString)
  style: function (feature) {
    if (feature.geometry.type === "LineString") {
      return glenayreStyleFeature(feature);
    }
    return {}; // Default style for unsupported geometries
  },
  onEachFeature: glenayreOnEachFeature // For all features to handle popups
});

if (glenayreDict.checked){
    layerGroup.addLayer(glenayreLayer);
}

// BIKEMAPS.ORG =========================================
// data source: received by email on Aug 7, 2021
const bikeMapsDict = settings.find(dict => dict.key === "bikeMaps");

var bikeMapsIcon = L.icon({
    iconUrl: bikeMapsDict.icon,
    iconSize: [22, 22]
});

var bikeMapLayer = new L.geoJSON(bikeMapsDict.data, {
    onEachFeature: onEachFeatureGeoJson,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: bikeMapsIcon
        });
    }
});
if (bikeMapsDict.checked){
    layerGroup.addLayer(bikeMapLayer);
}

// TriCityFix / WhatWeHeard map 
// data source: feedback received in TriCityFix app or tricitiesfix@gmail.com ====================
// todo: need to create one files for mulitple for each city. problem: "id" is not unique. also, how to keep track of photos? maybe just one geojson file?
const triCityFixDict = settings.find(dict => dict.key === "triCityFix");

function onEachFeatureTriCityFix(feature, layer) {
    const isEmail = feature.properties.email;  //"true/false"
    var popupContent = ""
    if (feature.properties) {
        // add type
        if (feature.properties.type) {
            popupContent += "<b>Type: </b>";
            popupContent += feature.properties.type;
        }
        // add location
        if (feature.properties.location) {
            popupContent += "<br><b>Location: </b>";
            popupContent += feature.properties.location;
        }
        // add description
        if (feature.properties.description) {
            popupContent += "<br><b>Description: </b>";
            popupContent += feature.properties.description;
        }
        // add date
        if (feature.properties.date) {
          popupContent += "<br><b>Date: </b>";
          dateProperty = feature.properties.date;
          var parts = dateProperty.split('-');
          // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
          // January - 0, February - 1, etc.
          var dateStr = new Date(parts[0], parts[1] - 1, parts[2]); 
          //console.log(dateStr.toDateString());
          popupContent += dateStr.toDateString();
        }
        // add photo(s)
        // remove white spaces in city if exist. no white spaces in photo names
        if (feature.properties.photo) {
            //console.log(city)
            popupContent += "<br><br>";
            if (isEmail === "true"){
                imageSrc = "img/HUBemail/"
            }else{
                imageSrc = "img/triCityFix/"
            }
            imageSrc += feature.properties.key + "/" + feature.properties.photo;
            popupContent += "<a href='" + imageSrc + "' target='_blank'><img src='" + imageSrc + "' width='148' height='100'></img></a>";
        }
        // add second photo if there's one
        if (feature.properties.photo1) {
            //console.log(city)
            popupContent += "<br><br>";
            if (isEmail === "true"){
                imageSrc = "img/HUBemail/"
            }else{
                imageSrc = "img/triCityFix/"
            }
            imageSrc += feature.properties.key + "/" + feature.properties.photo1;
            popupContent += "<a href='" + imageSrc + "' target='_blank'><img src='" + imageSrc + "' width='148' height='100'></img></a>";
        }
        // add if there's update
        if (feature.properties.descriptionUpdate) {
          popupContent += "<br>";
          popupContent += "<br><b>Update: </b>";
          popupContent += feature.properties.descriptionUpdate;
        }
        if (feature.properties.photoUpdate) {
          popupContent += "<br>";
          if (isEmail === "true"){
            imageSrc = "img/HUBemail/"
        }else{
            imageSrc = "img/triCityFix/"
        }
          imageSrc += feature.properties.key + "/" + feature.properties.photoUpdate;
          popupContent += "<a href='" + imageSrc + "' target='_blank'><img src='" + imageSrc + "' width='148' height='100'></img></a>";
        }
    }
    layer.bindPopup(popupContent);
}

var triCityFixIcon = L.icon({
    iconUrl: triCityFixDict.icon,
    iconSize: [22, 22]
});

var triCityFixLayer = new L.geoJSON(triCityFixDict.data, {
    onEachFeature: onEachFeatureTriCityFix,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: triCityFixIcon
        });
    }
});
if (triCityFixDict.checked){
    layerGroup.addLayer(triCityFixLayer);
}

// VeloCanadaBikes Pedal Poll
// data source: https://www.velocanadabikes.org/pedalpoll/pedal-poll-sondo-velo-2021-results/ ====================
const veloCanadaDict = settings.find(dict => dict.key === "veloCanada");

var pedalPollIcon = L.icon({
    iconUrl: veloCanadaDict.icon,
    iconSize: [22, 22]
});

var pedalPollLayer = new L.geoJSON(veloCanadaDict.data, {
    onEachFeature: onEachFeatureGeoJson,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: pedalPollIcon
        });
    }
});
if (veloCanadaDict.checked){
    layerGroup.addLayer(pedalPollLayer);
}

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
                // add Community Feedback note and colapse button
                //legendHtml += '<div class="button quiet col12">Community Feedback:</div>'
                legendHtml += '<div class="button quiet col12">Community Feedback:' + 
                '<div id="cfchevright" class="fill-darken2 icon chevronright button fr" style="padding: 0px; display: block"></div>' +
                '<div id="cfchevdown" class="fill-darken2 icon chevrondown button fr" style="padding: 0px; display: none"></div>' + 
                '</div>' +
                '<div id="commfeed" style="display: none">';  //start of Community Feedback div element that can collapse
            }
            if (setting.key == "veloCanada"){ //todo: this probably shouldn't be hardcoded
                legendHtml += '</div>' //end of Community Feedback  div that can collapse
                // add Planned note and colapse button
                legendHtml += '<div class="button quiet col12">Planned:' + 
                '<div id="plchevright" class="fill-darken2 icon chevronright button fr" style="padding: 0px; display: block"></div>' +
                '<div id="plchevdown" class="fill-darken2 icon chevrondown button fr" style="padding: 0px; display: none"></div>' + 
                '</div>' +
                '<div id="planned" style="display: none">';  //start of Planned div element that can collapse
            }
            if (setting.key == "metrovanGreen"){ //todo: this probably shouldn't be hardcoded
                legendHtml += '</div>' //end of Planned div that can collapse
                // add Existing category note and colapse button
                legendHtml += '<div class="button quiet col12">Existing infrastructure:' +
                '<div id="exchevright" class="fill-darken2 icon chevronright button fr" style="padding: 0px; display: none"></div>' +
                '<div id="exchevdown" class="fill-darken2 icon chevrondown button fr" style="padding: 0px; display: block"></div>' + 
                '</div>' +
                '<div id="existing" style="display: block">';  //start of Existing div element that can collapse
            }
            if (setting.key == "food"){ //todo: this probably shouldn't be hardcoded
                legendHtml += '</div>' //end of Existing div that can collapse
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
    legendIcon = setting.icon
    if (setting.iconLegend){
        legendIcon = setting.iconLegend
    }
    if (setting.type == "Point"){
        spanHtml = '<span style="display: inline-block;"><div style="display:flex; justify-content:center; align-items:center;">' + 
        '<img style="width:20px; height:20px;" src="'+ legendIcon +'"></img>&nbsp;'+ setting.title +'</div></span>'
    }
    if (setting.type == "Line/Point"){ // show just title
        spanHtml = '<span style="display:inline-block; width:1px; height:1px"></span>' +
        '&nbsp;' + setting.title
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

// show/hide Community Feedback section
document.getElementById('cfchevright').onclick = function () { toggleDisplay(['cfchevright', 'cfchevdown', 'commfeed']) };
document.getElementById('cfchevdown').onclick = function () { toggleDisplay(['cfchevright', 'cfchevdown', 'commfeed']) };

// show/hide Planned section
document.getElementById('plchevright').onclick = function () { toggleDisplay(['plchevright', 'plchevdown', 'planned']) };
document.getElementById('plchevdown').onclick = function () { toggleDisplay(['plchevright', 'plchevdown', 'planned']) };

// show/hide Existing section
document.getElementById('exchevright').onclick = function () { toggleDisplay(['exchevright', 'exchevdown', 'existing']) };
document.getElementById('exchevdown').onclick = function () { toggleDisplay(['exchevright', 'exchevdown', 'existing']) };


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
    if (checkbox.id == "HUBgapLine"){
        targetLayer = HUBallGapLayer
    }
    if (checkbox.id == "HUBgapPoint"){
        targetLayer = HUBhotspotLayer
    }
    if (checkbox.id == "ICBCcrashes"){
        //targetLayer = icbcLayer
        targetLayer = icbcCluster
    }
    if (checkbox.id == "designLowStress"){
        targetLayer = lowStressLayer
    }
    if (checkbox.id == "designHighStress"){
        targetLayer = highStressLayer
    }
    if (checkbox.id == "upcoming"){
        targetLayer = upcomingLayer
    }
    if (checkbox.id == "translinkMBN"){
        targetLayer = translinkLayer
    }
    if (checkbox.id == "metrovanGreen"){
        targetLayer = metrovanLayer
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
    if (checkbox.id == "HUBemail"){
        targetLayer = HUBemailLayer
    }
    if (checkbox.id == "glenayre"){
        targetLayer = glenayreLayer
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