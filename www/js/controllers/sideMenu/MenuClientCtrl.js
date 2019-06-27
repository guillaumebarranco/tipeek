appCtrl.controller('MenuClientCtrl', function($scope, $http, UserService, $location) {
	$scope.iconActive = "user";

	$scope.init = function() {
		$scope.user = UserService.getUserFromStorage();
	};

	$scope.reinitUser = function() {
		UserService.reinitUser($location);
	};

	$scope.init();
});
