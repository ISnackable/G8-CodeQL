# Unreachable statement
An unreachable statement almost always indicates missing code or a latent bug and should be examined carefully.


## Recommendation
Examine the surrounding code to determine why the statement has become unreachable. If it is no longer needed, remove the statement.


## Example
In the following example, a spurious semicolon after the `if` condition at line 2 makes the `return` statement on line 4 unreachable: the function will always execute the `return` statement on line 3 first, so it will never reach line 4.


```javascript
function f() {
	if (someCond());
		return 23;
	return 42;
}
```
To correct this issue, remove the spurious semicolon:


```javascript
function f() {
	if (someCond())
		return 23;
	return 42;
}
```

## References
* Wikipedia: [Unreachable code](http://en.wikipedia.org/wiki/Unreachable_code).
* Common Weakness Enumeration: [CWE-561](https://cwe.mitre.org/data/definitions/561.html).
