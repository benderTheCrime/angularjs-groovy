(function() {
    'use strict';

    module.exports = {
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
