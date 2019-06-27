appCtrl.controller('ProfileCtrl', function($scope, UserService, $location) {

	$scope.user = {};
	$scope.userId = null;

	$scope.init = function() {
		$scope.userId = parseInt($location.$$search.toId);
		$scope.user = UserService.getUserFromStorage();
	};

	$scope.init();
});
