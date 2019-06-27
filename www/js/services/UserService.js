appService.factory('UserService', function($http) {

    var service = this;

    service.user = {
        name: "",
        phone: "",
        type: "client",
        connected: false,
        birthday: "",
        picture: "img/adam.jpg",
        email: "",
        address: "",
        specific: {}
    };

    service.search = {
        searchType: "location",
        homeType: {},
        surfaceMin: 10,
        surfaceMax: 50,
        nbRooms: 3,
        nbChambers: 1,
        budgetMin: 500,
        budgetMax: 1000,
        done: false,
        contacts: []
    };

    service.announce = {

        localisation: {
            city : "Paris",
            number : 84,
            street : "Quai de la Loire",
            zipcode : 75019
        },
        addressLocalisation:"",
        propertyType: "",
        homeType: "",
        done: false,
        style: "",
        surface:55,
        nbPieces:3,
        nbRooms:2,
        equipments: "",
        otherCriteria: "",
        energyClass: "",
        greenHouseGas: "",
        description: "",
        price : 500,
        photos: ["img/appart.png", "img/appart.png", "img/appart.png"]
    };

    service.homeTypesAnnounce = [

        {
            id: "home",
            name: "Maison"
        },
        {
            id: "appartment",
            name: "Appartement"
        },
        {
            id: "loft",
            name: "Loft"
        },
        {
            id: "local",
            name: "Local commercial" 
        },
        {
            id: "bureaux",
            name: "Bureaux"
        },
        {
            id: "parking",
            name: "Parking /Box"
        },
        {
            id: "terrain",
            name: "Terrain"
        },
        {
            id: "chateauHotel",
            name: "Chateau/Hôtel Particulier"
        },
        {
            id: "autre",
            name: "Autre"
        }
    ];

    service.getAllUsers = function() {

        $http({
            method: 'GET',
            url: TipeekConfig.apiUrl+'users/getAllUsers'
        }).then(function successCallback(response) {

            console.log($scope.users);

        }, function errorCallback(response) {

        });
    };

    service.getUserSearch = function(userId, callback) {

        $http({
            method: 'GET',
            url: TipeekConfig.apiUrl+'search/'+userId
        }).then(function successCallback(response) {
            callback(response.data);

        }, function errorCallback(response) {

        });
    };

    service.insertUser = function(user) {

        $http({
            method: 'POST',
            url: TipeekConfig.apiUrl+'users/insertUser',
            data: {user: user}
        }).then(function successCallback(response) {

            console.log(response);

        }, function errorCallback(response) {

        });
    };

    service.insertSearch = function(user) {

        $http({
            method: 'POST',
            url: TipeekConfig.apiUrl+'search/insert',
            data: {user: user}
        }).then(function successCallback(response) {

            console.log(response);

        }, function errorCallback(response) {

        });
    };

    service.getExistingResearch = function(phone, callback) {

        $http({
            method: 'GET',
            url: TipeekConfig.apiUrl+'search/phone/'+phone,
            data: null
        }).then(function successCallback(response) {

            console.log('response', response);
            callback(response);

        }, function errorCallback(response) {

        });
    };

    service.getUserFromStorage = function() {

        var user = {};

        if(localStorage.getItem("user") !== null) {
            user = JSON.parse(localStorage.getItem("user"));
        }

        return user;
    };

    service.checkPhoneNumberIsAvailable = function(phoneNumber, callback) {

        $http({
            method: 'POST',
            url: TipeekConfig.apiUrl+'users/phone/available',
            data: {phone: phoneNumber}
        }).then(function successCallback(response) {

            if(response.data.length === 0) {
                return callback(true);
            }

            return callback(false);

        }, function errorCallback(response) {

        });
    };

    service.updateResearchMember = function(creator, phone, id, callback) {

        $http({
            method: 'POST',
            url: TipeekConfig.apiUrl+'search/update/member',
            data: {
                creator: creator,
                phone: phone,
                userId: id
            }

        }).then(function successCallback(response) {

            console.log('response', response);
            callback(response);

        }, function errorCallback(response) {

        });
    };

    service.setUserStorage = function(user) {
        localStorage.setItem("user", JSON.stringify(user));
    };

    service.reinitUser = function($location) {
        localStorage.setItem("user", null);
        $location.path('/register');
    };

    return service;
});
