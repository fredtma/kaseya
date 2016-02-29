angular.module('DEI.services', [])
.factory('myValue', myValue)
.factory('resource', resource)
.factory('Soap', Soap)
.service('ScopeInit', ScopeInit);

myValue.$inject = [];
function myValue()
{
    var theValue = {};
    return {
        allValue: allValue,
        getValue: getValue,
        pullValue:pullValue,
        pushValue:pushValue,
        remValue: remValue,
        setValue: setValue
    };

    function allValue()
    {
        return theValue;
    }

    function getValue(key)
    {
        return theValue[key];
    }

    function pullValue(key, index, remove)
    {
        if(theValue[key] instanceof  Array && remove===true) theValue[key].splice(index, 1);
        else if(theValue[key] instanceof  Array) return theValue[key][index];
    }

    function pushValue(key, value)
    {
        if(theValue[key] instanceof  Array) theValue[key].push(value);
    }

    function remValue(key)
    {
        if(key) delete theValue[key];
        else theValue = {};
    }

    function setValue(key, value)
    {
        theValue[key] = value;
    }
}

Soap.$inject = ['$soap'];
function Soap($soap){
    var url = "http://support.xpandit.co.za/vsaWS/KaseyaWS.asmx";

    return {
        call: call
    };

    function call(action, params){
        return $soap.post(url,action,params);
    }
}


ScopeInit.$inject = [];
function ScopeInit(){

    this.init = init;

    function init($scope, callback)
    {
        $scope.call  = {};
        $scope.model = {};
        callback($scope);
    }
}

resource.$inject = ['$resource'];
function resource($resource){
    var site    = dynamis.get('site');
    var factory = {};
    var ACTIONS = {
        "post":     {"method": "POST", "responseType": "json"},
        "update":   {"method": "PUT"},
        "cache":    {"method": "GET", "isArray":true, "responseType":"json"},
        "cached":   {"method": "GET", "isArray":false, "responseType":"json"},
        "admin":    {"url":site.api+'admin/:id',"method":"GET", "params":{id:"@_id"}, "isArray":true, "responseType":"json"}
    };
    factory.init= init;
    return factory;

    function init(url, params, actions){
        actions = angular.extend(ACTIONS, actions); sky.on(site.api+url);
        return factory.serve = $resource(site.api+url, params, actions);
    }

    function itemRemove(url, slug){

    }
}
