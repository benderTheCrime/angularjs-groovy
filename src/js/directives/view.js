(function(d, a) {
    'use strict';

    a.module('angularjs-groovy').directive(
        'ngGroovyView',
        [
            'viewData',
            function(viewData) {
                return {
                    restrict: 'A',
                    Controller: [ '^baseCtrl' ],
                    link: function(scope, element, attrs) {
                        scope.groovyViewId = viewData.views.length;

                        viewData.views.push({
                            id: scope.groovyViewId,
                            el: element,
                            name: attrs.ngGroovyViewName[0].toUpperCase() +
                                attrs.ngGroovyViewName.slice(1).toLowerCase(),
                            icon: attrs.ngGroovyViewIconUrl
                        });

                        element.addClass('groovy-view ng-' + (scope.groovyViewId === 0 ? 'show' : 'hide'));
                    }
                };
            }
        ]
    );
})(document, angular);
