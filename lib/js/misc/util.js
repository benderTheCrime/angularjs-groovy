(function() {
    'use strict';

    module.exports = {
        toBool: function(v) {
            return !!v.match(/y/i);
        },
        onErr: function(e) {
            if (e) {
                throw new Error(e);
            }
        }
    };
})();
