appCtrl.controller('AnnounceCtrl', function($scope, UserService, GoodsService, $location) {

	$scope.announce = UserService.announce;
	$scope.homeTypes = UserService.homeTypesAnnounce;

	$scope.recapDone = false;

	$scope.currentScreen = 0;
	$scope.error = false;

	$scope.init = function() {

		$scope.user = UserService.getUserFromStorage();
		$scope.currentScreen = 1;
	};

	$scope.showError = function() {
		$scope.error = true;
	};

	$scope.back = function() {
		$scope.currentScreen--;
	};

	$scope.updateStep = function(number) {
		$scope.currentScreen = number;
	};

	$scope.registerUserProperty = function(element) {

		if(element === 'end') {

			$scope.announce.done = true;
			$scope.announce.creator = $scope.user.id;

			GoodsService.insertGoodToDB($scope.announce);

			$location.path('/menu-announcer');
			return;
		}

		$scope.error = false;

		if($scope.checkElement(element)) {
			$scope.currentScreen++;
		}
	};

	$scope.checkElement = function(element) {

		switch(element) {

			case "localisation":

				if(
			        $scope.announce.localisation.city !== "" &&
			        $scope.announce.localisation.number !== "" &&
			        $scope.announce.localisation.street !== "" &&
			        $scope.announce.localisation.zipcode !== ""
				) {
					return true;
					$scope.currentScreen++;
				}

			break;

			case "addressLocalisation":
				return true;
			break;

			case "propertyType" :

				if(
					$scope.announce.propertyType === "Vente" || 
					$scope.announce.propertyType === "Location"
				) {
					return true;
				}

			break;

			case "homeType":
			
				if($scope.announce.homeType !== "") {
					return true;
				}

			break;

			case "surfaceAppart":

				if($scope.announce.surfaceAppart !== "") {
					return true;
				}

			break;
			
			case "style" :

				if($scope.announce.style === "Ancien" || $scope.announce.style === "Neuf") {
					return true;
				}

			break;

			case "nbPieces" :

				if($scope.announce.nbPieces !== "") {
					return true;
				}

			break;

			case "equipments":

				if($scope.announce.equipments !== "") {
					return true;
				}

			break;

			case "otherCriteria":

				if($scope.announce.otherCriteria !== "") {
					return true;
				}

			break;

			case "energyClass":

				if($scope.announce.energyClass !== "") {
					return true;
				}

			break;

			case "greenHouseGas":

				if($scope.announce.greenHouseGas !== "") {
					return true;
				}

			break;

			case "description":

				if($scope.announce.description !== "" && 
					$scope.announce.description.length > 3) {
					return true;
				}

			break;

			case "price":

				console.log('$scope.announce.price', $scope.announce.price);

				if($scope.announce.price !== "") {
					return true;
				}

			break;

			case "photos":
				return true;
			break;

			case "recap":
				return true;
			break;
		}

		$scope.showError();
		return false;
	};

	$scope.init();
});
