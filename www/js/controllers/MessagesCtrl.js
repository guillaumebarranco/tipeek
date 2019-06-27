appCtrl.controller('MessagesCtrl', function($scope, $location, UserService, MessageService) {

	$scope.newMessage = "";

	// Fake ones
	$scope.messages = [
		{
			"_id":"5926fe361d5f6a0cd4c416b2","contactId":1495726883178,"text":"koko","userId":1495725970216,"timestamp":1495727670201
		}, {
			"_id":"5926fe351d5f6a0cd4c416b1","contactId":1495726883178,"text":"GuiGui ca craint","userId":1495725970216,"timestamp":1495727669553
		}, {
			"_id":"5926fe2c1d5f6a0cd4c416b0","contactId":1495725970216,"text":"Hello GuiGui !","userId":1495726883178,"timestamp":1495727660494
		}, {
			"_id":"5926fcad1d5f6a0cd4c416ac","contactId":1495726883178,"text":"salut lulu","userId":1495725970216,"timestamp":1495727277796
		}
	];

	$scope.user = {};
	$scope.contactId = parseInt($location.$$search.toId);

	$scope.init = function() {

		$scope.user = UserService.getUserFromStorage();

		$scope.getMessages();
	};

	$scope.getMessages = function() {

		MessageService.getMessagesFromUserAndContact($scope.user.id, $scope.contactId, function(response) {
			console.log('response', response);

			$scope.messages = [];

			for(var i in response) {
				$scope.messages.unshift(response[i]);
			}

			setTimeout(function() {
				$scope.getMessages();
			}, 5000);
		});
	};

	$scope.changeNewMessage = function(element) {
		$scope.newMessage = element;
	};

	$scope.sendMessage = function() {

		$scope.messages.push({
			userId: $scope.user.id,
			contactId: $scope.contactId,
			text: $scope.newMessage
		});

		MessageService.sendMessage($scope.contactId, $scope.newMessage, $scope.user.id, function(response) {
			$scope.changeNewMessage("");
		});
	};

	$scope.getMessageStyle = function(messageUserId) {

		if(messageUserId === $scope.user.id) {
			return "emitterMessages";

		} else if(messageUserId === $scope.contactId) {
			return "recipientMessages";
		}

		return "emitterMessages";
	};

	$scope.init();
});
