(function(a) {
    'use strict';

    a.module('angularjs-groovy').directive(
        'groovyPageBased',
        [
            '$s',
            '$sce',
            'viewData',
            function($s, $sce, viewData) {
                return viewData.setViewTemplate({ restrict: 'E' }, 'pageBased');
            }
        ]
    );
})(angular);
