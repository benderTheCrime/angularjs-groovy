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
        },
        trashKeys: function(obj, keys) {
            for (var i = keys.length - 1; i >= 0; --i) {
                var key = keys[i];
                if (obj.hasOwnProperty(key)) {
                    delete obj[key];
                } else {
                    continue;
                }
            }
            return obj;
        }
    };
})();
