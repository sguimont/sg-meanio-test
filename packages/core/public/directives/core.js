'use strict';

angular.module('mean.core').value('bsErrorMessages', {
    'required': 'ERROR.FIELD_REQUIRED',
    'email': 'ERROR.INVALID_EMAIL',
    'url': 'ERROR.INVALID_URL',
    'number': 'ERROR.INVALID_NUMBER',
    'minlength': 'ERROR.MIN_LENGTH'
});

angular.module('mean.core').factory('myCustomErrorMessageResolver', [
    '$q', '$translate',
    function ($q, $translate) {
        /**
         * @ngdoc function
         * @name defaultErrorMessageResolver#resolve
         * @methodOf defaultErrorMessageResolver
         *
         * @description
         * Resolves a validate error type into a user validation error message
         *
         * @param {String} errorType - The type of validation error that has occurred.
         * @param {Element} el - The input element that is the source of the validation error.
         * @returns {Promise} A promise that is resolved when the validation message has been produced.
         */
        var resolve = function (errorType, el) {
            var parameters = [],
                parameter;

            if (el && el.attr) {
                try {
                    parameter = el.attr(errorType);
                    if (parameter === undefined) {
                        parameter = el.attr('data-ng-' + errorType) || el.attr('ng-' + errorType);
                    }
                    parameters.push(parameter || '');
                } catch (e) {
                    console.error(e);
                }
            }

            return $translate('ERROR.' + errorType, {'arg': parameters[0]});
        };

        return {
            resolve: resolve
        };
    }
]);

angular.module('mean.core').directive('formGroup', [ 'bsErrorMessages', 'validator', 'myCustomErrorMessageResolver', function (bsErrorMessages, validator, myCustomErrorMessageResolver) {
    validator.setErrorMessageResolver(myCustomErrorMessageResolver.resolve);

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
//            if ($scope.errorMessages) {
//                $scope.$errorMessages = angular.copy($scope.errorMessages);
//            } else {
//                $scope.$errorMessages = {};
//            }
//
//            $scope.$errorMessages = angular.extend(angular.copy(bsErrorMessages), $scope.$errorMessages);
//            $scope.$errorArg = null;

            this.setField = function (field) {
                $scope.$field = field;
            };

//            $scope.$watch('$field.$dirty && $field.$error', function (errorList) {
//                $scope.$fieldErrors = [];
//                angular.forEach(errorList, function (invalid, key) {
//                    if (invalid) {
//                        $scope.$fieldErrors.push(key);
//                    }
//                });
//            }, true);
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