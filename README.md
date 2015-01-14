#Create a templated application from scratch in minutes

Note: This project is still in early development. Although functional, it may not
perform perfectly.

To address issues or request additional functionality, please use the issues tab associated with this repo. Build includes ngRoute and ngTouch modules for AngularJS.

##To use this framework to create a boilerplate application project, please install via NPM:
```shell
npm install [-g] angularjs-groovy
```

##To use this framework as a runtime JS API, please install the Bower component:
```shell
bower install angularjs-groovy --save-dev
```

##For CLI use:
```shell
groovy <app name> <desired location>
```
and then follow the prompts. Examples use the boilerplate.

##For Runtime Use:
###Include a Groovy Settings Object:
```javascript
<script type='text/javascript'>
    groovy = {
        forWeb: false,
        useLogin: false,
        header: {
            title: 'Groovy',
            color: 'Emerald Cove'
        },
        masterDetail: {
            iconUrl: 'images/appbar.nyan.svg'
        }
    };
</script>
```
More details on each option are included below.

###Include these files in the head of your HTML:
```javascript
<script type='text/javascript'
        src='bower_components/angularjs/angular.js'>
</script>
<script type='text/javascript'
        src='bower_components/angularjs-groovy/dist/angularjs-groovy.js'>
</script>
```
Or wherever your Bower components install.

###Include an element where you wish your application elements to register:
```javascript
<ng-view></ng-view>
```

###Create a module with angularjs-groovy as a dependency:
```javascript
angular.module('groovyApp', [
    'angularjs-groovy'
]);
```
inside of your own JavaScript. Doing the above will create a templated master-detail application.

###Next you may choose to add one or many application views:
```javascript
<div ng-controller='yourCtrl'
     ng-groovy-view
     ng-groovy-view-name='settings'
     ng-groovy-view-icon-url='iconUrl'
     ng-groovy-view-options='{ prependHTML: true }'>
    HTML
</div>
```

####Available View Types:
* ngGroovyView
* ngGroovyListView
* ngGroovyGridView
Check the examples to determine how these views appear. They can also be nested inside other views as directives.

An attribute representing options on the view is also available (similar to ngModelOptions) with the following options:
* prependHTML: Whether view html for non-base view types should be prepended (appends by default)

####Groovy Options:
```javascript
groovy = {
    appName:            'Groovy',       // Adds your application name to the title of the page
    forWeb:             false,          // Also 'fW', Is this application intended to be used for the web or as a native application
    useLogin:           false,          // Defaults to false, instantiates a view for login, controlled by user reference
    header: {                           // Also 'h'
        title:          'Groovy',       // Application header content
        color:          null,           // Options: 'Lagoon, Strawberry, Banana, Bruise, Emerald Cove, Nassau Sunset'
        templateUrl:    'index.html'    // An html file to use en lieu of the default API header template
    },
    type:               '',             // Options: masterDetail (mD), tabbed (t), pageBased (pB), singleView (sV)
    masterDetail:   {                   // Also 'mD'
        iconUrl:        'icon.svg',     // An image file to use en lieu of the default API master detail icon
        templateUrl:    'index.html'    // An html file to use en lieu of the default API master detail template
    },
    tabbed:         {                   // Also 't'
        templateUrl:    'index.html'    // An html file to use en lieu of the default API tabbed template
    },
    pageBased:      {                   // Also 'pB'
        templateUrl:    'index.html'    // An html file to use en lieu of the default API page based template
    },
    singleView:          {}             // Also 'sV'
    color:               null           // Options: 'Lagoon, Strawberry, Banana, Bruise, Emerald Cove, Nassau Sunset',
    debug:               false          // Enables AngularJS debug statements for Groovy
};
```
