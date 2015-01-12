(function(a) {
    'use strict';

    a.module('angularjs-groovy').directive(
        'ngGroovyListView',
        [
            '$s',
            '$compile',
            'Handlebars',
            'viewData',
            'baseView',
            function($s, $compile, Handlebars, viewData, baseView) {
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
                            $compile(Handlebars.templates.listView({
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
