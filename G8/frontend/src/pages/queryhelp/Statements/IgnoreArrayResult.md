# Ignoring result from pure array method
The `concat`, `join` and `slice` methods are pure and do not modify any of the inputs or the array the method is called on. It is therefore generally an error to ignore the return value from a call to one of these methods.


## Recommendation
Use the returned value from the calls to `concat`, `join` or `slice`.


## Example
A function `extend` is defined in the following example. The function uses the `concat` method to add elements to the `arr` array. However, the `extend` function has no effect as the return value from `concat` is ignored:


```javascript
var arr = [1,2,3];

function extend(others) {
	arr.concat(others);
}
```
Assigning the returned value from the call to `concat` to the `arr` variable fixes the error:


```javascript
var arr = [1,2,3];

function extend(others) {
	arr = arr.concat(others);
}
```

## References
* Mozilla Developer Network: [Array concat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat).
* Mozilla Developer Network: [Array slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice).
* Mozilla Developer Network: [Array join](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join).
