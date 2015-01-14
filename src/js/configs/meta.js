// SO meta...
(function(d, a) {
    'use strict';

    a.module('angularjs-groovy').config(
        [
            '$s',
            function($s) {
                var title = a.element(d.head.getElementsByTagName('title')),
                    meta = a.element(d.head.getElementsByTagName('meta')),
                    name = 'viewport',
                    viewport = false;

                if ($s.appName) {
                    title.html($s.appName);
                }

                for (var i = meta.length - 1; i >= 0; --i) {
                    if (meta[i].name === name) {
                        viewport = true;
                    }
                }

                if (!viewport) {
                    var viewMeta = d.createElement('meta');
                    viewMeta.name = name;
                    viewMeta.content = 'user-scalable=no, initial-scale=1, maximum-scale=1, ' +
                                       'minimum-scale=1, width=device-width, height=device-' +
                                       'height';
                    d.head.insertBefore(viewMeta, d.head.children[0]);
                }

            }
        ]
    );
})(document, angular);
