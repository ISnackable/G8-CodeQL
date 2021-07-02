# Double compilation
The AngularJS compiler processes (parts of) the DOM, determining which directives match which DOM elements, and then applies the directives to the elements. Each DOM element should only be compiled once, otherwise unexpected behavior may result.


## Recommendation
Only compile new DOM elements.


## Example
The following example (adapted from the AngularJS developer guide) shows a directive that adds a tooltip to a DOM element, and then compiles the entire element to apply nested directives.


```javascript
angular.module('myapp')
       .directive('addToolTip', function($compile) {
  return {
    link: function(scope, element, attrs) {
      var tooltip = angular.element('<span ng-show="showToolTip">A tooltip</span>');
      tooltip.on('mouseenter mouseleave', function() {
        scope.$apply('showToolTip = !showToolTip');
      });
      element.append(tooltip);
      $compile(element)(scope); // NOT OK
    }
  };
});

```
This is problematic, since it will recompile all of `element`, including parts that have already been compiled.

Instead, only the new element should be compiled:


```javascript
angular.module('myapp')
       .directive('addToolTip', function($compile) {
  return {
    link: function(scope, element, attrs) {
      var tooltip = angular.element('<span ng-show="showToolTip">A tooltip</span>');
      tooltip.on('mouseenter mouseleave', function() {
        scope.$apply('showToolTip = !showToolTip');
      });
      element.append(tooltip);
      $compile(tooltip)(scope); // OK
    }
  };
});

```

## References
* AngularJS Developer Guide: [Double Compilation, and how to avoid it](https://docs.angularjs.org/guide/compiler#double-compilation-and-how-to-avoid-it).
* Common Weakness Enumeration: [CWE-1176](https://cwe.mitre.org/data/definitions/1176.html).
