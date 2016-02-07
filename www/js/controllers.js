angular.module('DEI.controllers', [])
    .controller('agentCreateCtrl',agentCreateCtrl)
    .controller('agentListCtrl',agentListCtrl)
    .controller('dashboardCtrl',dashboardCtrl)
    .controller('loginCtrl',loginCtrl)
    .controller('mainCtrl',mainCtrl)
    .controller('organisationCreateCtrl', organisationCreateCtrl)
    .controller('organisationListCtrl', organisationListCtrl)
    .controller('settingsCtrl', settingsCtrl)
    .controller('usersListCtrl', usersListCtrl);


agentCreateCtrl.$inject = ['$scope'];
function agentCreateCtrl($scope) {}

agentListCtrl.$inject = ['$scope'];
function agentListCtrl($scope) {}

dashboardCtrl.$inject = ['$scope'];
function dashboardCtrl($scope) {}

loginCtrl.$inject = ['$scope'];
function loginCtrl($scope) {}

mainCtrl.$inject = ['$scope'];
function mainCtrl($scope) {}

organisationCreateCtrl.$inject = ['$scope'];
function organisationCreateCtrl($scope) {}

organisationListCtrl.$inject = ['$scope'];
function organisationListCtrl($scope) {}

settingsCtrl.$inject = ['$scope'];
function settingsCtrl($scope) {}

usersListCtrl.$inject = ['$scope'];
function usersListCtrl($scope) {}

 