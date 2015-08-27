Template.heatMap.rendered = function() {

    var hmValues = this.data.heatMapData
        
    this.autorun(function () {
        if (Mapbox.loaded('markercluster', 'zoomslider')) {
            L.mapbox.accessToken = 'pk.eyJ1IjoiZGF6MjM0NSIsImEiOiJmNDkwNmQ2NjllNzg5NDFiZWQ1M2I0OGUxMzBmZGU3MSJ9.W70b10qRbEkzfJdlKP6Fhw';
            var geocoder = L.mapbox.geocoder('mapbox.places'),
                map = L.mapbox.map('map', 'mapbox.streets', {
                zoomControl: false
            })
                .setView([54.104, -2.921], 6);
    
        // geocoder.query('UK', showMap);
    
        // function showMap(err, data) {
        //     map.setView([data.latlng[0], data.latlng[1]], 6);
        // }
    
        L.control.zoomslider().addTo(map);
    
        var hmData = Papa.parse(hmValues).data;            
        var markers = new L.MarkerClusterGroup();

        for (var i = 0; i < hmData.length; i++) {
            var a = hmData[i];
            var title = a[2];
            var marker = L.marker(new L.LatLng(a[0], a[1]), {
                title: title
            });
            marker.bindPopup(title);
            markers.addLayer(marker);
        }
        map.addLayer(markers);
        }
    });    
};


// Template.heatMapPostCode.rendered = function() {

//     var hmValues = this.data.heatMapData
        
//     this.autorun(function () {
//         if (Mapbox.loaded('markercluster', 'zoomslider')) {
//             L.mapbox.accessToken = 'pk.eyJ1IjoiZGF6MjM0NSIsImEiOiJmNDkwNmQ2NjllNzg5NDFiZWQ1M2I0OGUxMzBmZGU3MSJ9.W70b10qRbEkzfJdlKP6Fhw';
//             var geocoder = L.mapbox.geocoder('mapbox.places'),
//                 map = L.mapbox.map('map', 'mapbox.streets', {
//                 zoomControl: false
//             });
//                 // .setView([54.104, -2.921], 6);
    
//         geocoder.query('UK', showMap);
    
//         function showMap(err, data) {
//             // The geocoder can return an area, like a city, or a
//             // point, like an address. Here we handle both cases,
//             // by fitting the map bounds to an area or zooming to a point.
//             if (data.lbounds) {
//                 map.fitBounds(data.lbounds);
//             } else if (data.latlng) {
//                 map.setView([data.latlng[0], data.latlng[1]], 6);
//             }
//         }
    
//         L.control.zoomslider().addTo(map);
    
//         var hmData = Papa.parse(hmValues).data;            
//         var markers = new L.MarkerClusterGroup();

//         for (var i = 0; i < hmData.length; i++) {
//             var a = hmData[i];
//             var title = a[1];
//             var latVal, lonVal
            
//             geocoder.query(a[0], getGeo)
//         function getGeo(err, data) {
//             var marker = L.marker(new L.LatLng(data.latlng[0], data.latlng[1]), {
//                 title: title
//             });
//             marker.bindPopup(title);
//             markers.addLayer(marker);
//         }    
//         }
//         map.addLayer(markers);
//         }
//     });    
// }