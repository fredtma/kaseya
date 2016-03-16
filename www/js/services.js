angular.module('DEI.services', [])
.factory('help', help)
.factory('myValue', myValue)
.factory('resource', resource)
.factory('Soap', Soap)
.service('ScopeInit', ScopeInit);


help.$inject = ['toastr'];
function help(toastr)
{
    return {
        catchResponse:catchResponse
    };
    /**
     * catches an error in the response function
     * @param {response} response
     * @returns {undefined}
     */
    function catchResponse(response)
    {
        sky.error("An error has occured in the response", response.devMessage, response);
        if(response instanceof Error) return;

        var msg="", key;
        if(response.hasOwnProperty('data')){
            if(typeof response.data === "string" && response.data.length > 200) {
                msg += response.statusText+"\n\r";
                msg += $(response.data).find('.exception_title').text();
                if(msg.indexOf('TokenMismatchException')!==-1){
                    msg = "Your session has expired, you will now be logout";
                    $state.go('logout');
                }
            } else if (issets(response, 'data.data')) {
                var result = response.data;
                if (typeof result.success === "string") {
                    msg += result.success + "\n\r";
                }
                if (typeof result.message === "string") {
                    msg += result.message + "\n\r";
                }
                if (typeof result.data === "string") {
                    msg += result.data + "\n\r";
                }
            } else {
                for(key in response.data){
                    if(typeof response.data[key] === "string")msg += response.data[key]+"<br/>\n\r";
                    else if(response.data[key] instanceof Array && typeof response.data[key][0] === "string" )msg += response.data[key][0]+"<br/>\n\r";
                }
            }

        } else if(response.message) {
            msg += response.message;
        }
        toastr.error(msg);
    }
}


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
