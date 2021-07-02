# Superfluous trailing arguments
Function calls in JavaScript may pass an arbitrary number of arguments to the invoked function. If the invoked function declares fewer parameters than arguments were passed, the remaining arguments can only be accessed through the `arguments` object. Hence, if a function is passed too many arguments but does *not* use the `arguments` object, the remaining arguments are useless. Such calls often indicate incomplete refactorings, or may point to a misunderstanding of the functionality of the invoked function.


## Recommendation
Remove the extra parameters if they are unnecessary. Otherwise, further investigation may be necessary to determine how to update the function call.


## Example
The following code snippet defines a function `f` that does not declare any parameters and does not use the `arguments` object. The only call to `f` passes it a single argument `42`, which is not used by `f` in any way and thus can be removed.


```javascript
function f() {
	var x = 23;
	return x+19;
}

f(42);
```

## References
* Ecma International, *ECMAScript Language Definition*, 5.1 Edition, Section 10. ECMA, 2011.
* Common Weakness Enumeration: [CWE-685](https://cwe.mitre.org/data/definitions/685.html).
