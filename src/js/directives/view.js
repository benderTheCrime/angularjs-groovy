(function(d, a) {
    'use strict';

    a.module('angularjs-groovy').directive(
        'ngGroovyView',
        [
            'viewData',
            'baseView',
            function(viewData, baseView) {
                return baseView;
            }
        ]
    );
})(document, angular);
