"use strict";
angular.module('DEI')
    .controller('usersListCtrl',usersListCtrl);


usersListCtrl.$inject = ['resource', '$scope', 'ScopeInit'];
function usersListCtrl(resource, $scope, ScopeInit)
{
    var Api  = resource.init('soap/users');
    ScopeInit.init($scope,alpha);

    function alpha()
    {
        Api.get(userList);
    }

    function userList(response) {
        sky.on('response', response);
    }

}