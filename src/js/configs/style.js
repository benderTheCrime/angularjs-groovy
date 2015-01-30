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
                    var scripts = Array.prototype.slice.call(d.querySelectorAll('script, head link')),
                        stylesheets = conf.requiredStyles,
                        path,
                        i;

                    // Remove any repeat stylesheets and trim stylesheets from scripts
                    for (i = stylesheets.length - 1; i >= 0; --i) {
                        for (var j = scripts.length - 1; j >= 0; --j) {
                            if (!scripts[j].href) {
                                continue;
                            }
                            if (~scripts[j].href.indexOf(stylesheets[i].href)) {
                                stylesheets.splice(i);
                            }
                            scripts.splice(j);
                        }
                    }

                    // Get the relative path
                    for (i = scripts.length - 1; i >= 0; --i) {
                        var script = scripts[i];
                        if (script.src && !!~script.src.indexOf('angularjs-groovy')) {
                            path = script.src.replace(script.src.split('/').pop(), '');
                        }
                    }

                    // Attach any styles still required
                    for (i = conf.requiredStyles.length - 1; i >= 0; --i) {
                        var style = conf.requiredStyles[i],
                            link = d.createElement('link');
                        link.rel = 'stylesheet';
                        link.href = ~style.indexOf('http') ? style : path + style;
                        d.head.insertBefore(link, d.head.children[1]);
                    }

                    w.jQuery = require('../../bower_components/jquery/dist/jquery').noConflict();

                    require('../../bower_components/bootstrap/dist/js/bootstrap');
                    require('../../bower_components/drunken-parrot-flat-ui/js/checkbox');
                    require('../../bower_components/drunken-parrot-flat-ui/js/radio');
                    require('../../bower_components/drunken-parrot-flat-ui/js/bootstrap-switch');

                    // require('toolbar');
                    // require('application');
                }
            }
        ]
    );
})(window, document, angular);
