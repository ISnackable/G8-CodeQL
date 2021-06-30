# Dead AngularJS event listener
AngularJS applications use the method `$scope.$on` to register event listeners for the events sent out by `$scope.$emit` and `$scope.$broadcast`.

The first argument to `$scope.$on` is the name of the event to listen for. Listening for an event that never gets sent means that the event listener never gets invoked. This is likely an error caused by either: a misspelled event name, or a missing call to `$scope.emit` or `$scope.broadcast` somewhere else.


## Recommendation
Only register event listeners for events that exist.


## Example
The following example shows an AngularJS controller that registers a cleanup function to listen for the `destroy` event.


```javascript
angular.module('myModule', [])
    .controller('MyController', function($scope) {
        function cleanup() {
            // close database connection
            // ...
        }
        $scope.$on('destroy', cleanup); // BAD
    });

```
This is problematic, since the `destroy` event is not emitted by AngularJS, meaning that the cleanup function never gets called.

Instead, the programmer should fix a typo and make the `cleanup` function listen for the builtin `$destroy` event:


```javascript
angular.module('myModule', [])
    .controller('MyController', function($scope) {
        function cleanup() {
            // close database connection
            // ...
        }
        $scope.$on('$destroy', cleanup); // GOOD
    });

```
Alternatively, the programmer should use `$scope.$emit` or `$scope.$broadcast` to send the `destroy` event in another controller:


```javascript
angular.module('myModule', [])
    .controller('MyController', function($scope) {
        function cleanup() {
            // close database connection
            // ...
        }
        $scope.$on('destroy', cleanup); // GOOD
    })
    .controller('MyOtherController', function($scope) {
        $scope.$emit('destroy');
    });

```

## References
* AngularJS Developer Guide: [Events: $broadcast](https://docs.angularjs.org/api/ng/type/$rootScope.Scope#$broadcast).
* AngularJS Developer Guide: [Events: $emit](https://docs.angularjs.org/api/ng/type/$rootScope.Scope#$emit).
* AngularJS Developer Guide: [Events: $on](https://docs.angularjs.org/api/ng/type/$rootScope.Scope#$on).
