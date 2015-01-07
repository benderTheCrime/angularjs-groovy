(function(w, d, a, g) {
    'use strict';

    require('./settings/conf');

    if (typeof a === 'undefined' ||
        typeof g === 'undefined') {

        // What is to be done? no settings, no plugin :`(
        return;
    }

    g = w.groovy;
    g.masterDetail = g.mD || g.masterDetail;
    g.header = g.h || g.header;

    delete g.mD;
    delete g.h;

    var m = a.module('angularjs-groovy', [
        'conf'
    ]).constant('$s', g);

    // Configs to append meta/style
    require('./configs/meta')(m);
    if (g.useStyle !== false) {
        require('./configs/style')(m);
    }

    // Services
    require('./services/Handlebars');

    // Controllers
    require('./controllers/base');

    // Directives
    require('./directives/base');
    require('./directives/header');
    require('./directives/footer');
    // require('./directives/masterDetail');

})(window, document, angular, groovy || window.groovy);
