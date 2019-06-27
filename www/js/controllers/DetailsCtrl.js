appCtrl.controller('DetailsCtrl', function($scope, GoodsService, LikeService, $location) {

	$scope.elements = [];

	$scope.init = function() {

		GoodsService.getAllGoods(function(goods) {

			console.log('goods', goods);
			$scope.elements = goods;
		});
	};

	$scope.init();
});
