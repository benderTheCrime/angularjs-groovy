(function() {
    'use strict';

    module.exports = function(H) {
        H.registerHelper('ifor', function(v1, v2, options) {
            if (v1 || v2) {
                return options.fn(this);
            }
            return options.inverse(this);
        });
    };
})();
