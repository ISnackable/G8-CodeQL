# Use of arguments.caller or arguments.callee
The `arguments.callee` property can be used to access the currently executing function, while the non-standard `arguments.caller` property provides access to its caller. Using these properties makes code hard to read, however, so they should be avoided.


## Recommendation
Instead of using `arguments.callee`, you can refer to the enclosing function by its name (possibly giving it a name first if it is an anonymous function expression). Uses of `arguments.caller` can often be eliminated by refactoring the program.


## Example
In the following example, `arguments.callee` is used to recursively invoke the enclosing function, which is anonymous.


```javascript
(function (i) {
	if (i <= 1)
		return 1;
	return i*arguments.callee(i-1);
}(3));

```
To avoid this use, the function can be given a name and referred to using that name:


```javascript
(function factorial(i) {
	if (i <= 1)
		return 1;
	return i*factorial(i-1);
}(3));

```

## References
* Mozilla Developer Network: [arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions_and_function_scope/arguments).
