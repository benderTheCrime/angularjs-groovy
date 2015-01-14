(function(a) {
    'use strict';

    a.module('angularjs-groovy').directive(
        'groovyHeader',
        [
            '$s',
            '$sce',
            'viewData',
            function($s, $sce, viewData) {
                return viewData.setViewTemplate({ restrict: 'E' }, 'header');
            }
        ]
    );
})(angular);
