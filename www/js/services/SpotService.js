appService.factory('SpotService', function($http) {

    var service = this;

    service.spotList = [

        {
            name: "à la maison",
        }, {
            name: "au boulot",
        }, {
            name: "food & drinks",
        }, {
            name: "shopping",
        }, {
            name: "loisirs",
        }, {
            name: "culture",
        }, {
            name: "night"
        }
    ];

    service.acceptSpot = function(userId, latitude, longitude, town, postcode, road, name) {
        this.insertSpot(userId, latitude, longitude, town, postcode, road, name, true);
    };

    service.refuseSpot = function(userId, latitude, longitude, town, postcode, road, name) {
        this.insertSpot(userId, latitude, longitude, town, postcode, road, name, false);
    };

    service.insertSpot = function(userId, latitude, longitude, town, postcode, road, name, agreed) {

        const spot = {
            userId: userId,
            name: name,
            geo: {
                latitude: latitude,
                longitude: longitude
            },
            address: {
                town: town,
                postcode: postcode,
                road: road
            },
            agreed: agreed
        };

        $http({
            method: 'POST',
            url: TipeekConfig.apiUrl+'spots/insert',
            data: {spot: spot}
        }).then(function successCallback(response) {

        }, function errorCallback(response) {
            callback({});
        });
    };

    service.getAllSpots = function(callback) {

        $http({
            method: 'GET',
            url: TipeekConfig.apiUrl+'spots/all',
            data: null
        }).then(function successCallback(response) {

            callback(response.data);

        }, function errorCallback(response) {
            callback({});
        });
    };

    service.getUserSpots = function(userId, callback) {

        $http({
            method: 'GET',
            url: TipeekConfig.apiUrl+'spots/'+userId,
            data: null
        }).then(function successCallback(response) {
            callback(response.data);
        }, function errorCallback(response) {
            callback({});
        });
    };

    service.getSearchSpots = function(userId, callback) {

        $http({
            method: 'GET',
            url: TipeekConfig.apiUrl+'spots/search/'+userId,
            data: null
        }).then(function successCallback(response) {
            callback(response.data);
        }, function errorCallback(response) {
            callback({});
        });
    };

    return service;
});
