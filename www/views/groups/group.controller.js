"use strict";
angular.module('DEI')
    .controller('groupCreateCtrl', groupCreateCtrl)
    .controller('groupListCtrl', groupListCtrl);

groupListCtrl.$inject = ['resource','$scope', 'ScopeInit'];
function groupListCtrl(resource, $scope, ScopeInit) {
    var Api  = resource.init('soap/group');

    ScopeInit.init($scope,alpha);

    function alpha($scope)
    {
        Api.get(groupList);
    }

    function groupList(response)
    {
        $scope.items = response.GetMachineGroupListResult.MachineGroups.groupName;
        $scope.model.total = $scope.items.length;
    }
}

groupCreateCtrl.$inject = ['resource','$scope', '$state'];
function groupCreateCtrl(resource, $scope, $state) {

}