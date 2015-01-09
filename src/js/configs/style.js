(function(d, a) {
    'use strict';

    module.exports = function(m) {
        m.config(
            [
                'conf',
                function(conf) {

                    /**
                    * Your already in the service, which means that we need to
                    * manage attachment of the required styles
                    */
                    var scripts = a.element(d.head.children),
                    path;

                    // Get the relative path
                    a.forEach(scripts, function(v) {
                        if (v.src && !!~v.src.indexOf('angularjs-groovy')) {
                            path = v.src.replace(v.src.split('/').pop(), '');
                        } else if (v.href && ~conf.requiredStyles.indexOf(v.href)) {
                            conf.requiredStyles.splice(conf.requiredStyles.indexOf(v.href), 1);
                        }
                    });
                    a.forEach(conf.requiredStyles, function(v) {
                        var link = d.createElement('link');
                        link.rel = 'stylesheet';
                        link.href = ~v.indexOf('http') ? v : path + v;

                        d.head.insertBefore(link, d.head.children[0]);
                    });
                }
            ]
        );
    };
})(document, angular);
