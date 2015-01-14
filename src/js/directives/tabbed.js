(function(a) {
    'use strict';

    a.module('angularjs-groovy').directive(
        'groovyTabbed',
        [
            '$s',
            '$sce',
            'viewData',
            function($s, $sce, viewData) {
                return viewData.setViewTemplate({ restrict: 'E' }, 'tabbed');
            }
        ]
    );
})(angular);
