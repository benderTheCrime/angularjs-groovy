(function(a) {
    'use strict';

    a.module('test', [
        'angularjs-groovy'
    ]).constant(
        '$s',
        {"header":{"color":"Banana","title":"groovy-cli-app"},"masterDetail":{},"appName":"groovy-cli-app"}
    );
})(angular);
