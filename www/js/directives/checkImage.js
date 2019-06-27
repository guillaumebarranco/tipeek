// This directive checks the image existence, else it replaces it with another picture

appDirective.directive('checkImage', ['$http', function($http) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {

            console.log('ok');

            attrs.$observe('ngSrc', function(ngSrc) {
                $http.get(ngSrc).success(function(){
                    console.log(element.attr('src'));
                }).error(function(){
                    console.log(element.attr('src'));
                    element.attr('src', 'img/appart.png'); // set default image
                });
            });
        }
    };
}]);
