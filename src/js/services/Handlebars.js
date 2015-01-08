(function(a) {
    'use strict';

    a.module('angularjs-groovy').service(
        'Handlebars',
        function() {
            var Handlebars = require('handlebars');

            require('../templates');
            require('../misc/helpers')(Handlebars);

            return Handlebars;
        }
    );
})(angular);
