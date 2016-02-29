angular.module('DEI.controllers', [])
    .controller('dashboardCtrl',dashboardCtrl)
    .controller('mainCtrl',mainCtrl)
    .controller('settingsCtrl', settingsCtrl);


dashboardCtrl.$inject = ['$scope'];
function dashboardCtrl($scope) {}

mainCtrl.$inject = ['$scope'];
function mainCtrl($scope) {}

settingsCtrl.$inject = ['$scope'];
function settingsCtrl($scope) {}


 