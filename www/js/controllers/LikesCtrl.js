appCtrl.controller('LikesCtrl', function($scope, UserService, GoodsService) {

	$scope.elements = [];

	$scope.iconActive = "likes";

	$scope.init = function() {

		$scope.user = UserService.getUserFromStorage();

		GoodsService.getAllGoodsLiked($scope.user.id, function(goods) {
			console.log('goods', goods);
			$scope.elements = goods;
		});
	};

	$scope.unlikeAppartment = function(id) {

		LikeService.deleteLikeFromDB(id, function() {
			console.log('done');
		});
	};

	$scope.init();
});
