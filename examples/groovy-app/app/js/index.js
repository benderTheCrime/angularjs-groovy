(function(a) {
    'use strict';

    a.module('groovyApp', [
        'angularjs-groovy'
    ]).controller('test', function($scope) {
        $scope.groovyListView = {
            settings: {
                items: [
                    {
                        label: 'test 1',
                        href: '#',
                        icon: 'images/appbar.nyan2.svg'
                    },
                    {
                        label: 'test 2'
                    },
                    {
                        label: 'test 3',
                        href: '#'
                    },
                    {
                        label: 'test 4',
                        icon: 'images/appbar.nyan2.svg'
                    }
                ]
            }
        };
    });
})(angular);
