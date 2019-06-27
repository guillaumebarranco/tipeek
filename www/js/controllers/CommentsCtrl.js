appCtrl.controller('CommentsCtrl', function($scope, UserService, MessageService) {

	$scope.iconActive = "comments";
	$scope.user = {};
	$scope.contacts = [];

	// Fake contacts
	$scope.contacts = [

		{
			name: "Test",
			id: 1495725970216
		}
	];

	$scope.init = function() {

		$scope.user = UserService.getUserFromStorage();
		$scope.getContacts();
	};

	$scope.getContacts = function() {

		MessageService.getAllContacts($scope.user.id, function(response) {

			console.log(response);

			$scope.contacts = response;
		});
	};

	$scope.init();
});
