'use strict';

angular.module('mean.core').value('bsErrorMessages', {
    'required': 'This field is required!',
    'email': 'This field has to be a valid email address!',
    'url': 'This field has to be a valid URL!',
    'number': 'This field has to be a number!'
});

angular.module('mean.core').directive('formGroup', [ 'bsErrorMessages', function (bsErrorMessages) {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'core/views/directives/form-group.html',
        replace: true,
        scope: {
            label: '@',
            errorMessages: '='
        },
        controller: ['$scope', '$element', '$attrs', function ($scope) {
            if ($scope.errorMessages) {
                $scope.$errorMessages = angular.copy($scope.errorMessages);
            } else {
                $scope.$errorMessages = {};
            }

            $scope.$errorMessages = angular.extend(angular.copy(bsErrorMessages), $scope.$errorMessages);

            this.setField = function (field) {
                $scope.$field = field;
            };

            $scope.$watch('$field.$dirty && $field.$error', function (errorList) {
                $scope.$fieldErrors = [];
                angular.forEach(errorList, function (invalid, key) {
                    if (invalid) {
                        $scope.$fieldErrors.push(key);
                    }
                });
            }, true);
        }]
    };
}
]);

angular.module('mean.core').directive('formControl', [
    function () {
        return {
            require: ['ngModel', '^formGroup'],
            link: function (scope, element, attrs, ctrls) {
                ctrls[1].setField(ctrls[0]);
                element.addClass('form-control');
            }
        };
    }
]);

// directive that prevents submit if there are still form errors
angular.module('mean.core').directive('validSubmit', [ '$parse', function ($parse) {
    return {
        // we need a form controller to be on the same element as this directive
        // in other words: this directive can only be used on a &lt;form&gt;
        require: 'form',
        // one time action per form
        link: function (scope, element, iAttrs, form) {
            form.$submitted = false;
            // get a hold of the function that handles submission when form is valid
            var fn = $parse(iAttrs.validSubmit);

            // register DOM event handler and wire into Angular's lifecycle with scope.$apply
            element.on('submit', function (event) {
                scope.$apply(function () {
                    // on submit event, set submitted to true (like the previous trick)
                    form.$submitted = true;
                    // if form is valid, execute the submission handler function and reset form submission state
                    if (form.$valid) {
                        fn(scope, { $event: event });
                        form.$submitted = false;
                    }
                });
            });
        }
    };
}]);