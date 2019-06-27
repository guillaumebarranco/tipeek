appCtrl.controller('ShareCtrl', function($scope, UserService) {

	$scope.init = function() {
		$scope.user = UserService.getUserFromStorage();

		console.log($scope.user);
	};

	$scope.init();
});
