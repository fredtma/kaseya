(function () {
    "use strict";
    angular.module('DEI').factory('Interceptor', Interceptor);

    Interceptor.$inject = ['$q'];
    function Interceptor($q)
    {
        function request(request)
        {
            var vitae = dynamis.get('vitae');
            if(vitae.kaseyaSess)
            {
                request.headers['kaseya-sess']  = vitae.kaseyaSess;
                request.headers['kaseya-ip']    = vitae.ip;
            }
            return request;
        }

        function response(response)
        {
            return response;
        }

        function responseError(rejection)
        {
            return $q.reject(rejection);
        }

        return {
            'request': request,
            'response': response,
            'responseError': responseError
        };
    }

})();
