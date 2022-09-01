
  mapboxgl.accessToken = 'pk.eyJ1IjoiZmFicmljaW9hbW9yaW0iLCJhIjoiY2tsaWNsOHRkMmgwaDJucGN0NGJhd3psOSJ9.h665zPxHXNFNVIzh1cJeUQ';
  var lat1=-5.088858;
  var lng1= -42.775483;
  var lat2=-5.088682;
  var lng2= -42.774857;
  var lat3=-5.087058;
  var lng3= -42.775271;
  var lat4=-5.087071;
  var lng4= -42.775033;
	navigator.geolocation.getCurrentPosition( function(position) {
		var lng = position.coords.longitude;
		var lat = position.coords.latitude;
		mapboxgl.accessToken = mapboxgl.accessToken;
  	sessionStorage.setItem("lng", lng);
  	sessionStorage.setItem("lat", lat);
  	const map = new mapboxgl.Map({
  		style: 'mapbox://styles/mapbox/light-v10',
  		center: [lng, lat], //longitude, latitude
  		zoom: 15.5,
  		pitch: 45,
  		bearing: -17.6,
  		container: 'map',
  		antialias: false,
  		attributionControl:false,
    });

  	map.addControl(new mapboxgl.AttributionControl({
   			compact: true
   		}), 'bottom-right')


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
//    const informacoes = document.getElementById('informacoes');
//    var latFim = `${end[1]}`;
//    var lngFim = `${end[0]}`;
//    informacoes.innerHTML = `<li> ${end[1]} ; ${end[0]}</li>`;


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
							'minzoom': 15,
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
