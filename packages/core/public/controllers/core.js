'use strict';

angular.module('mean.core').controller('CoreController', ['$scope', 'Global', 'Core', '$translate',
    function ($scope, Global, Core, $translate) {
        $scope.global = Global;
        $scope.package = {
            name: 'core'
        };

        $scope.user = {};

        $scope.sendForm = function () {
            alert('form valid, sending request...');
        };

        $scope.changeLanguage = function (key) {
            $translate.use(key);
        };
    }
]);
