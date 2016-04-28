Template.heatMap.rendered = function() {

    Mapbox.load({
        // plugins: ['markercluster', 'locate', 'fullscreen']
        plugins: ['markercluster']
    });

    Session.set('sortOrder', false);

    var hmValues = this.data.heatMapData;

    Meteor.autorun(function() {

        // if (Mapbox.loaded('markercluster', 'locate', 'fullscreen')) {
        if (Mapbox.loaded('markercluster')) {
            // personal accessToken - needs to be updated for production purposes!!
            L.mapbox.accessToken = 'pk.eyJ1IjoiZGF6MjM0NSIsImEiOiJmNDkwNmQ2NjllNzg5NDFiZWQ1M2I0OGUxMzBmZGU3MSJ9.W70b10qRbEkzfJdlKP6Fhw';
            // var geocoder = L.mapbox.geocoder('mapbox.places'),
            var map = L.mapbox.map('map', null, {
                    // This map option disables world wrapping. by default, it is false.
                    continuousWorld: false,
                    // This option disables loading tiles outside of the world bounds.
                    noWrap: true
                });

            // map.scrollWheelZoom.disable();
            // add the ability to change map layer
            var layers = {
                Streets: L.mapbox.tileLayer('mapbox.streets'),
            //     Outdoors: L.mapbox.tileLayer('mapbox.outdoors'),
            //     Satellite: L.mapbox.tileLayer('mapbox.satellite')
            };

            layers.Streets.addTo(map);
            // L.control.layers(layers).addTo(map);
            // L.control.locate().addTo(map);
            // L.control.fullscreen().addTo(map);

            // extract data out of string
            var hmData = Papa.parse(hmValues).data;
            // create cluster layer
            var markers = new L.MarkerClusterGroup({
                chunkedLoading: true,
                spiderfyOnMaxZoom: false,
                zoomToBoundsOnClick: false
            });

            // for each data point in the heatMapData array create a marker and add it to the markers layer
            for (var i = 0; i < hmData.length; i++) {
                var a = hmData[i];
                var marker = L.marker(new L.LatLng(a[0], a[1]), {
                    // Can enter multiple custom data points within the object
                    customTitle: a[2]
                }).addTo(markers);
                marker.bindPopup(a[2]);
            }

            // on 'clicking' a cluster check the boundary of the markers - if the markers have many locations zoom in
            // if the marker cluster has a single location - spread out the markers in spiderfy layout
            markers.on('clusterclick', function(a) {
                // basicaly size of square
                var sizeOfBound = (a.layer._bounds._northEast.lat - a.layer._bounds._southWest.lat) + (a.layer._bounds._northEast.lng - a.layer._bounds._southWest.lng);
                (sizeOfBound !== 0) ? a.layer.zoomToBounds() : a.layer.spiderfy();
            });
            // fit the map viewpoint to the markers bounds
            map.fitBounds(markers.getBounds());
            map.addLayer(markers);
            
            // List on right hand side
            // var InViewTable = document.getElementById('InViewTable');
            // CreateList();

            // map.on('move', function() {
            //     CreateList();
            // });

            // function CreateList() {
            //     // Construct an empty list to fill with onscreen markers.
            //     var inBounds = [];
            //     // Get the map bounds - the top-left and bottom-right locations.
            //     var bounds = map.getBounds();
            //     // For each marker, consider whether it is currently visible by comparing
            //     // with the current map bounds.
            //     markers.eachLayer(function(marker) {
            //         if (bounds.contains(marker.getLatLng())) {
            //             inBounds.push(marker);
            //         }
            //     });
            //     // sort the markers by function sortBy                
            //     inBounds.sort(sortBy);                
            //     // switch sort if toggled
            //     if (Session.get('sortOrder')) 
            //         inBounds.reverse();
            //     InViewTable.innerHTML = "";                      
            //     // Create the li elements - 1 for each store
            //     inBounds.map(function(marker, id) {
            //         var item = InViewTable.appendChild(document.createElement('li'));
            //         item.innerHTML = (id + 1) + "). " + marker.options.customTitle + " " + marker.options.feedbackCount;
            //         // desktop mouse clicks
            //         item.onclick = function() {
            //             map.setView(marker._latlng, 19);
            //         };
            //         // mobile touch
            //         item.ontouchstart = function() {
            //             map.setView(marker._latlng, 19);
            //         };
            //     });
            // }

            // $(".switch-input").click(function() {
            //     Session.set('sortOrder', !Session.get('sortOrder'));
            //     CreateList();
            // });
        }
        
    });
};

// function sortBy(a, b) {
//     return b.options.feedbackCount - a.options.feedbackCount;
// }

// Template.stockalertsMap.onCreated = function() {
    
//     var hmValues = Posts.find({_id: 'MsYXFCBQEn8DjsFnY'}).heatMapData;

//     Meteor.autorun(function() {

