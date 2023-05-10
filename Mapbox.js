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
    zoom: 20,
    pitch: 60,
    bearing: -60,
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
      '#bd0026'
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

   const geojson = {
      'type': 'FeatureCollection',
      'features': [
        {
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [-49.235028, -25.449557]
          },
          'properties': {
            'title': 'RU',
            'description': 'Restaurante Universitário'
          }
        },

      ]
    };

    const geojson1 = {
      'type': 'FeatureCollection',
      'features': [
        {
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [-49.229949, -25.451687]
          },
          'properties': {
            'title': 'Mapbox',
            'description': 'Portaria'
          }
        },
        {
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [-49.232931, -25.453522]
          },
          'properties': {
            'title': 'Mapbox',
            'description': 'Portaria'
          }
        },
        {
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [-49.230441, -25.449003]
          },
          'properties': {
            'title': 'Mapbox',
            'description': 'Portaria'
          }
        }
      ]
    };


    const geojson2 = {
      'type': 'FeatureCollection',
      'features': [
        {
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [-49.232580, -25.453163]
          },
          'properties': {
            'title': 'Ponto de Ônibus',
            'description': 'Ponto de Ônibus'
          }
        },
        {
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [-49.232136, -25.449854]
          },
          'properties': {
            'title': 'Ponto de Ônibus',
            'description': 'Ponto de Ônibus'
          }
        },
        {
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [-49.231291, -25.450282]
          },
          'properties': {
            'title': 'Ponto de Ônibus',
            'description': 'Ponto de Ônibus'
          }
        },
        {
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [-49.231550, -25.450184]
          },
          'properties': {
            'title': 'Ponto de Ônibus',
            'description': 'Ponto de Ônibus'
          }
        }
      ]
    };

         const geojson3 = {
      'type': 'FeatureCollection',
      'features': [
        {
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [-49.234099, -25.44999]
          },
          'properties': {
            'title': 'Correios',
            'description': 'Correios'
          }
        },
      ]
    };

     const geojson4 =   {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            -49.233085960737924,
            -25.453344376797858
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            -49.23354358116649,
            -25.453187921663584
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            -49.23282382864804,
            -25.453051524714468
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            -49.23257058239133,
            -25.4525661107876
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            -49.23213331089232,
            -25.453098276993444
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            -49.23144208152905,
            -25.451743710824402
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            -49.23181972945565,
            -25.451839992085638
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            -49.233814601085186,
            -25.452473841045702
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            -49.233485825243434,
            -25.451787838988665
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            -49.233112620233754,
            -25.45097345720221
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            -49.23224625146139,
            -25.451860049915567
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            -49.23196634770443,
            -25.451254279129785
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            -49.23080230869519,
            -25.451559174926842
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            -49.232333417311594,
            -25.45015945481181
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            -49.23350634734177,
            -25.450785289871703
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            -49.23358325450266,
            -25.449893455622558
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            -49.233712099088876,
            -25.4498493260068
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            -49.234609568278984,
            -25.450045903260985
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            -49.23063575000012,
            -25.44960241230737
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            -49.231398728557224,
            -25.44807491690277
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            -49.231660321594376,
            -25.447630050165046
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            -49.2336527885561,
            -25.44729147791888
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            -49.23665128297114,
            -25.452082228467205
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            -49.236088857942406,
            -25.45103505227719
          ],
          "type": "Point"
        }
      }
    ]
  }

    // add markers to map
    for (const feature of geojson.features) {
      // create a HTML element for each feature
      const el = document.createElement('div');
      el.className = 'marker';

      // make a marker for each feature and add it to the map
      new mapboxgl.Marker(el)
        .setLngLat(feature.geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
              `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
            )
        )
        .addTo(map);
    }

          // add markers to map
    for (const feature of geojson1.features) {
      // create a HTML element for each feature
      const el = document.createElement('div');
      el.className = 'marker1';

      // make a marker for each feature and add it to the map
      new mapboxgl.Marker(el)
        .setLngLat(feature.geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
              `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
            )
        )
        .addTo(map);
    }
          // add markers to map
    for (const feature of geojson2.features) {
      // create a HTML element for each feature
      const el = document.createElement('div');
      el.className = 'marker2';

      // make a marker for each feature and add it to the map
      new mapboxgl.Marker(el)
        .setLngLat(feature.geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
              `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
            )
        )
        .addTo(map);
    }

    for (const feature of geojson3.features) {
      // create a HTML element for each feature
      const el = document.createElement('div');
      el.className = 'marker3';

      // make a marker for each feature and add it to the map
      new mapboxgl.Marker(el)
        .setLngLat(feature.geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
              `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
            )
        )
        .addTo(map);
    }

     for (const feature of geojson4.features) {
      // create a HTML element for each feature
      const el = document.createElement('div');
      el.className = 'marker4';

      // make a marker for each feature and add it to the map
      new mapboxgl.Marker(el)
        .setLngLat(feature.geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
              `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
            )
        )
        .addTo(map);
    }
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
