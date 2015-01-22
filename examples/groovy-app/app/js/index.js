(function(a) {
    'use strict';

    a.module('groovyApp', [
        'angularjs-groovy'
    ]).controller('test', function($scope) {
        $scope.groovySettingsView = {
            settings: {
                items: [
                    {
                        label: 'test 1',
                        icon: 'images/appbar.nyan2.svg',
                        type: 'toggle',
                        value: false
                    },
                    {
                        label: 'test 2',
                        type: 'toggle',
                        value: true
                    },
                    {
                        label: 'test 3',
                        href: '#/'
                    },
                    {
                        label: 'test 4',
                        icon: 'images/appbar.nyan2.svg'
                    }
                ]
            }
        };
        $scope.groovyListView = {
            list: {
                items: [
                    {
                        label: 'test 1',
                        href: '#/',
                        icon: 'images/appbar.nyan2.svg'
                    },
                    {
                        label: 'test 2'
                    },
                    {
                        label: 'test 3',
                        href: '#/'
                    },
                    {
                        label: 'test 4',
                        icon: 'images/appbar.nyan2.svg'
                    }
                ]
            }
        };
        $scope.groovyGridView = {
            grid: {
                title: 'Blah',
                body: 'Blah blah blah',
                keys: [ 'test 1', 'test 2', 'test 3' ],
                items: [
                    {
                        'test 1': 'blah',
                        'test 2': 'blah',
                        'test 3': 'blah'
                    },
                    {
                        'test 1': 'blah',
                        'test 2': 'blah',
                        'test 3': 'blah'
                    },
                    {
                        'test 1': 'blah',
                        'test 2': 'blah',
                        'test 3': 'blah'
                    }
                ]
            }
        };
    });
})(angular);
