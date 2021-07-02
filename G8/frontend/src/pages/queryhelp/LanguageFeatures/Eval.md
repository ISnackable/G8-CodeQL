# Use of eval
The built-in `eval` function and the `Function` constructor allow executing arbitrary strings as JavaScript code. This is a dangerous feature, since this code has the same access privileges as any other code, so great care has to be taken to ensure that malicious code is not accidentally executed this way. Using this feature also hampers static checking and program comprehension. In many cases, better alternatives are available and should be used instead.


## Recommendation
There are few genuine uses of `eval` and `Function`. If you are trying to assign to a property whose name is not known until runtime, use a computed property access. If you are trying to evaluate a string to a JSON object, use `JSON.parse`. In other cases, you may be able to use the [Interpreter pattern](http://en.wikipedia.org/wiki/Interpreter_pattern).


## Example
In the following example, `eval` is used to define getter and setter methods for properties `x` and `y` on `Point.prototype`:


```javascript
function Point(x, y) {
	this.x = x;
	this.y = y;
}

["x", "y"].forEach(function(p) {
	eval("Point.prototype.get_" + p + " = function() {" +
	     "  return this." + p + ";" +
	     "}");
	eval("Point.prototype.set_" + p + " = function(v) {" +
	     "  if (typeof v !== 'number')" +
	     "    throw Error('number expected');" +
	     "  this." + p + " = v;" +
	     "}");
});
```
In a variant, the programmer has realized that they can use computed property accesses to avoid having to wrap the assignment into an `eval`, although they still use the `Function` constructor to create the accessor functions:


```javascript
function Point(x, y) {
	this.x = x;
	this.y = y;
}

["x", "y"].forEach(function(p) {
	Point.prototype["get_" + p] = new Function("",
		"return this." + p + ";");
	Point.prototype["set_" + p] = new Function("v",
		"if (typeof v !== 'number')" +
		"  throw Error('number expected');" +
	    "  this." + p + " = v;");
});
```
This is not necessary either as the following example shows, where the use of `Function` has also been replaced by computed property accesses:


```javascript
function Point(x, y) {
	this.x = x;
	this.y = y;
}

["x", "y"].forEach(function(p) {
	Point.prototype["get_" + p] = function() {
		return this[p];
	};
	Point.prototype["set_" + p] = function(v) {
		if (typeof v !== 'number')
			throw Error('number expected');
		this[p] = v;
	};
});
```

## References
* D. Crockford, *JavaScript: The Good Parts*, Appendix B.3. O'Reilly, 2008.
* Common Weakness Enumeration: [CWE-676](https://cwe.mitre.org/data/definitions/676.html).
