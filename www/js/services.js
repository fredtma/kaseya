angular.module('DEI.services', [])

.factory('Soap', Soap)
.factory('resource', resource)
.service('SoapV1', SoapV1);

Soap.$inject = ['$soap']
function Soap($soap){
    var url = "http://support.xpandit.co.za/vsaWS/KaseyaWS.asmx";

    return {
        call: call
    };

    function call(action, params){
        return $soap.post(url,action,params);
    }
}


SoapV1.$inject = ['$resource'];
function SoapV1($resource){
}

resource.$inject = ['$resource'];
function resource($resource){
    var site    = dynamis.get('site');
    var factory = {};
    var ACTIONS = {
        "resend":   {"method": "POST", "url":site.api+'pages/:view/:id/resend', "cache": true, "responseType": "json"},
        "update":   {"method": "PUT"},
        "cache":    {"method": "GET", "isArray":true, "responseType":"json"},
        "cached":   {"method": "GET", "isArray":false, "responseType":"json"},
        "admin":    {"url":site.api+'admin/:id',"method":"GET", "params":{id:"@_id"}, "isArray":true, "responseType":"json"}
    };
    factory.init= init;
    return factory;

    function init(url, params, actions){
        actions = angular.extend(ACTIONS, actions);
        return factory.serve = $resource(site.api+url, params, actions);
    }

    function itemRemove(url, slug){

    }
}
