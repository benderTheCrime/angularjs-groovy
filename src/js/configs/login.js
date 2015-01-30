(function(d, a) {
    'use strict';

    var H = require('handlebars');

    a.module('angularjs-groovy').config(
        [
            '$routeProvider',
            '$s',
            function($routeProvider, $s) {

                $routeProvider.when('/index', {
                    template: H.templates.base($s),
                    controller: 'baseCtrl',
                    resolve: {
                        factory: authenticate
                    }
                }).when('/login', {
                    template: H.templates.login($s),
                    controller: 'loginCtrl',
                    resolve: {
                        factory: bypass
                    }
                }).otherwise({
                    redirectTo: '/index'
                });

                function authenticate($rootScope, $location) {
                    if (!$s.useLogin || ($s.user || $rootScope.user)) {
                        return true;
                    } else {
                        $location.path('/login');
                    }
                }

                // The converse: if you're already on the login page and user exists
                function bypass($rootScope, $location) {
                    if ($s.useLogin && !$s.user && !$rootScope.user) {
                        a.element(d.querySelectorAll('.groovy-view')).remove();
                        return true;
                    } else {
                        $location.path('/index');
                    }
                }
            }
        ]
    );
})(document, angular);
