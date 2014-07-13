'use strict';

angular.module('mean.task').controller('TaskController', ['$scope', 'Global', 'Task',
    function($scope, Global, Task) {
        $scope.global = Global;
        $scope.package = {
            name: 'task'
        };
    }
]);
