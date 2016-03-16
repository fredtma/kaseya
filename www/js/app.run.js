(function () {
    "use strict";
    angular.module('DEI').run(run);

    run.$inject = ["$ionicPlatform", "$ionicAnalytics", "$rootScope", "$state"];
    function run($ionicPlatform, $ionicAnalytics, $rootScope, $state) {

        $ionicPlatform.ready(function () {
            //Save user
            Ionic.io();
            var user = Ionic.User.current();
            var debug= dynamis.get('site').debug;
            if(!user.id){
                user.id = Ionic.User.anonymousId();
            }
            user.set('debug', debug);
            user.save();
            //capture analytics
            $ionicAnalytics.register({
                "dryRun": dynamis.get('site').debug
            });
            if(!debug) {
                $ionicAnalytics.setDispatchInterval(60);
                //ionic.keyboard.disable();
            }

            ionic.Platform.isFullScreen = true;
            if (ionic.Platform.isWebView() && isset(navigator.splashscreen)) navigator.splashscreen.hide();
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard for form inputs)
            if (issets(window, 'cordova.plugins.keyboard')) { sky.on("Keyboard");
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(false);
            }

            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
        //$location.path('/dash');

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            let user = userProfile();
            if(!user && toState.name!=="login" && toState.name!=="logout" && toState.name!=="reset"){
                event.preventDefault();
                logoff("You are not currently authenticated", $rootScope, $state, 'login');
            }
        });

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            var scp = _$('ion-footer-bar').scope();
            if(scp) scp.search = '';
        });
    }
})();