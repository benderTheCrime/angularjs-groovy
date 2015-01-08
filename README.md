#Create a templated application from scratch in minutes

Note: This project is still in early development. Although functional, it may not
perform perfectly.

##Include a Groovy Settings Object:
```javascript
<script type='text/javascript'>
    groovy = {
        appName: 'Groovy',
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

##Include these files in the head of your HTML:
```javascript
<script type='text/javascript'
        src='bower_components/angularjs/angular.js'>
</script>
<script type='text/javascript'
        src='bower_components/angularjs-groovy/dist/angularjs-groovy.js'>
</script>
```
Or wherever your Bower components install.

##Include an element where you wish your application elements to register:
```javascript
<groovy-base></groovy-base>
```
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

##Options:
```javascript
groovy = {
    appName: 'Groovy', // Adds your application name to the title of the page
    header: false // This setting is optional
    masterDetail: false // Doing so will make a tabbed-view application instead of master-detail
};
```


Example uses boilerplate: [https://www.npmjs.com/package/generator-html-boilerplate]
