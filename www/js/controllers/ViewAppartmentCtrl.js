appCtrl.controller('ViewAppartmentCtrl', function($scope, GoodsService, $location) {

	$scope.element = {};
	$scope.error = false;
	$scope.comments = [];
	$scope.creator = null;

	$scope.newComment = "";

	$scope.init= function() {

		GoodsService.getGoodById($location.$$search.id, function(response) {

			console.log('res', response);

			if(response.status === "success") {

				$scope.element = response.results[0];
				$scope.element.src = "test";

				$scope.creator = response.results[0].creator;

				GoodsService.getCommentsFromGood($scope.element.id, function(comments) {
					$scope.comments = comments;
				});

			} else {
				$scope.error = true;
			}
		});
	};

	$scope.sendComment = function() {

		GoodsService.sendComment($scope.element.id, {text: $scope.newComment}, function(response) {
			$scope.newComment = "";
		});
	};

	$scope.init();
});
