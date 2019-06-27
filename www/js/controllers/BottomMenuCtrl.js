appCtrl.controller('BottomMenuCtrl', function($scope, $location) {

	$scope.active = "map";

	$scope.init = function() {

		switch($location.$$url) {
			case "/profile": 	$scope.active = "profile"; 		break;
			case "/comments": 	$scope.active = "comments"; 	break;
			case "/likes": 		$scope.active = "likes"; 		break;
			case "/connected": 	$scope.active = "map"; 			break;
			default: break;
		}
	};

	$scope.getMenuIcon = function(icon) {

		if(icon === $scope.iconActive) {
			icon += "-active";
		}

		return "img/icons/icon-"+icon+".png";
	};

	$scope.init();
});
