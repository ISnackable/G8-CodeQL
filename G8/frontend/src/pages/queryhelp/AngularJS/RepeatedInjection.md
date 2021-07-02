# Repeated dependency injection
AngularJS components can have a `$inject` property that specifies the dependencies to inject. You can assign this property multiple times, but doing so is confusing since later assignments overwrite earlier ones, and only the dependencies specified in the last assignment are actually injected.


## Recommendation
Only specify dependencies once for each component.


## Example
The following example shows an AngularJS controller that has its dependencies specified twice.


```javascript
function myController($scope, $filter) {
    // ...
}
myController.$inject = ["$scope", "$cookies"]; // BAD: always overridden
// ...
myController.$inject = ["$scope", "$filter"];
angular.module('myModule', []).controller('MyController', myController);

```
This is problematic, since the second specification always overrides the first one.

Instead, the dependencies should only be specified once:


```javascript
function myController($scope, $filter) {
    // ...
}
myController.$inject = ["$scope", "$filter"]; // GOOD: specified once
angular.module('myModule', []).controller('MyController', myController);

```

## References
* AngularJS Developer Guide: [Dependency Injection](https://docs.angularjs.org/guide/di).
