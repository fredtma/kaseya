(function () {
    'use strick';
    angular.module('DEI')
        .config(config);

    config.$inject = [
        "$compileProvider", "$ionicAutoTrackProvider", "$ionicConfigProvider", "$stateProvider", "$urlRouterProvider"
    ];
    function config($compileProvider, $ionicAutoTrackProvider, $ionicConfigProvider, $stateProvider, $urlRouterProvider) {
        $ionicConfigProvider.templates.maxPrefetch(10);
        $ionicConfigProvider.views.maxCache(10);
        $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob|content):|data:image\//);
        $ionicAutoTrackProvider.disableTracking('Tap');
        $ionicAutoTrackProvider.disableTracking('State Change');

        $stateProvider
        .state('login', {
            url: '/login',
            views:{
                "root":{
                    templateUrl: 'views/login/login.html',
                    controller: 'loginCtrl'
                }
            }
        })
        .state('main', {
            url: "/main",
            abstract: true,
            views:{
                "root":{
                    templateUrl: "views/main.html",
                    controller: 'mainCtrl'
                }
            }
        })
        .state('main.dashboard', {
            url: '/dashboard',
            views:{
                "content@main":{
                    templateUrl: 'views/dash/dashboard.html',
                    controller: 'dashboardCtrl'
                }
            }
        })
        .state('main.agent', {url: "/agent", abstract: "true", template: "<ui-view></ui-view>"})
        .state('main.agent.create', {
            url: '/create',
            views:{
                "content@main":{
                    templateUrl: 'views/agent/agent.create.html',
                    controller: 'agentCreateCtrl'
                }
            }
        })
        .state('main.agent.list', {
            url: '/list',
            views:{
                "content@main":{
                    templateUrl: 'views/agent/agent.list.html',
                    controller: 'agentListCtrl'
                }
            }
        })
        .state('main.organisation', {url: "/organisation", abstract: "true", template: "<ui-view></ui-view>"})
        .state('main.organisation.create', {
            url: '/create',
                views:{
                    "content@main":{
                        templateUrl: 'views/organisation/organisation.create.html',
                        controller: 'organisationCreateCtrl'
                    }
                }
        })
        .state('main.organisation.list', {
            url: '/list',
            views:{
                "content@main":{
                    templateUrl: 'views/organisation/organisation.list.html',
                    controller: 'organisationListCtrl'
                }
            }
        })
        .state('main.users', {url: "/users", abstract: "true", template: "<ui-view></ui-view>"})
        .state('main.users.list', {
            url: '/list',
            views:{
                "content@main":{
                    templateUrl: 'views/users/users.list.html',
                    controller: 'usersListCtrl'
                }
            }
        })
        .state('settings', {
            url: '/settings',
            views:{
                "content@main":{
                    templateUrl: 'views/settings/settings.html',
                    controller: 'settingsCtrl'
                }
            }
        });
        $urlRouterProvider.otherwise('/login');

    }
})();
