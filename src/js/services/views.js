(function(a) {
    'use strict';

    var H = require('handlebars');

    a.module('angularjs-groovy').service(
        'viewData',
        [
            '$rootScope',
            '$s',
            '$log',
            '$sce',
            '$compile',
            '$timeout',
            '$parse',
            function($rootScope, $s, $log, $sce, $compile, $timeout, $parse) {
                return {
                    views: [],
                    activeViewId: 0,
                    setActiveView: function(id) {
                        if (id < 0 || id >= this.views.length) {
                            return;
                        }
                        this.activeViewId = id;
                        for (var i = 0; i < this.views.length; ++i) {
                            var view = this.views[i];
                            if (view.id === this.activeViewId) {
                                view.el.removeClass('ng-hide').addClass('ng-show');
                            } else {
                                view.el.removeClass('ng-show').addClass('ng-hide');
                            }
                        }
                        $log.debug('Groovy: Set active Groovy view: ' + this.views[id].name);
                        $timeout(function() {
                            $rootScope.masterDetailActive = false;
                        }, 200);
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
                    },
                    setViewTemplate: function(obj, name) {
                        if ($s[name].templateUrl) {
                            obj.templateUrl = $s[name].templateUrl;
                            $log.debug('Groovy: Added custom template to base view for ' + name);
                        } else {
                            obj.template = H.templates[name]($s);
                        }
                        return obj;
                    },
                    setViewSwipeProperties: function(scope, el, attrs, id) {
                        if ($s.masterDetail) {

                            // TODO, I definitely don't like this very much...

                            // For master detail we set only a swipe right property to toggle the
                            // master detail pane
                            el.attr('ng-swipe-right', 'setMasterDetailActive(true)');
                            el.attr('ng-swipe-left', 'setMasterDetailActive(false)');
                        } else if ($s['tabbed' || 'pageBased']) {

                            // For tabbed and page based layouts we want to swipe left or right to change views
                            el.attr('ng-swipe-right', 'setActiveGroovyView(' + (id - 1) + ')');
                            el.attr('ng-swipe-left', 'setActiveGroovyView(' + (id + 1) + ')');
                        } else {
                            return;
                        }

                        // Trash the Groovy attrs so that we don't get ourselves stuck in a bad infinite loop
                        // situation
                        for (var key in attrs) {
                            if (~key.indexOf('ngGroovy')) {
                                el.removeAttr(key.replace(/([A-Z])/g, "-$1"));
                            }
                        }
                        $compile(el[0])(scope);
                        $log.debug('Groovy: Added swipe action bindings for view ' + id);
                    }
                };
            }
        ]
    );
})(angular);
