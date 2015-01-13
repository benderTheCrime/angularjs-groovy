(function(d, a) {
    'use strict';

    a.module('angularjs-groovy').controller(
        'loginCtrl',
        [
            '$rootScope',
            '$s',
            '$scope',
            function($rootScope, $s, $scope) {
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
                });
            }
        ]
    );
})(document, angular);
