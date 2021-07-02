# Incompatible dependency injection
AngularJS has built-in support for dependency injection: components can simply list the names of the services they depend on, and AngularJS will provide appropriate instances and pass them as arguments at runtime.

Each injected service has a kind, this kind influences which components the service is compatible with.


## Recommendation
Ensure that declared dependencies have the right kind for the component they are injected into.


## Example
The following example shows a `config`-method that lists a dependency on a service named `year`. Later, a service of kind `value` is defined with the name `year`. This is not allowed, since `config`-methods can only be injected with services of kind `provider` or `constant`.


```javascript
angular.module('myModule', [])
    .config(['year', function(year) {
        // ...
    }]);

angular.module('myModule')
    .value('year', 2000); // BAD: year is of kind 'value'

```
To solve this problem, the `year` service has to be of kind `constant`.


```javascript
angular.module('myModule', [])
    .config(['year', function(year) {
        // ...
    }]);

angular.module('myModule')
    .constant('year', 2000); // GOOD: year is of kind 'constant'

```

## References
* AngularJS Developer Guide: [Dependency Injection](https://docs.angularjs.org/guide/di).
