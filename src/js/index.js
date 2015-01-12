(function(w, d, a, g) {
    'use strict';

    // Dependencies/Settings
    require('../bower_components/angular-route/angular-route.js');
    require('./settings/conf');

    g.masterDetail = g.mD || g.masterDetail;
    g.header = g.h || g.header;

    delete g.mD;
    delete g.h;

    a.module('angularjs-groovy', [
        'conf',
        'ngRoute'
    ]).constant('$s', g);

    // Configs to append meta/style
    require('./configs/login');
    require('./configs/meta');
    require('./configs/style');


    // Services
    require('./services/Handlebars');
    require('./services/views');
    require('./services/baseView');

    // Controllers
    require('./controllers/base');
    require('./controllers/view');

    // Directives
    require('./directives/base');
    require('./directives/header');
    require('./directives/masterDetail');
    require('./directives/footer');
    require('./directives/view');
    require('./directives/listView');
})(
    window,
    document,
    angular,
    typeof groovy !== 'undefined' ?
        groovy : typeof window.groovy !== 'undefined' ? window.groovy : {}
);
