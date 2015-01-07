// SO meta...
(function(d, a) {
    'use strict';

    module.exports = function(m) {
        m.config(function() {
            var head = a.element(d.head),
                meta = a.element(d.head.getElementsByTagName('meta')),
                name = 'viewport',
                viewport = false;

            angular.forEach(meta, function(v) {
                if (v.name === name) {
                    viewport = true;
                }
            });

            if (!viewport) {
                var viewMeta = d.createElement('meta');
                viewMeta.name = name;
                viewMeta.content = 'user-scalable=no, initial-scale=1, maximum-scale=1, ' +
                                   'minimum-scale=1, width=device-width, height=device-' +
                                   'height';
                head.append(viewMeta);
            }
        });
    };
})(document, angular);
