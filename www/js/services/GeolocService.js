appService.factory('GeolocService', function(UserService, $http) {

    var service = this;

    service.activateGeoloc = function() {

        document.addEventListener('deviceready', function () {

            console.log('deviceready');

            // Android customization
            // To indicate that the app is executing tasks in background and being paused would disrupt the user.
            // The plug-in has to create a notification while in background - like a download progress bar.
            cordova.plugins.backgroundMode.setDefaults({ 
                title:  'TheTitleOfYourProcess',
                text:   'Executing background tasks.'
            });

            // Enable background mode
            cordova.plugins.backgroundMode.enable();

            // Called when background mode has been activated
            cordova.plugins.backgroundMode.on('activate', function () {

                cordova.plugins.backgroundMode.disableWebViewOptimizations();

                console.log('bg mode activated');

                service.launchIntervalGeoloc();
            });

        }, false);
    };

    service.getPosition = function() {

        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        window.navigator.geolocation.getCurrentPosition(service.sendPosition, service.errorPosition, options);
    };

    service.sendPosition = function(coords) {

        position = {};
        position.latitude = coords.coords.latitude;
        position.longitude = coords.coords.longitude;
        position.timestamp = coords.timestamp;
        position.user = UserService.getUserFromStorage().id;

        $http({
            method: 'POST',
            url: TipeekConfig.apiUrl+'users/insertUserPosition',
            data: {position: position}

        }).then(function successCallback(response) {

            // alert('Le serveur a bien reçu ta positon ! Latitude : '+response.latitude+ ' et Longitude : '+response.longitude);
            // console.log(response);

        }, function errorCallback(response) {

        });
    };

    service.errorPosition = function(error) {
        console.log(error);
    };

    service.getAllPositions = function(userId, callback) {

        $http({
            method: 'POST',
            url: TipeekConfig.apiUrl+'users/user/positions',
            data: {userId: userId}

        }).then(function successCallback(response) {

            if(callback) callback(response);

        }, function errorCallback(response) {

        });
    };

    service.launchIntervalGeoloc = function() {

        service.getPosition();

        setInterval(function() {
            console.log('get position with background !!!');
            service.getPosition();
        }, 5000);
    };

    return service;
});
