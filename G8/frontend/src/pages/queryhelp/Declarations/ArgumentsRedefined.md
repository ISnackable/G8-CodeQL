# Arguments redefined
JavaScript functions can access their arguments by position (rather than by parameter name) through the special `arguments` object. However, if a function declares a parameter or local variable named `arguments`, or assigns a new value to `arguments`, then the `arguments` object is no longer available. This is confusing and makes code hard to understand, so it should be avoided.

Also note that many popular JavaScript engines (such as V8, which is used by Google Chrome and Node.js) do not support optimization of functions that assign to `arguments`, so such functions will run more slowly.


## Recommendation
Rename the variable to something else.


## Example
In the following example, the `arguments` parameter of function `f` shadows the special `arguments` variable. As a result, the `arguments` object cannot be accessed inside `f`. To the casual reader, the test `x === arguments[0]` may look redundant, since normally `arguments[0]` refers to the first argument (`x` in this case), which would make the test trivially true. This is not the case here, however, since `arguments[0]` refers to the first element of the array passed in as the second argument.


```javascript
function f(x, arguments) {
	if (x === arguments[0])
		return 23;
	return 42;
}
```

## References
* Mozilla Developer Network: [arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions_and_function_scope/arguments).
* Petka Antonov: [Optimization killers](https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#3-managing-arguments).
