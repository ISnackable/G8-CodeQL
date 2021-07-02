# Dependency mismatch
AngularJS has built-in support for dependency injection: directives can simply list the services they depend on and AngularJS will provide appropriate instances and pass them as arguments at runtime.

Developers have to ensure that the list of dependencies matches the parameter list of the directive's factory function: if a dependency is missing, no service instance will be injected, and the corresponding parameter will default to `undefined`. If a dependency and its corresponding parameter have different names, this makes the code hard to follow, and may even indicate a bug.


## Recommendation
Ensure that declared dependencies and parameters match up.


## Example
The following example directive declares a single dependency on the `$compile` service, but its factory function has two parameters `$compile` and `$http`. Presumably the second parameter was introduced without adding a corresponding dependency, so the service will not be injected correctly.


```javascript
angular.module('myapp')
       .directive('mydirective', [ '$compile', function($compile, $http) {
           // ...
       }]);
```
To solve this problem, the `$http` service has to be listed as a dependency as well:


```javascript
angular.module('myapp')
       .directive('mydirective', [ '$compile', '$http', function($compile, $http) {
           // ...
       }]);
```

## References
* AngularJS Developer Guide: [Dependency Injection](https://docs.angularjs.org/guide/di).
