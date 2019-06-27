appService.factory('MessageService', function($http) {

    var service = this;

    service.sendMessage = function(contactId, text, userId, callback) {

        console.log(text);

        const message = {
            contactId: contactId,
            text: text,
            userId: userId
        };

        $http({
            method: 'POST',
            url: TipeekConfig.apiUrl+'messages/insert',
            data: {message: message}
        }).then(function successCallback(response) {
            if(callback) callback();
        }, function errorCallback(response) {
            if(callback) callback();
        });
    };

    service.getMessagesFromUserAndContact = function(userId, contactId, callback) {

        $http({
            method: 'POST',
            url: TipeekConfig.apiUrl+'messages/get',
            data: {
                userId: userId,
                contactId: contactId
            }
        }).then(function successCallback(response) {

            callback(response.data);

        }, function errorCallback(response) {
            callback({});
        });
    };

    service.getAllMessages = function(callback) {

        $http({
            method: 'GET',
            url: TipeekConfig.apiUrl+'messages/all',
            data: null
        }).then(function successCallback(response) {

            callback(response.data);

        }, function errorCallback(response) {
            callback({});
        });
    };

    service.getAllContacts = function(userId, callback) {

        $http({
            method: 'GET',
            url: TipeekConfig.apiUrl+'messages/contacts/'+userId,
            data: null
        }).then(function successCallback(response) {

            callback(response.data);

        }, function errorCallback(response) {
            callback({});
        });
    };

    return service;
});
