Template.heatMap.rendered = function() {

    var hmValues = this.data.heatMapData;

    Meteor.autorun(function () {

        if (Mapbox.loaded('markercluster', 'locate', 'fullscreen')) {
            L.mapbox.accessToken = 'pk.eyJ1IjoiZGF6MjM0NSIsImEiOiJmNDkwNmQ2NjllNzg5NDFiZWQ1M2I0OGUxMzBmZGU3MSJ9.W70b10qRbEkzfJdlKP6Fhw';
            var geocoder = L.mapbox.geocoder('mapbox.places'),
                map = L.mapbox.map('map', null, {
                format: 'jpg70',    
                // This map option disables world wrapping. by default, it is false.
                continuousWorld: true,
                // This option disables loading tiles outside of the world bounds.
                noWrap: true
            });

        // map.scrollWheelZoom.disable();
        
        var layers = {
              Streets: L.mapbox.tileLayer('mapbox.streets', {format: 'jpg70'}),
              Outdoors: L.mapbox.tileLayer('mapbox.outdoors', {format: 'jpg70'}),
              Satellite: L.mapbox.tileLayer('mapbox.satellite', {format: 'jpg70'}),
              Pirates: L.mapbox.tileLayer('mapbox.pirates', {format: 'jpg70'})
          };
    
        layers.Streets.addTo(map);
        L.control.layers(layers).addTo(map);
        L.control.locate().addTo(map);
        L.control.fullscreen().addTo(map);        

        var hmData = Papa.parse(hmValues).data;    
        var markers = new L.MarkerClusterGroup({ spiderfyOnMaxZoom: false, zoomToBoundsOnClick: false }).addTo(map);            

        for (var i = 0; i < hmData.length; i++) {
            var a = hmData[i];
            var marker = L.marker(new L.LatLng(a[0], a[1]), {
                // title: a[2]
            }).addTo(markers);
            marker.bindPopup(a[2]);
        }
        
        markers.on('clusterclick', function (a) {
            var sizeOfBound = (a.layer._bounds._northEast.lat - a.layer._bounds._southWest.lat) + (a.layer._bounds._northEast.lng - a.layer._bounds._southWest.lng);
            if (sizeOfBound !== 0) {
                a.layer.zoomToBounds();
            } else {
		        a.layer.spiderfy();
            }
		});
        map.fitBounds(markers.getBounds());
        }        
    }); 

};