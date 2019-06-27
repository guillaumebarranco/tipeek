// This directive checks the image existence, else it replaces it with another picture

appDirective.directive('virgulizeObject', function($interpolate) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {

            attrs.$observe('value', function(value) {

                var text = $interpolate(value)(scope);
                var object = JSON.parse(text);

                var newText = "";

                for(var i in object) {

                    if(object[i]) {
                        newText += i+", ";
                    }
                }

                element.text(newText.slice(0, -2));
            });
        }
    };
});
