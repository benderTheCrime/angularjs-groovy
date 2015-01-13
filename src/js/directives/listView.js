(function(a) {
    'use strict';

    var H = require('handlebars');

    a.module('angularjs-groovy').directive(
        'ngGroovyListView',
        [
            '$s',
            '$compile',
            'viewData',
            'baseView',
            function($s, $compile, viewData, baseView) {
                var baseLink = baseView.link;
                return {
                    restrict: baseView.restrict,
                    Controller: baseView.Controller,
                    link: function(scope, element, attrs) {
                        element.addClass('groovy-list-view');
                        viewData.setViewOptions(
                            scope,
                            element,
                            attrs,
                            $compile(H.templates.listView({
                                name: attrs.ngGroovyViewName
                            }))(scope)
                        );
                        baseLink(scope, element, attrs);
                    }

                };
            }
        ]
    );
})(angular);
