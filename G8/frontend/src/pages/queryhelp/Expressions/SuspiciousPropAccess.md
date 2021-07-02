# Property access on null or undefined
Attempting to read or write a property of `null` or `undefined` will cause an exception at runtime.


## Recommendation
Carefully inspect the property access in question. If the problem was not detected during testing, this could either be because it is in dead code, or because it is not covered by a test. In the former case, delete the dead code in question. In the latter case, consider adding a new test.


## Example
In the following example, function `f` declares a variable `result`, then invokes another function `computeInterestingResult` (not shown) and stores the result in `res`, and finally returns `result.value`. Since `result` has not been initialized, it will still have its default value `undefined`, causing a runtime exception.


```javascript
function f() {
  var result;
  res = computeInterestingResult();
  return result.value;
}
```
The assignment to `res` is presumably a typo; instead, it should be assigned to `result`:


```javascript
function f() {
  var result;
  result = computeInterestingResult();
  return result.value;
}
```

## References
* Mozilla Developer Network: [Objects and properties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects#Objects_and_properties).
* Common Weakness Enumeration: [CWE-476](https://cwe.mitre.org/data/definitions/476.html).
