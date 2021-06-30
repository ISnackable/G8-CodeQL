# Duplicate dependency
Dependency injection in AngularJS is done by providing the names of the desired dependencies. Providing the same name multiple times is redundant since the AngularJS injector uses a cache for instantiated dependencies.


## Recommendation
Only include the name of each dependency once.


## Example
The following example shows an AngularJS controller with `$cookies` as a duplicate dependency.


```javascript
angular.module('myModule', [])
    .controller('MyController', ['$scope',
                                 '$cookies',
                                 '$cookies', // REDUNDANT
                                 function($scope, , $cookies1, $cookies2) {
        // ...
    });

```
This is problematic, since the programmer could be led to believe that the two parameters `$cookies1` and `$cookies2` are different instances, which they are not.

Instead, the dependency should only be listed once:


```javascript
angular.module('myModule', [])
    .controller('MyController', ['$scope',
                                 '$cookies',
                                 function($scope, $cookies) {
        // ...
    });

```

## References
* AngularJS Developer Guide: [Dependency Injection](https://docs.angularjs.org/guide/di).
