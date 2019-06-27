appCtrl.controller('ResearchCtrl', function($scope, UserService, $location, $state) {

	$scope.user = {};

	$scope.currentScreen = 0;
	$scope.error = false;
	$scope.errorText = "";

	$scope.recapDone = false;

	$scope.init = function() {

		$scope.user = UserService.getUserFromStorage();

		console.log('$scope.user', $scope.user);

		$scope.initSearch();
	};

	$scope.initSearch = function() {
		$scope.currentScreen = 1;
		$scope.user.search = UserService.search;
	};

	$scope.back = function() {
		$scope.currentScreen--;
	};

	$scope.updateStep = function(number) {
		$scope.currentScreen = number;
	};

	$scope.registerUserSearch = function(element) {

		if(element === 'end') {
			$scope.user.search.done = true;
			UserService.insertSearch($scope.user);
			UserService.setUserStorage($scope.user);

			console.log('to connected');

			return $location.url('/connected');
			// $state.transitionTo('connected');
		}

		console.log($scope.user);

		$scope.error = false;

		if($scope.checkElement(element)) {
			$scope.currentScreen++;
		}

		if ($scope.currentScreen == 6 && !$scope.recapDone){
			$scope.recapDone = true;
		}

		if(($scope.checkElement(element)) && ($scope.recapDone)) {
			$scope.currentScreen = 6;
		}
	};

	$scope.checkElement = function(element) {

		switch(element) {

			case "searchType":

				if($scope.user.search.searchType !== "") {
					return true;
				}

			break;

			case "homeType":

				if($scope.user.search.homeType !== "") {
					return true;
				}

			break;

			case "surface":

				if(
					$scope.user.search.surfaceMin !== "" &&
					$scope.user.search.surfaceMax !== "" &&
					$scope.user.search.surfaceMin > 0 &&
					$scope.user.search.surfaceMax > 0 &&
					$scope.user.search.surfaceMax > $scope.user.search.surfaceMin
				) {
					return true;
				}

			break;

			case "rooms":

				if(
					$scope.user.search.nbChambers !== "" &&
					$scope.user.search.nbRooms !== "" &&
					$scope.user.search.nbChambers > 0 &&
					$scope.user.search.nbRooms > 0 &&
					$scope.user.search.nbRooms > $scope.user.search.nbChambers
				) {
					return true;
				}

			break;

			case "budget":

				if(
					$scope.user.search.budgetMin !== "" &&
					$scope.user.search.budgetMax !== "" &&
					$scope.user.search.budgetMin > 0 &&
					$scope.user.search.budgetMax > 0 &&
					$scope.user.search.budgetMax > $scope.user.search.budgetMin
				) {
					return true;
				}

			break;
		}

		$scope.showError();
		return false;
	};

	$scope.handleChangingSurface = function() {
		$scope.handleChangingElement('surfaceMax', 'surfaceMin');
	};

	$scope.handleChangingBudget = function() {
		$scope.handleChangingElement('budgetMax', 'budgetMin');
	};

	$scope.handleChangingNumberRooms = function() {
		$scope.handleChangingElement('nbRooms', 'nbChambers');
	};

	$scope.handleChangingElement = function(max, min) {

		if(typeof $scope.user.search[max] === "undefined" || !$scope.user.search[max]) {
			$scope.user.search[max] = 0;
		}

		if($scope.user.search[max] <= $scope.user.search[min]) {
			$scope.user.search[max] = $scope.user.search[min] + 1;
		}
	};

	$scope.showError = function() {
		$scope.error = true;
	};

	$scope.init();
});