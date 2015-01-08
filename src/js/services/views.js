(function(a) {
    'use strict';

    a.module('angularjs-groovy').service('viewData', function() {
        return {
            views: [],
            activeViewId: 0,
            setActiveView: function(id) {
                this.activeViewId = id;
            }
        };
    });
})(angular);
