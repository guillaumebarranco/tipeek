appService.factory('LikeService', function($http) {

    var service = this;

    service.insertLikeToDB = function(id, userId) {

        const like = {
            goodId: id,
            userId: userId
        };

        $http({
            method: 'POST',
            url: TipeekConfig.apiUrl+'likes/insert',
            data: {like: like}
        }).then(function successCallback(response) {

        }, function errorCallback(response) {

        });
    };

    service.getAllLikes = function(callback) {

        $http({
            method: 'GET',
            url: TipeekConfig.apiUrl+'likes/all',
            data: null
        }).then(function successCallback(response) {

            callback(response.data);

        }, function errorCallback(response) {
            callback({});
        });
    };

    return service;
});
