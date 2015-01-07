(function(a) {
    'use strict';

    a.module('angularjs-groovy').controller(
        'baseCtrl',
        [
            '$s',
            '$scope',
            function($s, $scope) {
                $scope.groovyColor = function() {
                    return $s.header.color.replace(' ', '-').toLowerCase();
                };
            }
        ]
    );
})(angular);
