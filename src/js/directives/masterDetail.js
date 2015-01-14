(function(a) {
    'use strict';

    a.module('angularjs-groovy').directive(
        'groovyMasterDetail',
        [
            '$s',
            '$sce',
            'viewData',
            function($s, $sce, viewData) {
                return viewData.setViewTemplate({ restrict: 'E' }, 'masterDetail');
            }
        ]
    );
})(angular);
