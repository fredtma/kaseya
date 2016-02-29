"use strict";
angular.module('DEI')
    .controller('organisationCreateCtrl', organisationCreateCtrl)
    .controller('organisationListCtrl', organisationListCtrl);

organisationListCtrl.$inject = ['myValue', 'resource','$scope', 'ScopeInit'];
function organisationListCtrl(myValue, resource, $scope, ScopeInit) {
    var Api  = resource.init('soap/organisation');

    ScopeInit.init($scope,alpha);

    function alpha($scope)
    {
        Api.get(orgList);
    }

    function orgList(response)
    {
        $scope.items = response.GetOrgsResult.Orgs.Org;//CustomerID,OrgId,OrgName,OrgRef
        myValue.setValue('organisations', $scope.items);
        $scope.model.total = $scope.items.length;
    }
}

organisationCreateCtrl.$inject = ['myValue', 'resource','$scope', 'ScopeInit'];
function organisationCreateCtrl(myValue, resource, $scope, ScopeInit) {
    var Api  = resource.init('soap/organisation');

    ScopeInit.init($scope,alpha);

    function alpha($scope)
    {
        $scope.item                 = {};
        $scope.model.default        = {"defaultMgName":"root", "defaultDeptName":"root"};
        $scope.model.orgType        = [
            {"id":-1,"label":"Bronze SLA"},
            {"id":2,"label":"Silver SLA"},
            {"id":4,"label":"Gold SLA"},
            {"id":3,"label":"Internal"},
            {"id":5,"label":"Key Account"},
            {"id":6,"label":"Machine Group"}
        ];
        $scope.model.methodOfContact= [{"id":1,"label":"Mail"}, {"id":2,"label":"Fax"}, {"id":3,"label":"Phone"}];
        $scope.model.orgParentRef   = myValue.getValue('organisations');
        $scope.call.submit          = submit;
    }

    function submit()
    {
        let key, value;
        sky.on('submitted');
        for(key in $scope.model.default){
            value = $scope.model.default[key];
            $scope.item[key] = $scope.item[key]||value;
        }
        Api.save($scope.item, responseCall);
        function responseCall(response)
        {
            sky.on('response', response);
        }
    }
}