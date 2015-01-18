(function(w, d, a) {
    'use strict';

    a.module('angularjs-groovy').config(
        [
            '$s',
            'conf',
            function($s, conf) {

                /**
                * Your already in the service, which means that we need to
                * manage attachment of the required styles
                */
                if ($s.useStyle !== false) {
                    var scripts = a.element(d.head.children),
                        path,
                        i;

                    // Get the relative path
                    for (i = scripts.length - 1; i >= 0; --i) {
                        var script = scripts[i];
                        if (script.src && !!~script.src.indexOf('angularjs-groovy')) {
                            path = script.src.replace(script.src.split('/').pop(), '');
                        } else if (script.href && ~conf.requiredStyles.indexOf(script.href)) {
                            conf.requiredStyles.splice(conf.requiredStyles.indexOf(script.href), 1);
                        }
                    }

                    // Attach any styles still required
                    for (i = conf.requiredStyles.length - 1; i >= 0; --i) {
                        var style = conf.requiredStyles[i],
                            link = d.createElement('link');
                        link.rel = 'stylesheet';
                        link.href = ~style.indexOf('http') ? style : path + style;
                        d.head.insertBefore(link, d.head.children[0]);
                    }

                    w.jQuery = require('jquery').noConflict();
                    require('bootstrap');
                    require('checkbox');
                    require('radio');
                    require('bootstrap-switch');
                    require('toolbar');
                    require('application');
                }
            }
        ]
    );
})(window, document, angular);
