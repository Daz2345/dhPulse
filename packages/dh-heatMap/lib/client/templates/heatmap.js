Template.heatMap.rendered = function() {

    var hmValues = this.data.heatMapData
        
    this.autorun(function () {
        if (Mapbox.loaded('markercluster', 'locate', 'fullscreen')) {
            L.mapbox.accessToken = 'pk.eyJ1IjoiZGF6MjM0NSIsImEiOiJmNDkwNmQ2NjllNzg5NDFiZWQ1M2I0OGUxMzBmZGU3MSJ9.W70b10qRbEkzfJdlKP6Fhw';
            var geocoder = L.mapbox.geocoder('mapbox.places'),
                map = L.mapbox.map('map', null, {
                tileLayer: {format: 'jpg70',
                // This map option disables world wrapping. by default, it is false.
                continuousWorld: false,
                // This option disables loading tiles outside of the world bounds.
                noWrap: true}
            })
                .setView([54.104, -2.921], 6);

        var layers = {
              Streets: L.mapbox.tileLayer('mapbox.streets'),
              Outdoors: L.mapbox.tileLayer('mapbox.outdoors'),
              Satellite: L.mapbox.tileLayer('mapbox.satellite'),
              Pirates: L.mapbox.tileLayer('mapbox.pirates')
          };
    
        layers.Streets.addTo(map);
        L.control.layers(layers).addTo(map);
        L.control.locate().addTo(map);
        L.control.fullscreen().addTo(map);        

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