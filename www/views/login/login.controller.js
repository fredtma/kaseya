"use strict";
angular.module('DEI').controller('loginCtrl',loginCtrl);

loginCtrl.$inject = ['resource','$scope', '$state'];
function loginCtrl(resource, $scope, $state)
{
    $scope.item         = {};
    $scope.call         = {};
    $scope.model        = {location:{}};
    $scope.call.login   = login;
    var Api             = resource.init('soap');

    sky.jsonp("http://freegeoip.net/json/", function(response){sky.on("IP Address", response);
        $scope.$apply(function(){
            $scope.model.location = response;
        });
    });

    function login()
    {
        var item    = $scope.item;
        var params  = {
            "UserName":         item.username,
            "CoveredPassword":  item.password,
            "RandomNumber":     Math.round(100000 * Math.random()),
            "BroswerIP":        $scope.model.location.ip,
            "HashingAlgorithm": "SHA-256"
        };

        Api.post(params, function(response){
            var vitae   = {'kaseyaSess':response.AuthenticateResult.SessionID, 'ip':$scope.model.location.ip,'username':item.username};
            userProfile(vitae);
            $state.go('main.dashboard');
        });
        //var action  = "Authenticate";
        //Soap.call(action,params).then(function(response){sky.on("SOAP", response);});//ajax soap no longer relevant
    }

}