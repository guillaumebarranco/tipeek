appCtrl.controller('MapCtrl', function($scope, SpotService, GoodsService, GeolocService, $http) {

	$scope.popInWork = false;
	$scope.popInShow = false;
	$scope.popInValue = "2";
	$scope.goods = {};
	$scope.waitingSpot = {};

	$scope.spotList = SpotService.spotList;

	$scope.apikey = "AIzaSyDmWxPpdT2aOnAD3vON53eryIhS-JOv8rw";

	$scope.init = function() {

		$scope.createHtmlIconFunction();

		// TODO GET LAST POSITION BY USER ID TO AVOID TOO MUCH DATA FOR THAT
		GeolocService.getAllPositions($scope.user.id, function(positions) {

			GoodsService.getAllGoods(function(goods) {
				console.log('goods', goods);

				var firstAddress;
				var zoom = 14;

				if(typeof goods[0] !== "undefined") {

					$scope.goods = goods;

					firstAddress = 
						$scope.goods[0].localisation.number+
						" "+$scope.goods[0].localisation.street+
						" "+$scope.goods[0].localisation.city+" "
						+$scope.goods[0].localisation.zipcode
					;

					$http.get('http://nominatim.openstreetmap.org/search?format=json&q='+firstAddress).then(function successCallback(data) {

						var defaultLat = data.data[0].lat;
						var defaultLong = data.data[0].lon;

						$scope.displayMap(defaultLat, defaultLong, zoom, positions);
					});

				} else if(typeof positions.data !== "undefined" && typeof positions.data[0] !== "undefined") {
					$scope.displayMap(positions.data[0].latitude, positions.data[0].longitude, zoom, positions);
				} else {
					// ECV Digital
					$scope.displayMap(48.887153299999994, 2.3784750999999997, zoom, positions);
				}
			});
		});
	};

	$scope.displayMap = function(lat, lon, zoom, positions) {

		$scope.map = L.map('mapid').setView([lat, lon], zoom);
		$scope.getMap();
		$scope.usePositions(positions.data);
		$scope.showExistingSpots();
	};

	$scope.showExistingSpots = function() {

		SpotService.getSearchSpots($scope.user.id, function(userSpots) {

			console.log('userSpots', userSpots);

			for(var i in userSpots) {

				if(userSpots[i].agreed) {

					var userSpot = userSpots[i];

					var userSpotIcon = new L.HtmlIcon({
					    html : '<div class="userSpot"><img src="'+userSpot.user.picture+'" width="30" height="30"><span>'+userSpot.name+'</span></div>',
					});

					var marker = L.marker([userSpot.geo.latitude, userSpot.geo.longitude], {icon: userSpotIcon}).addTo($scope.map);
				}
			}
		});
	};

	$scope.getMap = function() {

		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
		    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
		    maxZoom: 18,
		    id: 'webarranco.2d27pfk4',
		    accessToken: 'pk.eyJ1Ijoid2ViYXJyYW5jbyIsImEiOiJjaXRtcXV3OXQwMDB6MnNvN2pyMzlxbWg4In0.sB27qfgsnkjWl_r-QRY_Kw'
		}).addTo($scope.map);

		for(let i in $scope.goods) {
			$scope.getPoints($scope.goods[i]);
		}
	};

	$scope.getPoints = function(good) {

		var address = good.localisation.number+" "+good.localisation.street+" "+good.localisation.city+" "+good.localisation.zipcode;
		// console.log('good', good);

		$http.get('http://nominatim.openstreetmap.org/search?format=json&q='+address).then(function successCallback(data) {

			var helloLondonHtmlIcon = new L.HtmlIcon({
			    html : "<div class='iconMapGood'>"+good.price+" €</div><div class='arrow-down'></div>",
			});

			var greenIcon = L.icon({
			    iconUrl: 'img/icon1.png',

			    iconSize:     [50, 50], // size of the icon
			    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
			    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
			});

			var marker = L.marker([data.data[0].lat, data.data[0].lon], {icon: helloLondonHtmlIcon}).addTo($scope.map);
			// marker.bindPopup("<b>"+good.price+" €</b>").openPopup();
	    });
	};

	$scope.usePositions = function(positions) {

		console.log('positions', positions);

		/*
		 *	From all positions, we check if one is found at least 5 times, then we propose a spot.
		 */

		var countNeededForSpot = 5;

		var previousLat = 0;
		var previousLong = 0;
		var color = 'blue';
		var radius = 5;

		var recurrentPositions = [];

		for (var i = 0; i < positions.length; i++) {

			if(recurrentPositions.length !== 0) {

				for(var j in recurrentPositions) {

					if(
						recurrentPositions[j].latitude === positions[i].latitude
						&& recurrentPositions[j].longitude === positions[i].longitude
					) {
						recurrentPositions[j].count++;
						break;
					}
				}

				recurrentPositions.push({
					latitude: positions[i].latitude,
					longitude: positions[i].longitude,
					count: 1
				});

			} else {

				recurrentPositions.push({
					latitude: positions[i].latitude,
					longitude: positions[i].longitude,
					count: 1
				});
			}

			color = 'blue';
			radius = 5;

			if(previousLat !== 0 && previousLong !== 0) {
				$scope.makeLine(previousLat, previousLong, positions[i].latitude, positions[i].longitude);
			}

			previousLat = positions[i].latitude;
			previousLong = positions[i].longitude;

			if(i === 0) color = 'orange';
			if(i === positions.length - 1) color = 'red';

			if(i === 0 || i === positions.length - 1) radius = 20;

			var circle = L.circle([positions[i].latitude, positions[i].longitude], {
			    color: color,
			    fillColor: color,
			    fillOpacity: 0.5,
			    radius: radius
			}).addTo($scope.map);
		}

		var recurrentPositionsFinal = [];

		for(var k in recurrentPositions) {
			if(recurrentPositions[k].count > countNeededForSpot) {
				recurrentPositionsFinal.push(recurrentPositions[k]);
			}
		}

		if(recurrentPositionsFinal.length > 0) {
			$scope.handleSpot(recurrentPositionsFinal);
		}
	};

	$scope.makeLine = function(previousLat, previousLong, newLat, newLong) {

		if(previousLat !== newLat && previousLong !== newLong) {

			L.polyline([[previousLat, previousLong], [newLat, newLong]], {
				color: 'blue',
				fillColor: 'blue'
			}).addTo($scope.map)
		}
	};

	$scope.handleSpot = function(elements) {

		console.log('elements', elements);

		var element = elements[0];

		var url = 
		`http://nominatim.openstreetmap.org/reverse?format=json&lat=${element.latitude}&lon=${element.longitude}&zoom=18&addressdetails=1`;

		var circle = L.circle([element.latitude, element.longitude], {
		    color: 'purple',
		    fillColor: 'purple',
		    fillOpacity: 0.5,
		    radius: 50
		}).addTo($scope.map);

		$http.get(url).then(function(data) {

			var address = data.data.address;
			console.log(address);

			// Sometimes in api response, address.town exist and address.city not. Sometimes is the reverse. Well we handle both cases.
			var town = address.town || address.city || '';

			SpotService.getUserSpots($scope.user.id, function(userSpots) {

				if(userSpots.length !== 0) {

					for(var i in userSpots) {

						// TO IMPROV TO ADD SOME DISTANCE, NOT EXACT COMPARE
						if(userSpots[i].geo.latitude !== element.latitude && userSpots[i].geo.longitude !== element.longitude) {
							return $scope.proposeSpot(element, address, town);
						}
					}

				} else {
					return $scope.proposeSpot(element, address, town);
				}
			});
		});
	};

	$scope.proposeSpot = function(element, address, town) {

		var text = `Nous avons remarqué que vous passiez beaucoup de temps à ${town} ${address.postcode} dans la rue suivante : ${address.road}.
		(Marqué d'un point violet actuellement sur votre carte) Voulez-vous enregistrer cet endroit comme favori ?`

		console.log(text);
		$scope.popInWork();

		$scope.waitingSpot = {
			userId: $scope.user.id,
			latitude: element.latitude,
			longitude: element.longitude,
			town: town,
			postcode: address.postcode,
			road: address.road,
			name: 'work'
		};
	};

	$scope.popIn = function(which) {

		if(which === "work") {
			$scope.popInWork();
		}
	};

	$scope.popInWork = function() {
		$scope.popInWorkShow = !$scope.popInWorkShow;
		$scope.popInShow = !$scope.popInShow;
	};

	$scope.popInHome = function() {
		$scope.popInWorkHome = true;
	};

	$scope.createHtmlIconFunction = function() {

		L.HtmlIcon = L.Icon.extend({
			options: {
				/*
				html: (String) (required)
				iconAnchor: (Point)
				popupAnchor: (Point)
				*/
			},

			initialize: function (options) {
				L.Util.setOptions(this, options);
			},

			createIcon: function () {
				var div = document.createElement('div');
				div.innerHTML = this.options.html;
				return div;
			},

			createShadow: function () {
				return null;
			}
		});
	};

	$scope.resultPopIn = function(which) {

		if(which === "work") {
			$scope.resultPopInWork();
		}
	};

	$scope.changePopInValue = function(value) {
		$scope.popInValue = value;
	};

	$scope.resultPopInWork = function() {

		if(parseInt($scope.popInValue) === 2 || parseInt($scope.popInValue) === 1) {

			if(parseInt($scope.popInValue) === 2) {
				$scope.waitingSpot.name = "work";
			}

			SpotService.acceptSpot($scope.waitingSpot.userId, $scope.waitingSpot.latitude,
				$scope.waitingSpot.longitude, $scope.waitingSpot.town, $scope.waitingSpot.postcode, 
				$scope.waitingSpot.road, $scope.waitingSpot.name);

			$scope.popInWork();

			$scope.showExistingSpots();

		} else {

			SpotService.refuseSpot($scope.waitingSpot.userId, $scope.waitingSpot.latitude,
				$scope.waitingSpot.longitude, $scope.waitingSpot.town, $scope.waitingSpot.postcode, 
				$scope.waitingSpot.road, "");

			$scope.popInWork();
		}
	};

	$scope.resultPopInHome = function() {

		console.log($scope.popInValue);

		$scope.popInHomeShow = false;

		if(parseInt($scope.popInValue) === 2) {
			SpotService.insertSpot('home');

		} else if(parseInt($scope.popInValue) === 1) {
			SpotService.insertSpot('unnamed');
		}
	};

	$scope.init();
});
