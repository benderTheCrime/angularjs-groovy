(function(w, d, a, g) {
    'use strict';

    // Dependencies/Settings
    var Handlebars = require('handlebars');

    require('./templates');
    require('./misc/helpers')(Handlebars);

    require('../bower_components/angular-route/angular-route.js');
    require('../bower_components/angular-touch/angular-touch.js');
    require('./settings/conf');
    require('./settings/settings')(g);

    a.module('angularjs-groovy', [
        'conf',
        'g',
        'ngRoute',
        'ngTouch'
    ]);

    // Configs to append meta/style
    require('./configs/login');
    require('./configs/meta');
    require('./configs/style');

    // Services
    require('./services/views');
    require('./services/baseView');

    // Controllers
    require('./controllers/login');
    require('./controllers/base');
    require('./controllers/view');

    // Directives
    require('./directives/header');
    require('./directives/masterDetail');
    require('./directives/tabbed');
    require('./directives/pageBased');
    require('./directives/view');
    require('./directives/listView');
    require('./directives/gridView');
    require('./directives/imageGridView');
})(
    window,
    document,
    angular,
    typeof groovy !== 'undefined' ?
        groovy : typeof window.groovy !== 'undefined' ? window.groovy : {}
);
