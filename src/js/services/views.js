(function(a) {
    'use strict';

    a.module('angularjs-groovy').service(
        'viewData',
        [
            '$parse',
            function($parse) {
                return {
                    views: [],
                    activeViewId: 0,
                    setActiveView: function(id) {
                        this.activeViewId = id;
                    },
                    setViewOptions: function(scope, element, attrs, html) {
                        var args = attrs.hasOwnProperty('ngGroovyViewOptions')  ?
                                $parse(attrs.ngGroovyViewOptions)() : {};
                        if (args.prependHTML) {
                            var innerHtml = element[0].innerHTML.trim();
                            element
                                .html('')
                                .append(html)
                                .append(innerHtml);
                        } else {
                            element.append(html);
                        }
                    }
                };
            }
        ]
    );
})(angular);
