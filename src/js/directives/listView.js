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
                return {
                    restrict: baseView.restrict,
                    priority: baseView.priority + 1,
                    Controller: baseView.Controller,
                    link: function(scope, element, attrs, settings) {
                        element.addClass('groovy-list-view');
                        viewData.setViewOptions(
                            scope,
                            element,
                            attrs,
                            $compile(H.templates.listView({
                                id: viewData.views.length - 1,
                                name: attrs.ngGroovyViewName,
                                settings: settings
                            }))(scope)
                        );

                        baseView.link(scope, element, attrs);
                    }
                };
            }
        ]
    );
})(angular);
