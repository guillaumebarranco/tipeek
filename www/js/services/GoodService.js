appService.factory('GoodsService', function($http) {

    var service = this;

    service.insertGoodToDB = function(good) {

        good.id = Date.now();

        $http({
            method: 'POST',
            url: TipeekConfig.apiUrl+'goods/insert',
            data: {good: good}
        }).then(function successCallback(response) {

        }, function errorCallback(response) {

        });
    };

    service.getAllGoods = function(callback) {

        $http({
            method: 'GET',
            url: TipeekConfig.apiUrl+'goods/all',
            data: null
        }).then(function successCallback(response) {

            callback(response.data);

        }, function errorCallback(response) {
            callback({});
        });
    };

    service.getGoodsFromResearch = function(user, callback) {

        $http({
            method: 'POST',
            url: TipeekConfig.apiUrl+'goods/search',
            data: {search: user.search}
        }).then(function successCallback(response) {

            console.log('goods from search', response.data);
            callback(response.data);

        }, function errorCallback(response) {
            callback({});
        });
    };

    service.getAllGoodsLiked = function(userId, callback) {

        $http({
            method: 'GET',
            url: TipeekConfig.apiUrl+'goods/liked/'+userId,
            data: null
        }).then(function successCallback(response) {

            callback(response.data);

        }, function errorCallback(response) {
            callback({});
        });
    };

    service.getGoodById = function(id, callback) {

        $http({
            method: 'GET',
            url: TipeekConfig.apiUrl+'goods/'+id,
            data: null
        }).then(function successCallback(response) {

            callback(response.data);

        }, function errorCallback(response) {
            callback({});
        });
    };

    service.getGoodsFromResearch = function(user, callback) {

        $http({
            method: 'POST',
            url: TipeekConfig.apiUrl+'goods/search',
            data: {search: user.search}
        }).then(function successCallback(response) {

            console.log('goods from search', response.data);
            callback(response.data);

        }, function errorCallback(response) {
            callback({});
        });
    };

    service.getCommentsFromGood = function(goodId, callback) {

        $http({
            method: 'GET',
            url: TipeekConfig.apiUrl+'comments/'+goodId,
            data: {}
        }).then(function successCallback(response) {
            callback(response.data);
        }, function errorCallback(response) {
            callback({});
        });
    };

    service.sendComment = function(goodId, comment, callback) {

        var data = {
            goodId: goodId,
            comment: comment
        };

        $http({
            method: 'POST',
            url: TipeekConfig.apiUrl+'comments/insert',
            data: data
        }).then(function successCallback(response) {
            callback(response.data);
        }, function errorCallback(response) {
            callback({});
        });
    };

    return service;
});
