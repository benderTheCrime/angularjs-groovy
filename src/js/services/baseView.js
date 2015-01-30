(function(a) {
    'use strict';

    a.module('angularjs-groovy').service(
        'baseView',
        [
            '$rootScope',
            '$log',
            'viewData',
            function($rootScope, $log, viewData) {

                /**
                 * @ngdoc service
                 * @name angularjs-groovy.baseView
                 * @description Set an object representing the base settings of
                 * a directive
                 */
                return {
                    restrict: 'A',
                    priority: 999,
                    Controller: [ '^baseCtrl', '^viewCtrl' ],
                    link: function(scope, element, attrs) {
                        var id = viewData.views.length;
                        scope = a.extend(scope, {
                            groovyViewId: id,
                            setActiveGroovyView: function(id) {
                                $log.debug('Groovy: Trigger swipe event');
                                viewData.setActiveView(id);
                            },
                            setMasterDetailActive: function(bool) {
                                $log.debug('Groovy: Trigger swipe event');
                                $rootScope.masterDetailActive = bool;
                            }
                        });

                        viewData.views.push({
                            id: id,
                            el: element,
                            name: attrs.ngGroovyViewName[0].toUpperCase() +
                            attrs.ngGroovyViewName.slice(1).toLowerCase(),
                            icon: attrs.ngGroovyViewIconUrl
                        });
                        $log.debug('Groovy: Added view to Groovy views');

                        viewData.setViewSwipeProperties(scope, element, attrs, id);

                        element.addClass('groovy-view ng-' + (id === 0 ? 'show' : 'hide'));
                    }
                };
            }
        ]
    );
})(angular);
