(function(d, a) {
    'use strict';

    a.module('angularjs-groovy').controller(
        'loginCtrl',
        [
            '$rootScope',
            '$log',
            '$s',
            '$scope',
            function($rootScope, $log, $s, $scope) {
                $scope = a.extend($scope, {
                    groovyColor: function() {
                        return ($s.header && $s.header.color) || $s.color ?
                        ($s.header.color || $s.color).replace(' ', '-').toLowerCase() : '';
                    },
                    toggleSignUp: function() {
                        $rootScope.signUpActive = !$rootScope.signUpActive;
                    },
                    signUp: {
                        action: angular.noop
                    },
                    login: {
                        action: angular.noop,
                        forget: angular.noop
                    }
                });

                $rootScope.$watch('signUpActive', function() {
                    a.element(d.querySelectorAll(
                        '.groovy-login, .groovy-sign-up'
                    ))[
                        $scope.signUpActive ? 'addClass' : 'removeClass'
                    ]('groovy-active');
                    $log.debug('Groovy: Changed signUpActive');
                });

                $log.debug('Groovy: Instantiated login $scope methods');
            }
        ]
    );
})(document, angular);
