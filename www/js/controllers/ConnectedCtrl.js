appCtrl.controller('ConnectedCtrl', function($scope, UserService, GeolocService, GoodsService, $location) {

	$scope.user = {};
	$scope.homeTop = "map";
	$scope.iconActive = "tipeek";

	$scope.init = function() {

		$scope.user = UserService.getUserFromStorage();
		console.log($scope.user);

		$scope.initBackgroundTaskPosition();

		// If user is an announcer and not a client, we do not show him map but his profile
		if($scope.user.type !== "client") {
			$location.path('/menu-announcer');
		}
	};

	$scope.initBackgroundTaskPosition = function() {

		if($scope.user.type === "client") {

			// TO DELETE ON FINAL VERSION, USED ON DEVELOPEMENT
			// Because we doesn't have background tasks on computer
			GeolocService.launchIntervalGeoloc();

			GeolocService.activateGeoloc();
		}
	};

	$scope.updateHomeTop = function(element) {
		$scope.homeTop = element;
	};

	$scope.getHomeTopClass = function(element) {

		if($scope.homeTop === element) {
			return 'active';
		}

		return "";
	};

	$scope.init();
});
