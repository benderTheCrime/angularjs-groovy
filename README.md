#Create a templated application from scratch in minutes

Note: This project is still in early development. Although functional, it may not
perform perfectly.

To address issues or request additional functionality, please use the issues tab associated with this repo.

####To use this framework to create a boilerplate application project, please install via NPM:
```shell
npm install [-g] angularjs-groovy
```

####To use this framework as a runtime JS API, please install the Bower component:
```shell
bower install angularjs-groove
```

##For CLI use:
```shell
groovy <app name> <desired location>
```
and then follow the prompts.

Examples use the boilerplate

##For Runtime Use:
###Include a Groovy Settings Object:
```javascript
<script type='text/javascript'>
    groovy = {
        appName: 'Groovy',
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

And create a module with angularjs-groovy as a dependency
```javascript
angular.module('groovyApp', [
    'angularjs-groovy'
]);
```
inside of your own JavaScript

Doing the above will create a templated master-detail application.

###Next you may choose to add one or many application views:
```javascript
<div ng-controller='yourCtrl'
     ng-groovy-view
     ng-groovy-view-name='settings'
     ng-groovy-view-icon-url='iconUrl'>
    HTML
</div>
```

####Options:
```javascript
groovy = {
    appName:        'Groovy', // Adds your application name to the title of the page
    forWeb:         false,    // Is this application intended to be used for the web or as a native application
    useLogin:       false,    // Defaults to false, instantiates a view for login, controlled by user reference
    header:         false,    // This setting is optional
    masterDetail:   false     // Doing so will make a tabbed-view application instead of master-detail
};
```
