mapboxgl.accessToken = 'pk.eyJ1IjoiZmFicmljaW9hbW9yaW0iLCJhIjoiY2tsaWNsOHRkMmgwaDJucGN0NGJhd3psOSJ9.h665zPxHXNFNVIzh1cJeUQ';

navigator.geolocation.getCurrentPosition( function(position) {
  var lng = position.coords.longitude;
  var lat = position.coords.latitude;
  mapboxgl.accessToken = mapboxgl.accessToken;
  sessionStorage.setItem("lng", lng);
  sessionStorage.setItem("lat", lat);
  const map = new mapboxgl.Map({
    style: 'mapbox://styles/mapbox/light-v10',
    center: [lng, lat], //longitude, latitude
    zoom: 21,
    pitch: 80,
    bearing: 0,
    container: 'map',
    antialias: false,
    attributionControl:false,
  });

  var basemapSelector = document.getElementById('basemap-selector');
  basemapSelector.addEventListener('change', function () {
    var basemap = basemapSelector.value;
    map.setStyle(basemap);
  });


  var pitchSlider = document.getElementById('pitch-slider');
  pitchSlider.addEventListener('input', function () {
    var pitch = Number(pitchSlider.value);
    map.setPitch(pitch);
  });

  var bearingSlider = document.getElementById('bearing-slider');
  bearingSlider.addEventListener('input', function () {
    var bearing = Number(bearingSlider.value);
    map.setBearing(bearing);
  });

  map.on('load', () => {
      // Add a custom layer that uses
      // a vector tileset source.
      map.addLayer({
          id: 'triangles',
          source: {
              type: 'vector',
              url: 'mapbox://examples.ckv9z0wgf5v7c27p7me2mf0l9-9wrve' // custom tileset
          },
          'source-layer': 'triangles',
          type: 'fill'
      });
  });

  const swatches = document.getElementById('swatches');
  const layer = document.getElementById('layer');
  const colors = [
      '#ffffcc',
      '#a1dab4',
      '#41b6c4',
      '#2c7fb8',
      '#253494',
      '#fed976',
      '#feb24c',
      '#fd8d3c',
      '#f03b20',
      '#bd0026',
      '#000000',
      '#FFFFFF',
  ];

  for (const color of colors) {
      const swatch = document.createElement('button');
      swatch.style.backgroundColor = color;
      swatch.addEventListener('click', () => {
          map.setPaintProperty(layer.value, 'fill-color', color);
      });
      swatches.appendChild(swatch);
  }

map.addControl(new mapboxgl.AttributionControl({
    compact: true
  }), 'bottom-right')

  map.on('load', function () {
       map.addSource('layer1', {
           type: 'geojson',
           data: './Geojson/RU.geojson'
       });

       map.addLayer({
           id: 'layer1',
           type: 'fill',
           source: 'layer1',
           paint: {
               'fill-color': '#f00',
               'fill-opacity': 0.5
           },
           layout: {
               'visibility': 'visible'
           }
       });

       map.addSource('layer2', {
           type: 'geojson',
           data: 'path/to/Correios.geojson',
       });

       map.addLayer({
           id: 'layer2',
           type: 'line',
           source: 'layer2',
           paint: {
               'line-color': '#00f',
               'line-width': 2
           },
           layout: {
               'visibility': 'none'
           }
       });

       var layerRadioButtons = document.getElementsByName('camada');

       for (var i = 0; i < layerRadioButtons.length; i++) {
           layerRadioButtons[i].addEventListener('change', function() {
               var layerId = this.value;
               map.setLayoutProperty('layer1', 'visibility', layerId === 'layer1' ? 'visible' : 'none');
               map.setLayoutProperty('layer2', 'visibility', layerId === 'layer2' ? 'visible' : 'none');
           });
       }
   });



direction = new MapboxDirections({
  accessToken: mapboxgl.accessToken,
  language: 'pt-BR',
  showCompass: true,
  geometry: 'polyline',
  unit: 'metric',
  profile: 'mapbox/walking',
  language: 'pt-BR',
  placeholderOrigin: 'Origem',
  placeholderDestination: 'Destino',
  controls: {
      profileSwitcher: false,
      instructions: false,
  },
});

map.on('load', function() {
  var direction = new MapboxDirections({
    accessToken: mapboxgl.accessToken
  });
  direction.setOrigin([lng,lat]);
});

document.getElementById('direction').appendChild(direction.onAdd(map));

// an arbitrary start will always be the same
// only the end or destination will change
const start = [lng, lat];

// create a function to make a directions request
async function getRoute(end) {
  // make directions request using cycling profile
  const query = await fetch(
    `https://api.mapbox.com/directions/v5/mapbox/walking/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
    { method: 'GET' }
  );
  const json = await query.json();
  const data = json.routes[0];
  const route = data.geometry.coordinates;
  const geojson = {
    'type': 'Feature',
    'properties': {},
    'geometry': {
      'type': 'LineString',
      'coordinates': route
    }
  };

  // if the route already exists on the map, we'll reset it using setData
  if (map.getSource('route')) {
    map.getSource('route').setData(geojson);
  }
  // otherwise, we'll make a new request
  else {
    map.addLayer({
      'id': 'route',
      'type': 'line',
      'source': {
        'type': 'geojson',
        'data': geojson
      },
      'layout': {
        'line-join': 'round',
        'line-cap': 'round'
      },
      'paint': {
        'line-color': '#3887be',
        'line-width': 0,
        'line-opacity': 0.75
      }
    });
  }

//			document.getElementById("orig").textContent = JSON.stringify(geojson, undefined, 2);

  // get the sidebar and add the instructions
  const instructions = document.getElementById('instructions');
  const steps = data.legs[0].steps;
  let tripInstructions = '';
  for (const step of steps) {
    tripInstructions += `<li>${step.maneuver.instruction}</li>`;
  }
  instructions.innerHTML = `<p><strong>Trip duration: ${Math.floor(
    data.duration / 60
  )} min 🚴 </strong></p><ol>${tripInstructions}</ol>`;
}

map.on('load', () => {
  // make an initial directions request that
  // starts and ends at the same location
  getRoute(start);

  // Add destination to the map
  map.addLayer({
    'id': 'point',
    'type': 'circle',
    'source': {
      'type': 'geojson',
      'data': {
        'type': 'FeatureCollection',
        'features': [
          {
            'type': 'Feature',
            'properties': {},
            'geometry': {
              'type': 'Point',
              'coordinates': start
            }
          }
        ]
      }
    },
    'paint': {
      'circle-radius': 0,
      'circle-color': '#3887be'
    }
  });

  // allow the user to click the map to change the destination
  map.on('click', (event) => {
    const coords = Object.keys(event.lngLat).map(
      (key) => event.lngLat[key]
    );
    const end = {
      'type': 'FeatureCollection',
      'features': [
        {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'Point',
            'coordinates': coords
          }
        }
      ]
    };
    if (map.getLayer('end')) {
      map.getSource('end').setData(end);
    } else {
      map.addLayer({
        'id': 'end',
        'type': 'circle',
        'source': {
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': [
              {
                'type': 'Feature',
                'properties': {},
                'geometry': {
                  'type': 'Point',
                  'coordinates': coords
                }
              }
            ]
          }
        },
        'paint': {
          'circle-radius': 0,
          'circle-color': '#f30'
        }
      });
    }
    getRoute(coords);
  });
});

var nav = new mapboxgl.NavigationControl();
        map.addControl(nav, 'top-left');

map.addControl(new mapboxgl.FullscreenControl());

var geolocate = new mapboxgl.GeolocateControl();
map.addControl(
    geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
    enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserHeading: true,
  })
);




map.on('load', () => {
    // Insert the layer beneath any symbol layer.
    const layers = map.getStyle().layers;
    const labelLayerId = layers.find(
        (layer) => layer.type === 'symbol' && layer.layout['text-field']
    ).id;
    geolocate.trigger();

    map.addLayer(
        {
            'id': 'add-3d-buildings',
            'source': 'composite',
            'source-layer': 'building',
            'filter': ['==', 'extrude', 'true'],
            'type': 'fill-extrusion',
            'minzoom': 20,
            'paint': {
                'fill-extrusion-color': '#aaa',
                'fill-extrusion-height': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    15,
                    0,
                    15.05,
                    ['get', 'height']
                ],
                'fill-extrusion-base': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    15,
                    0,
                    15.05,
                    ['get', 'min_height']
                ],
                'fill-extrusion-opacity': 0.6
            } },
        labelLayerId
    );
  });
});
