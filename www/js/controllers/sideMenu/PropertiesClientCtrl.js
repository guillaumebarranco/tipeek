appCtrl.controller('PropertiesClientCtrl', function($scope, UserService) {

	$scope.search = {};

	$scope.init = function() {

		$scope.user = UserService.getUserFromStorage();

		console.log($scope.user);

		UserService.getUserSearch($scope.user.id, function(response) {
			console.log('response', response[0]);
			$scope.search = response[0];
		});
	};

	$scope.init();
});