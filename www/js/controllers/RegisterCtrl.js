appCtrl.controller('RegisterCtrl', function($scope, UserService, UploadService, $location, $cordovaFileTransfer, $cordovaCamera) {

	$scope.newUser = "";
	$scope.currentScreen = 0;
	$scope.contacts = [];

	$scope.isDemo = true;
	
	$scope.user = UserService.user;
	$scope.search = UserService.search;

	$scope.errorPhoneTaken = false;
	$scope.errorAgeNotGood = false;

	$scope.foundInResearch = false;
	$scope.foundResearchAccepted = false;
	$scope.researchFound = {};
	$scope.researchFoundCreator = {};

	$scope.uniqidAlreadySetted = false;

	$scope.currentContact = {};

	$scope.initErrorState = function() {
		$scope.error = false;
	};

	$scope.back = function() {
		$scope.currentScreen--;
	};

	$scope.init = function() {
		$scope.initErrorState();
		$scope.initPath();
	};

	$scope.uploadProfilePicture = function(type, callback) {

		console.log('begin camera');

		UploadService.camera($cordovaFileTransfer, $cordovaCamera, type, function(imgPath) {

			$scope.user.picture = 'http://tipeek.webarranco.fr/img/uploads/'+imgPath;
			console.log('callback img path', imgPath);

			setTimeout(function() {
				$scope.currentScreen++;
			}, 2000);
			callback();
		});
	};

	$scope.initPath = function() {
		$scope.currentScreen = 1;
	};

	$scope.showError = function() {
		$scope.error = true;
	};

	$scope.validateEmail = function(email) {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	};

	$scope.checkError = function() {

		if($scope.error) {
			return "error";
		}

		return "waiting";
	};

	$scope.getCheckedFalse = function(){
		return false;
	};

	$scope.getCheckedTrue = function(){
		return true;
	};

	// Contacts

	$scope.addContacts = function() {
		$scope.getAllContacts();
	};

	$scope.contactfindSuccess = function(contacts) {

		for (var i = 0; i < contacts.length; i++) {

			if(contacts[i].displayName !== null && contacts[i].phoneNumbers !== null) {

				var phone = contacts[i].phoneNumbers[0].value;
				phone = phone.split(' ').join('');

				$scope.contacts.push({
					name: contacts[i].displayName,
					phone: phone,
					id: i
				});
			}
		}

		console.log($scope.contacts);
		$scope.$apply();
	};

	$scope.contactfindError = function(message) {
		console.log('Failed because: ' + message);
	};

	$scope.getAllContacts = function() {

		// If we are not on a phone, we create fake contacts
		if(typeof ContactFindOptions === "undefined") {
			$scope.createFakeContacts();
		} else {

			var options = new ContactFindOptions();
			options.filter = "";
			options.multiple = true;

			fields = ["displayName", "phoneNumbers"];
			navigator.contacts.find(fields, $scope.contactfindSuccess, $scope.contactfindError, options);
		}
	};

	$scope.createFakeContacts = function() {

		$scope.contacts = [

			{
				name: "Ludivine",
				phone: "0622585445",
				id: 1
			},
			{
				name: "Lucas",
				phone: "0678454688",
				id: 2
			}
		];
	};

	$scope.calculateAge = function(birthday) { // birthday is a date
	    var ageDifMs = Date.now() - birthday.getTime();
	    var ageDate = new Date(ageDifMs); // miliseconds from epoch
	    return Math.abs(ageDate.getUTCFullYear() - 1970);
	};

	// Form

	$scope.checkElement = function(element, callback) {

		switch(element) {

			case "name":

				if($scope.user.name !== "" && $scope.user.name.length > 3) {
					return callback(true);
				}

			break;

			case "phone":

				$scope.errorPhoneTaken = false;

				if($scope.user.phone === undefined) {
					$scope.user.phone = "";
				}

				var phone = $scope.user.phone;

				if(phone !== "" && (phone.toString().length === 10 || phone.toString().length === 14) && phone.toString().substr(0,1) === "0") {

					UserService.checkPhoneNumberIsAvailable(phone, function(isAvailable) {

						$scope.errorPhoneTaken = !isAvailable;

						UserService.getExistingResearch(phone, function(response) {

							if(!response.data) {
								console.log('not in any research');
								$scope.foundInResearch = false;
							} else {
								console.log('in research');
								$scope.foundInResearch = true;
								$scope.researchFoundCreator = response.data.user;
								$scope.researchFound = response.data.search;
							}
						});

						return callback(isAvailable);
					});
				}

			break;

			case "type":

				if($scope.user.type === "client" || $scope.user.type === "announcer") {

					// IMPORTANT
					if($scope.user.type === "client") {
						$scope.user.search = UserService.search;
					}

					return callback(true);
				}

			break;

			case "birthday":

				if($scope.user.birthday !== "" && $scope.user.birthday !== undefined && typeof $scope.user.birthday !== "undefined") {

					if($scope.calculateAge($scope.user.birthday) > 17) {
						return callback(true);
					} else {
						$scope.errorAgeNotGood = true;
					}
				}

			break;

			case "acceptResearch":

				$scope.foundResearchAccepted = true;
				$scope.user.search = $scope.researchFound;
				$scope.uniqidAlreadySetted = true;

				$scope.user.id = $scope.uniqid();
				UserService.setUserStorage($scope.user);
				UserService.updateResearchMember($scope.user.search.creator, $scope.user.phone, $scope.user.id);

				$scope.currentScreen++;
				return callback(true);

			break;

			case "refuseResearch":

				$scope.researchFound = false;
				$scope.currentScreen--;
				return callback(true);

			break;

			case "addContacts":
				return callback(true);
			break;

			case "contacts":
				return callback(true);
			break;

			case "showContacts":
				$scope.addContacts();
				return callback(true);
			break;

			case "passContacts":
				$scope.currentScreen++;
				return callback(true);
			break;

			case "geoloc":
				return callback(true);
			break;

			case "profile_picture":

				$scope.uploadProfilePicture('camera', function() {
					return callback(true);
				});

			break;

			case "profile_picture_false":
				// $scope.user.picture = "img/"+$scope.user.name.toLowerCase()+'.png';
				return callback(true);
			break;

			case "typeAnnouncer":

				if ($scope.user.specific.typeAnnouncer === "agency" || $scope.user.specific.typeAnnouncer === "personal") {
					return callback(true);
				}

			break;

			case "agencyName" :

				if ($scope.user.specific.agencyName !== "" && $scope.user.specific.agencyName.length > 3) {
					return callback(true);
				}

			break;

			case "agencyAddress" :

				if ($scope.user.specific.agencyAddress !== "" && $scope.user.specific.agencyAddress.length > 3) {
					return callback(true);
				}

			break;

			case "email" :

				if ($scope.user.email !== "" && $scope.user.email.length > 3 && $scope.validateEmail($scope.user.email)) {
					return callback(true);
				}

			break;
		}

		$scope.showError();
		return callback(false);
	};

	$scope.changeFormContact = function(name, phone) {

		var found = false,
			foundIndex = 0
		;

		for(var i in $scope.user.search.contacts) {

			if($scope.user.search.contacts[i].phone === phone) {
				found = true;
				foundIndex = i;
			}
		}

		if(found) {
			$scope.user.search.contacts.slice(foundIndex);

		} else {

			$scope.user.search.contacts.push({
				name: name,
				phone: phone
			});
		}
	};

	$scope.uniqid = function() {
		return Date.now();
	};

	$scope.registerUserElement = function(element) {

		if(element === "type") {

			if($scope.user.type === "client") {

				$scope.user.specific = $scope.userClient;

			} else if($scope.user.type === "announcer") {
				$scope.user.specific = $scope.userAnnouncer;
			}
		}

		if(element === "typeAnnouncer") {

			if($scope.user.specific.type === "agency") {

				$scope.user.specific.datas = $scope.announcerAgency;

			} else if($scope.user.specific.type === "personal") {
				$scope.user.specific.datas = $scope.announcerPersonal;
			}
		}

		if(element === 'end') {

			$scope.user.connected = true;

			if($scope.user.type === "client") {

			} else if($scope.user.type === 'announcer') {

				$scope.user.typeAnnouncer = $scope.user.specific.type;
				$scope.user.datas = $scope.user.specific.datas;
			}

			if(!$scope.uniqidAlreadySetted) {
				$scope.user.id = $scope.uniqid();
			}

			// Remove object specific of user
			//$scope.user.slice('specific');

			UserService.setUserStorage($scope.user);
			UserService.insertUser($scope.user);

			if ($scope.user.type === "client") {

				if($scope.foundResearchAccepted) {
					$location.path('/connected');
				} else {
					$location.path('/research');
				}

			}  else if ($scope.user.type === "announcer") {
				$location.path('/announce');
			}

			console.log($scope.user);

			return;
		}

		console.log($scope.user);

		$scope.error = false;

		$scope.checkElement(element, function(verified) {

			if(verified) {
				$scope.currentScreen++;
			}
		});
	};

	console.log($scope.user.birthday);

	$scope.init();
});