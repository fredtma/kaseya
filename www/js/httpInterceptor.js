(function () {
    "use strict";
    angular.module('DEI').factory('Interceptor', Interceptor);

    Interceptor.$inject = ['$q', '$location', '$injector'];
    function Interceptor($q, $location, $injector)
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
            sky.error("Interpretor", rejection);
            if(rejection.status === 401)
            {
                sky.info("Session expired");
                var toastr = $injector.get('toastr');
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
