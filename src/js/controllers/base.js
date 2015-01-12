(function(d, a) {
    'use strict';

    a.module('angularjs-groovy').controller(
        'baseCtrl',
        [
            '$rootScope',
            '$s',
            '$timeout',
            '$scope',
            'viewData',
            function($rootScope, $s, $timeout, $scope, viewData) {
                $scope = a.extend($scope, {
                    views: viewData.views,
                    groovyColor: function() {
                        return ($s.header && $s.header.color) || $s.color ?
                            ($s.header.color || $s.color).replace(' ', '-').toLowerCase() : '';
                    },
                    toggleMasterDetail: function() {
                        $rootScope.masterDetailActive = !$rootScope.masterDetailActive;
                    },
                    isActiveGroovyView: function(id) {
                        return id === viewData.activeViewId;
                    },
                    setActiveGroovyView: function(id) {
                        viewData.setActiveView(id);
                        for (var i = 0; i < viewData.views.length; ++i) {
                            var view = viewData.views[i];
                            if (view.id === viewData.activeViewId) {
                                view.el.removeClass('ng-hide').addClass('ng-show');
                            } else {
                                view.el.removeClass('ng-show').addClass('ng-hide');
                            }
                        }
                        $timeout(function() {
                            $rootScope.masterDetailActive = false;
                        }, 200);
                    }
                });

                $rootScope.$watch('masterDetailActive', function() {
                    a.element(d.querySelectorAll(
                        '.groovy-master-detail, .groovy-view, .groovy-header'
                    ))[
                    $scope.masterDetailActive ? 'addClass' : 'removeClass'
                    ]('groovy-active');
                });
            }
        ]
    );
})(document, angular);

// TODO split into many controllers
