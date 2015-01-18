(function(d, a) {
    'use strict';

    a.module('angularjs-groovy').controller(
        'baseCtrl',
        [
            '$rootScope',
            '$log',
            '$s',
            '$timeout',
            '$scope',
            'viewData',
            function($rootScope, $log, $s, $timeout, $scope, viewData) {
                $scope = a.extend($scope, {
                    views: viewData.views,
                    header: {
                        title: $s.header ? $s.header.title : $s.appName ? $s.appName : ''
                    },
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
                    }
                });

                $rootScope.$watch('masterDetailActive', function() {
                    if ($s.masterDetail) {
                        a.element(d.querySelectorAll(
                            '.groovy-master-detail, .groovy-view, .groovy-header'
                        ))[
                        $scope.masterDetailActive ? 'addClass' : 'removeClass'
                        ]('groovy-active');
                        $log.debug('Groovy: Changed masterDetailActive');
                    }
                });

                $log.debug('Groovy: Instantiated base $scope methods');
            }
        ]
    );
})(document, angular);

// TODO split into many controllers
