# Useless assignment to local variable
A value is assigned to a variable or property, but either that location is never read later on, or its value is always overwritten before being read. This means that the original assignment has no effect, and could indicate a logic error or incomplete code.


## Recommendation
Ensure that you check the control and data flow in the method carefully. If a value is really not needed, consider omitting the assignment. Be careful, though: if the right-hand side has a side-effect (like performing a method call), it is important to keep this to preserve the overall behavior.


## Example
In the following example, the return value of the call to `send` on line 2 is assigned to the local variable `result`, but then never used.


```javascript
function f(x) {
	var result = send(x);
	waitForResponse();
	return getResponse();
}
```
Assuming that `send` returns a status code indicating whether the operation succeeded or not, the value of `result` should be checked, perhaps like this:


```javascript
function f(x) {
	var result = send(x);
	// check for error
	if (result === -1)
		throw new Error("send failed");
	waitForResponse();
	return getResponse();
}
```

## References
* Wikipedia: [Dead store](http://en.wikipedia.org/wiki/Dead_store).
* Common Weakness Enumeration: [CWE-563](https://cwe.mitre.org/data/definitions/563.html).
