'use strict';

angular.module('mean.core').controller('CoreController', ['$scope', 'Global', 'Core',
    function ($scope, Global, Core) {
        $scope.global = Global;
        $scope.package = {
            name: 'core'
        };

        $scope.user = {};

        $scope.sendForm = function () {
            alert('form valid, sending request...');
        };
    }
]);
