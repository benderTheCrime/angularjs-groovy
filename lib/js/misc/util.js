(function() {
    //'use strict';

    module.exports = {
        toBool: function(v) {
            return !!v.match(/y/i);
        },
        onErr: function(e) {
            console.log(arguments.callee.name);
            if (e) {
                throw new Error(e);
            }
        }
    };
})();
