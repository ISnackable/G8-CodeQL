# Semicolon insertion
Some statements in JavaScript do not have to be terminated by an explicit semicolon; the parser will implicitly insert a semicolon when it encounters a newline character in such situations. This is a dangerous feature since it can mask subtle errors and confuse readers; it should not be relied on.


## Recommendation
Make the implicitly inserted semicolon explicit.


## Example
In the following code snippet, the programmer most likely intended to return an object literal with a single property `status`.


```javascript
function f() {
	return
	{
		status: 'OK'
	}
}
```
However, since there is a newline after the `return` keyword, the parser inserts an implicit semicolon after `return`; the object literal is then interpreted as a block containing a single statement with the label `status`. Since it comes right after a `return`, this block is, of course, never executed, and instead of returning an object literal the function now returns `undefined`.

To fix this bug, the opening curly brace of the object literal should be put on the same line as the `return` keyword:


```javascript
function f() {
	return {
		status: 'OK'
	};
}
```

## References
* D. Crockford, *JavaScript: The Good Parts*, Appendix A.3. O'Reilly, 2008.
