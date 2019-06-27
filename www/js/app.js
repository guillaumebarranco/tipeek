/* 
 * This file instanciate the angular module with the plugins
 * It also handles routage and directives
 */

angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers', 'starter.services', 'starter.directives', 'ui.mask'])

.run(function($ionicPlatform) {

    $ionicPlatform.ready(function() {

        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)

        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }

        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    .state('index', {
        url: '/index',
        templateUrl: 'templates/index.html',
        controller: 'IndexCtrl'
    })

    .state('connected', {
        url: '/connected',
        templateUrl: 'templates/connected.html',
        controller: 'ConnectedCtrl'
    })

    .state('register', {
        url: '/register',
        templateUrl: 'templates/register.html',
        controller: 'RegisterCtrl'
    })

    .state('research', {
        url: '/research',
        templateUrl: 'templates/research.html',
        controller: 'ResearchCtrl'
    })

    .state('announce', {
        url: '/announce',
        templateUrl: 'templates/announce.html',
        controller: 'AnnounceCtrl'
    })

    .state('profile', {
        url: '/profile',
        templateUrl: 'templates/profile.html',
        controller: 'ProfileCtrl'
    })

    .state('comments', {
        url: '/comments',
        templateUrl: 'templates/comments.html',
        controller: 'CommentsCtrl'
    })

    .state('likes', {
        url: '/likes',
        templateUrl: 'templates/appartments/likes.html',
        controller: 'LikesCtrl'
    })

    .state('view', {
        url: '/view',
        templateUrl: 'templates/appartments/view.html',
        controller: 'ViewAppartmentCtrl'
    })

    .state('menu-announcer', {
        url:'/menu-announcer',
        templateUrl:"templates/menu-profile-announcer/main-menu-announcer.html",
        controller:'MenuAnnouncerCtrl'
    })

     .state('properties-announcer', {
        url:'/properties-announcer',
        templateUrl:'templates/menu-profile-announcer/my-properties.html',
        controller:'PropertiesAnnouncerCtrl'
    })   

      .state('messages-announcer', {
        url:'/messages-announcer',
        templateUrl:'templates/menu-profile-announcer/messages.html',
        controller:'MessagesAnnouncerCtrl'
    }) 

      .state('settings-announcer', {
        url:'/settings-announcer',
        templateUrl:'templates/menu-profile-announcer/settings.html',
        controller:'SettingsAnnouncerCtrl'
    }) 
          
    .state('menu-client', {
        url:'/menu-client',
        templateUrl:'templates/menu-profile-client/main-menu-client.html',
        controller:'MenuClientCtrl'
    })

    .state('properties-client', {
        url:'/properties-client',
        templateUrl:'templates/menu-profile-client/my-properties.html',
        controller:'PropertiesClientCtrl'
    })

    .state('messages-client', {
        url:'/messages-client',
        templateUrl:'templates/menu-profile-client/messages.html',
        controller:'MessagesClientCtrl'
    })

    .state('profile-edit', {
        url:'/profile-edit',
        templateUrl:'templates/menu-profile-client/profile-edit.html',
        controller:'ProfileEditClientCtrl'
    })

    .state('search-edit', {
        url:'/search-edit',
        templateUrl:'templates/menu-profile-client/search-edit.html',
        controller:'SearchEditCtrl'
    })

    .state('settings-client', {
        url:'/settings-client',
        templateUrl:'templates/menu-profile-client/settings.html',
        controller:'SettingsClientCtrl'
    })

      .state('help', {
        url:'/help',
        templateUrl:'templates/help.html',
        controller:'HelpCtrl'
    }) 

      .state('share', {
        url:'/share',
        templateUrl:'templates/share.html',
        controller:'ShareCtrl'
    }) 

      .state('about', {
        url:'/about',
        templateUrl:'templates/about.html',
        controller:'ShareCtrl'
    }) 

      .state('messages', {
        url:'/messages',
        templateUrl:'templates/messages.html',
        controller:'MessagesCtrl'
    }) 

      .state('view-details', {
        url:'/view-details',
        templateUrl:'templates/appartments/view-details.html',
        controller:'ViewDetailsCtrl'
    }) 

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/index');
})

.directive('appMap', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/map.html',
        controller: 'MapCtrl'
    };
})

.directive('bottomMenu', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/bottom-menu.html',
        controller: 'BottomMenuCtrl'
    };
})

.directive('appList', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/appartments/list.html',
        controller: 'ListCtrl'
    };
})

.directive('appFiltersList', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/appartments/filtersList.html',
        controller: 'filtersListCtrl'
    };
})

;
