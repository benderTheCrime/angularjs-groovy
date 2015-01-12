(function(a) {
    'use strict';

    a.module('angularjs-groovy').config(
        [
            '$routeProvider',
            '$s',
            function($routeProvider, $s) {
                // TODO get name of login html page, if not specified, try html/login.html, or login.html use promises



                $routeProvider.when('/blah', {
                    resolve: function($q, $location) {
                            var deferred = $q.defer();
                            deferred.resolve();
                            if (true) {
                                $location.path('html/login.html');
                            }

                            return deferred.promise;
                        }
                    }).when('/login', {
                    templateUrl: 'html/login.html',
                    controller: ''
                }).otherwise({
                    redirectTo: '/blah'
                });

                // IF INDEX LOAD THE BASE IN - RESOLVE BASED ON CRITERIA
                // IF LOGIN LOAD THE LOGIN IN - RESOLIVE BASED ON REVERSE CRITERIA
                // OTHERWISE REDIRECT TO INDEX
                // MEET SOME LOGIN CRITERIA OR REDIRECT TO HTML/LOGIN or LOGIN.HTML
            }
        ]
    );
})(angular);

// TODO check if theoretical login location exists
// TODO user definition of logged in state
