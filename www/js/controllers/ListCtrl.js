appCtrl.controller('ListCtrl', function($scope, GoodsService, LikeService, $location) {

	$scope.elements = [];

	$scope.init = function() {

		GoodsService.getAllGoods(function(goods) {
			console.log('goods', goods);
			$scope.elements = goods;
		});
	};

	$scope.likeAppartment = function(id) {

		LikeService.insertLikeToDB(id, $scope.user.id, function() {
			console.log('done');
		});
	};

	$scope.init();
});

appCtrl.controller('filtersListCtrl', function($scope) {

	$scope.filter = 1;

	$scope.init = function() {

	};

	$scope.changeFilter = function(filter) {
		$scope.filter = filter;
		console.log(filter);
		console.log($scope.filter);
		$scope.updateHomeTop('list');
	};

	$scope.init();
});
