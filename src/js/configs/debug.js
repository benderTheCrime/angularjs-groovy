(function(a) {
    'use strict';

    a.module('angularjs-groovy').config(
        [
            '$s',
            '$logProvider',
            function($s, $logProvider) {
                if (!$s.debug) {
                    $logProvider.debugEnabled(false);
                }
            }
        ]
    );
})(angular);
