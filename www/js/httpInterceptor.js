(function () {
    "use strict";
    angular.module('DEI').factory('Interceptor', Interceptor);

    Interceptor.$inject = ['$q', '$location', 'toastr'];
    function Interceptor($q, $location, toastr)
    {
        function request(request)
        {
            var vitae = dynamis.get('vitae');
            if(vitae && vitae.kaseyaSess)
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
            if(rejection.status === 401)
            {
                toastr.warning("Session expired", "Logout");
                $location.url('login');
            }
            return $q.reject(rejection);
        }

        return {
            'request': request,
            'response': response,
            'responseError': responseError
        };
    }

})();
