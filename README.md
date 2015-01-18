#Create a templated application from scratch in two minutes

To address issues or request additional functionality, please use the issues tab associated with this repo. Build includes ngRoute and ngTouch modules for AngularJS. If you choose to scaffold an application that is not for web, you will be prompted to install phonegap.

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
| Key                       | Type    | Definition                                                                      | Default   |
| ------------------------- | ------- | ------------------------------------------------------------------------------- | --------- |
| appName                   | string  | Adds your application name to the title of the page                             | undefined |
| forWeb / fW               | boolean | Is this application intended to be used for the web or as a native application? | true      |
| useLogin / uL             | boolean | Instantiates a view for login, controlled by user reference                     | false     |
| useStyle                  | boolean | Use bootstrap/drunken pirate/groovy css                                         | true      |
| header / h                | object  |                                                                                 | undefined |
| header.title              | string  | Application header content                                                      | undefined |
| header.color              | string  | Options: 'Lagoon, Strawberry, Banana, Bruise, Emerald Cove, Nassau Sunset'      | undefined |
| header.templateUrl        | string  | An html file to use en lieu of the default API header template                  | undefined |
| type                      | string  | Options: masterDetail (mD), tabbed (t), pageBased (pB), singleView (sV)         | 'sV'      |
| masterDetail / mD         | object  |                                                                                 | undefined |
| masterDetail.iconUrl      | string  | An image file to use en lieu of the default API master detail icon              | undefined |
| masterDetail.templateUrl  | string  | An html file to use en lieu of the default API master detail template           | undefined |
| tabbed / t                | object  |                                                                                 | undefined |
| tabbed.templateUrl        | string  | An html file to use en lieu of the default API page based template              | undefined |
| pageBased / pB            | object  |                                                                                 | undefined |
| pageBased.templateUrl     | string  | An html file to use en lieu of the default API page based template              | undefined |
| color                     | string  | Options: 'Lagoon, Strawberry, Banana, Bruise, Emerald Cove, Nassau Sunset'      | undefined |
| debug                     | boolean | Enables AngularJS debug statements for Groovy                                   | false     |