//         if (Mapbox.loaded('markercluster', 'locate', 'fullscreen')) {
//             // personal accessToken - needs to be updated for production purposes!!
//             L.mapbox.accessToken = 'pk.eyJ1IjoiZGF6MjM0NSIsImEiOiJmNDkwNmQ2NjllNzg5NDFiZWQ1M2I0OGUxMzBmZGU3MSJ9.W70b10qRbEkzfJdlKP6Fhw';
//             var geocoder = L.mapbox.geocoder('mapbox.places'),
//                 map = L.mapbox.map('map', null, {
//                     // This map option disables world wrapping. by default, it is false.
//                     continuousWorld: false,
//                     // This option disables loading tiles outside of the world bounds.
//                     noWrap: true
//                 });

//             // map.scrollWheelZoom.disable();
//             // add the ability to change map layer
//             var layers = {
//                 Streets: L.mapbox.tileLayer('mapbox.streets'),
//                 Outdoors: L.mapbox.tileLayer('mapbox.outdoors'),
//                 Satellite: L.mapbox.tileLayer('mapbox.satellite')
//             };

//             layers.Streets.addTo(map);
//             L.control.layers(layers).addTo(map);
//             L.control.locate().addTo(map);
//             L.control.fullscreen().addTo(map);

//             // extract data out of string
//             var hmData = Papa.parse(hmValues).data;
//             // create cluster layer
//             var markers = new L.MarkerClusterGroup({
//                 chunkedLoading: true,
//                 spiderfyOnMaxZoom: false,
//                 zoomToBoundsOnClick: false
//             });

//             // for each data point in the heatMapData array create a marker and add it to the markers layer
//             for (var i = 0; i < hmData.length; i++) {
//                 var a = hmData[i];
//                 var marker = L.marker(new L.LatLng(a[0], a[1]), {
//                     // Can enter multiple custom data points within the object
//                     customTitle: a[2]
//                 }).addTo(markers);
//                 marker.bindPopup(a[2]);
//             }

//             // on 'clicking' a cluster check the boundary of the markers - if the markers have many locations zoom in
//             // if the marker cluster has a single location - spread out the markers in spiderfy layout
//             markers.on('clusterclick', function(a) {
//                 // basicaly size of square
//                 var sizeOfBound = (a.layer._bounds._northEast.lat - a.layer._bounds._southWest.lat) + (a.layer._bounds._northEast.lng - a.layer._bounds._southWest.lng);
//                 (sizeOfBound !== 0) ? a.layer.zoomToBounds() : a.layer.spiderfy();
//             });
//             // fit the map viewpoint to the markers bounds
//             map.fitBounds(markers.getBounds());
//             map.addLayer(markers);
            
//             // List on right hand side
//             // var InViewTable = document.getElementById('InViewTable');
//             // CreateList();

//             // map.on('move', function() {
//             //     CreateList();
//             // });

//             // function CreateList() {
//             //     // Construct an empty list to fill with onscreen markers.
//             //     var inBounds = [];
//             //     // Get the map bounds - the top-left and bottom-right locations.
//             //     var bounds = map.getBounds();
//             //     // For each marker, consider whether it is currently visible by comparing
//             //     // with the current map bounds.
//             //     markers.eachLayer(function(marker) {
//             //         if (bounds.contains(marker.getLatLng())) {
//             //             inBounds.push(marker);
//             //         }
//             //     });
//             //     // sort the markers by function sortBy                
//             //     inBounds.sort(sortBy);                
//             //     // switch sort if toggled
//             //     if (Session.get('sortOrder')) 
//             //         inBounds.reverse();
//             //     InViewTable.innerHTML = "";                      
//             //     // Create the li elements - 1 for each store
//             //     inBounds.map(function(marker, id) {
//             //         var item = InViewTable.appendChild(document.createElement('li'));
//             //         item.innerHTML = (id + 1) + "). " + marker.options.customTitle + " " + marker.options.feedbackCount;
//             //         // desktop mouse clicks
//             //         item.onclick = function() {
//             //             map.setView(marker._latlng, 19);
//             //         };
//             //         // mobile touch
//             //         item.ontouchstart = function() {
//             //             map.setView(marker._latlng, 19);
//             //         };
//             //     });
//             // }

//             // $(".switch-input").click(function() {
//             //     Session.set('sortOrder', !Session.get('sortOrder'));
//             //     CreateList();
//             // });
//         }
//     });
// };

// function sortBy(a, b) {
//     return b.options.feedbackCount - a.options.feedbackCount;
// }


// Template.heatMap.rendered = function() {

//     Mapbox.load({
//         gl: true
//     });

//     Session.set('sortOrder', false);

//     Meteor.autorun(function() {
//         if (Mapbox.loaded()) {
//             mapboxgl.accessToken = 'pk.eyJ1IjoiZGF6MjM0NSIsImEiOiJjaW5rNmd4NXkwMDZvdzdrbDFqeTltdW1oIn0.9YeTD3S8dV4U8Dl3nGigbA';
//             var map = new mapboxgl.Map({
//                 container: 'map', // container id
//                 style: 'mapbox://styles/mapbox/streets-v8', //stylesheet location
//                 center: [-74.50, 40], // starting position
//                 zoom: 9 // starting zoom
//             });
//         }
//     });
// };