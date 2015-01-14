(function(d, a) {
    'use strict';

    a.module('angularjs-groovy').controller(
        'viewCtrl',
        [
            '$s',
            '$scope',
            'viewData',
            function($s, $scope, viewData) {
                $scope.views = viewData.views;
            }
        ]
    );
})(document, angular);
