# Jump from finally
A `finally` block is normally used to perform cleanup operations at the end of a `try` statement; it is run no matter which way the associated `try` statement terminates: successful termination, a `return` statement, or an exception being thrown.

If a `finally` block contains a `return` statement or a `break` or `continue` statement referring to a loop outside the `try` statement, this statement will jump out of the `finally` block, thus overriding any return value or exception throw arising from the `try` statement. This is often unintentional, and in any case makes the code hard to read.


## Recommendation
Carefully inspect all possible control flow paths through the `try` statement and its `finally` block. If the jump out of the `finally` block is unintentional, then correct it. If it is intentional, restructure the code to move the jump into the main `try` block instead.


## Example
The following code snippet contains a `try` statement that acquires a resource and then performs an action on it. However, if the condition checked by function `someCond` holds, an `Error` is thrown instead of performing the action. The `finally` block releases the resource, and returns `true` if `someOtherCond` returns `true`.

Note that if `someCond` and `someOtherCond` both return `true`, the exception thrown on line 5 is suppressed by the `return` statement on line 10.


```javascript
var resource;
try {
	resource = acquire();
	if (someCond())
		throw new Error();
	performAction(resource);
} finally {
	resource.release();
	if (someOtherCond())
		return true;
}
```
If the suppression of the thrown exception is intentional, the check for `someOtherCond` should be moved into the `try` statement like this:


```javascript
var resource;
try {
	resource = acquire();
	if (someCond()) {
		if (someOtherCond())
			return true;
		else
			throw new Error();
	}
	performAction(resource);
	if (someOtherCond())
		return true;
} finally {
	resource.release();
}
```
While this transformation leads to some code duplication, it makes the control flow more explicit and easier to understand.


## References
* Mozilla Developer Network: [try...catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch).
* Common Weakness Enumeration: [CWE-584](https://cwe.mitre.org/data/definitions/584.html).
