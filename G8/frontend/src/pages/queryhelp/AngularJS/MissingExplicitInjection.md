# Missing explicit dependency injection
When AngularJS injects dependencies into a function that does not have an explicit dependency specification, it matches up dependencies with function parameters by name. This is dangerous, since some source code transformations such as minification may change the names of parameters. Such a renaming will break the AngularJS application.


## Recommendation
Do not use implicit annotations for dependency injected functions when the code is minified later.


## Example
The following example shows an AngularJS controller with implicit dependency annotations.


```javascript
angular.module('myModule', [])
    .controller('MyController', function($scope) { // BAD: implicit dependency name
        // ...
});

```
This is problematic, since the minified version of this controller could look like the following:


```javascript
angular.module('myModule', [])
    .controller('MyController', function(a) { // BAD: dependency 'a' does not exist
        // ...
});

```
This would mean that the function is dependency-injected with the dependency named "a", which does not exist, leading to a crash at runtime.

Instead, in order to support minification, specify the dependencies with explicit annotations:


```javascript
angular.module('myModule', [])
    .controller('MyController', ['$scope', function($scope) { // GOOD: explicit dependency name
        // ...
}]);

```

## References
* AngularJS Developer Guide: [Dependency Injection - Implicit Annotation](https://docs.angularjs.org/guide/di#implicit-annotation).
