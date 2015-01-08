(function(a) {
    'use strict';

    a.module('angularjs-groovy').controller(
        'baseCtrl',
        [
            '$s',
            '$scope',
            'viewData',
            function($s, $scope, viewData) {
                $scope.views = viewData.views;

                $scope.groovyColor = function() {
                    return $s.header.color.replace(' ', '-').toLowerCase();
                };

                $scope.isActiveGroovyView = function(id) {
                    return id === viewData.activeViewId;
                };

                $scope.setActiveGroovyView = function(id) {
                    viewData.setActiveView(id);
                    a.forEach(viewData.views, function(v) {
                        if (v.id === viewData.activeViewId) {
                            v.el.removeClass('ng-hide').addClass('ng-show');
                        } else {
                            v.el.removeClass('ng-show').addClass('ng-hide');
                        }
                    });
                };
            }
        ]
    );
})(angular);
