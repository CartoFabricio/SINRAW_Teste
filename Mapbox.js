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
    zoom: 19,
    pitch: 80,
    bearing: 0,
    container: 'map',
    antialias: false,
    attributionControl:false,
  });
	map.on('style.load', () => {
        map.setFog({}); // Set the default atmosphere style
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

	// Create marker arrays for each layer
  var layer1Markers = [
      {
          coordinates: [-49.232580, -25.453163],
          color: '#000000',
          size: 20
      },
     {
          coordinates: [-49.232136, -25.449854],
          color: '#000000',
          size: 20
      },
  ];

  var layer2Markers = [
      {
          coordinates: [-49.229949, -25.451687],
          color: '#000000',
          size: 20,
      },
    {
          coordinates: [-49.232931, -25.453522],
          color: '#000000',
          size: 20,
      },
    {
          coordinates: [-49.230441, -25.449003],
          color: '#000000',
          size: 20,
      },
  ];

  var layer3Markers = [
      {
          coordinates: [-49.235028, -25.449557],
          color: '#000000',
          size: 20
      },
  ];

  var layer4Markers = [
      {
          coordinates: [-49.234099, -25.44999],
          color: '#000000',
          size: 20
      },
  ];

  function addMarkerLayer(markers, layerId) {
      markers.forEach(function(marker, index) {
          var el = document.createElement('div');
          el.className = 'marker ' + layerId;
          el.style.color = marker.color;
          el.style.fontSize = marker.size + 'px';
          el.style.lineHeight = marker.size + 'px';
          el.style.cursor = 'pointer';

          // Set marker content based on the layerId
          switch (layerId) {
              case 'layer1':
                  el.innerHTML = '<i class="fas fa-bus"></i>'; // Bus symbol
                  break;
              case 'layer2':
                  el.innerHTML = '<i class="fas fa-school"></i>'; // School symbol
                  break;
              case 'layer3':
                  el.innerHTML = '<i class="fas fa-utensils"></i>'; // Food symbol
                  break;
               case 'layer4':
                  el.innerHTML = '<i class="fas fa-envelope"></i>'; // Correios symbol
                  break;
              default:
                  break;
          }

          new mapboxgl.Marker(el)
              .setLngLat(marker.coordinates)
              .addTo(map)
              .getElement()
              .addEventListener('click', function() {
                  // Handle marker click event if needed
                  console.log('Marker clicked: Layer ' + layerId + ', Index ' + index);
              });
      });
  }

  addMarkerLayer(layer1Markers, 'layer1');
  addMarkerLayer(layer2Markers, 'layer2');
  addMarkerLayer(layer3Markers, 'layer3');
  addMarkerLayer(layer4Markers, 'layer4');

  // Bind event listeners to layer controls
  var layerSelect = document.getElementById('layer-select');
  var swatches1 = document.getElementById('swatches1');
  var iconSizeInput = document.getElementById('icon-size');

  layerSelect.addEventListener('change', function() {
      var selectedLayer = layerSelect.value;

      // Update marker colors for the selected layer
      var markers = document.getElementsByClassName(selectedLayer);
      Array.from(markers).forEach(function(marker) {
          marker.style.background = layerColorInput.value;
      });

      // Update marker sizes for the selected layer
      iconSizeInput.removeEventListener('input', handleIconSizeChange);
      iconSizeInput.value = 20;
      iconSizeInput.addEventListener('input', handleIconSizeChange);
  });

  function changeMarkerColor(color) {
      var selectedLayer = layerSelect.value;

      // Update marker colors for the selected layer
      var markers = document.getElementsByClassName(selectedLayer);
      Array.from(markers).forEach(function(marker) {
          marker.style.color = color;
      });
  }

  // Function to create a color swatch
  function createSwatch(color) {
      const swatch = document.createElement('div');
      swatch.className = 'swatch';
      swatch.style.backgroundColor = color;
      swatch.addEventListener('click', () => {
          changeMarkerColor(color);
      });
      return swatch;
  }

  const colors = ['#ffffcc', '#a1dab4', '#41b6c4', '#2c7fb8', '#253494','#fed976', '#feb24c', '#fd8d3c', '#f03b20', '#bd0026'];

  // Create color swatches and set event listeners
  for (const color of colors) {
      const swatch = createSwatch(color);
                  swatches1.appendChild(swatch);
  }

  function handleIconSizeChange() {
      var size = parseFloat(iconSizeInput.value);
      var selectedLayer = layerSelect.value;
      // Update marker sizes for the selected layer
      var markers = document.getElementsByClassName(selectedLayer);
      Array.from(markers).forEach(function(marker) {
          marker.style.fontSize = size + 'px';
          marker.style.lineHeight = size + 'px';
      });
  }

  iconSizeInput.addEventListener('input', handleIconSizeChange);

  // Update initial marker sizes based on the default layer selection and size
  var initialSelectedLayer = layerSelect.value;
  var initialSize = parseFloat(iconSizeInput.value);
  var initialMarkers = document.getElementsByClassName(initialSelectedLayer);
  Array.from(initialMarkers).forEach(function(marker) {
      marker.style.fontSize = initialSize + 'px';
      marker.style.lineHeight = initialSize + 'px';
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
	// Add 3D Buildings Layer
	map.on('load', function () {
		map.addLayer({
			'id': '3d-buildings',
			'source': 'composite',
			'source-layer': 'building',
			'filter': ['==', 'extrude', 'true'],
			'type': 'fill-extrusion',
			'minzoom': 10,
			'paint': {
				'fill-extrusion-color': '#aaa',
				'fill-extrusion-height': ["get", "height"],
				'fill-extrusion-base': ["get", "min_height"],
				'fill-extrusion-opacity': 0.6
			}
		});
	});

		// Toggle 3D Buildings
		var toggle = document.getElementById('toggle');
		toggle.addEventListener('change', function () {
			if (toggle.checked) {
				map.setLayoutProperty('3d-buildings', 'visibility', 'visible');
			} else {
				map.setLayoutProperty('3d-buildings', 'visibility', 'none');
			}
		});
	});
