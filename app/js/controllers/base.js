(function(d, a) {
    'use strict';

    a.module('angularjs-groovy').controller(
        'baseCtrl',
        [
            '$s',
            '$scope',
            'viewData',
            function($s, $scope, viewData) {
                $scope.views = viewData.views;
                $scope.masterDetailActive = true;

                $scope.groovyColor = function() {
                    return ($s.header.color || $s.color).replace(' ', '-').toLowerCase();
                };

                $scope.toggleMasterDetail = function() {
                    $scope.masterDetailActive = !$scope.masterDetailActive;
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

                $scope.$watch('masterDetailActive', function() {
                    a.element(d.querySelectorAll(
                        '.groovy-master-detail, .groovy-view, .groovy-header'
                    ))[
                        $scope.masterDetailActive ? 'removeClass' : 'addClass'
                    ]('groovy-active');
                });
            }
        ]
    );
})(document, angular);
