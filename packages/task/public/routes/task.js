'use strict';

angular.module('mean.task').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('task example page', {
            url: '/task/example',
            templateUrl: 'task/views/index.html'
        });
    }
]);
