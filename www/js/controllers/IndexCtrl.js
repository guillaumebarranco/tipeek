appCtrl.controller('IndexCtrl', function($scope, UserService, $location) {

	$scope.getSearchParameters = function() {
		var prmstr = window.location.search.substr(1);
		return prmstr !== null && prmstr !== "" ? transformToAssocArray(prmstr) : {};
	};

	$scope.demo = false;

	$scope.options = {
		loop: false,
		effect: 'fade',
		speed: 500,
	};

	$scope.init = function() {

		if(localStorage.getItem('demo') !== null) {
			$scope.demo = false;
		}

		$scope.user = UserService.getUserFromStorage();

		if(!$scope.isConnected()) {

			$location.path('/register');
			return;
		}

		if(!$scope.hasDoneResearch() && $scope.user.type === "client") {

			$location.path('/research');
			return;
		}

		$location.path('/connected');
	};

	$scope.initAnnouncer = function() {

		if(localStorage.getItem('demo') !== null) {
			$scope.demo = false;
		}

		$scope.userAnnouncer = UserService.getUserFromStorage();

		if(!$scope.isConnected()) {
			$location.path('/register');
			return;
		}

		if(!$scope.hasDoneResearch()) {
			$location.path('/research');
			return;
		}

		$location.path('/connected');
	};

	$scope.isConnected = function() {

		if($scope.user != null && typeof $scope.user.connected !== "undefined") {
			return $scope.user.connected;
		}

		return false;
	};

	$scope.hasDoneResearch = function() {

		if(typeof $scope.user.search !== "undefined") {
			return $scope.user.search.done;
		}

		return false;
	};

	$scope.hideDemo = function() {
		localStorage.setItem('demo', false);
		$scope.demo = false;
	};

	// Slider

	$scope.$on("$ionicSlides.sliderInitialized", function(event, data) {
		// data.slider is the instance of Swiper
		$scope.slider = data.slider;
	});

	$scope.$on("$ionicSlides.slideChangeStart", function(event, data) {
		console.log('Slide change is beginning');
	});

	$scope.$on("$ionicSlides.slideChangeEnd", function(event, data) {
		$scope.activeIndex = data.activeIndex;
		$scope.previousIndex = data.previousIndex;
	});

	$scope.init();
});
