angular.module('DEI.controllers', []).controller('loginCtrl',loginCtrl);

loginCtrl.$inject = ['resource','$scope', '$state'];
function loginCtrl(resource, $scope, $state) {

    $scope.item         = {};
    $scope.call         = {};
    $scope.model        = {};
    $scope.call.login   = login;
    var Api  = resource.init('soap');

    sky.jsonp("http://freegeoip.net/json/", function(response){
        $scope.$apply(function(){sky.on("IP", response);
            $scope.model.location = response;
        });
    });

    function login(){//ftshimanga@xpandit.co.za //Twenty16!
        var item    = $scope.item;
        var params  = {
            "UserName":         item.username,
            "CoveredPassword":  item.password,
            "RandomNumber":     Math.round(100000 * Math.random()),
            "BroswerIP":        $scope.model.location.ip,
            "HashingAlgorithm": "SHA-256"
        };

        Api.Post(params, function(response){
            sky.on('result', response);
            $state.go('main.dashboard');
        });
        //var action  = "Authenticate";
        //Soap.call(action,params).then(function(response){sky.on("SOAP", response);});//ajax soap no longer relevant
    }

}