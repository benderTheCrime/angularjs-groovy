(function(a) {
    'use strict';

    var H = require('handlebars');

    a.module('angularjs-groovy').directive(
        'ngGroovyImageGridView',
        [
            '$s',
            '$compile',
            'viewData',
            'baseView',
            function($s, $compile, viewData, baseView) {
                return {
                    restrict: baseView.restrict,
                    Controller: baseView.Controller,
                    link: function(scope, element, attrs) {
                        var name = attrs.ngGroovyViewName;
                        element.addClass('groovy-grid-view');
                        viewData.setViewOptions(
                            scope,
                            element,
                            attrs,
                            $compile(H.templates.grid({
                                name: name
                            }))(scope)
                        );
                        baseView.link(scope, element, attrs);
                    }

                };
            }
        ]
    );
})(angular);
