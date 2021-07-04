# Useless return in setter
Returning a value from a property setter function is useless, since it will always be ignored.


## Recommendation
Remove the return statement altogether, or replace it with a simple `return;` statement that does not return a value.


## Example
The following example shows a constructor function `Point` that uses property accessors on `x` and `y` to ensure that they are only set to integer values. It returns the new values for `x` and `y` from their setters, but these return values will simply be ignored.


```javascript
function Point(x, y) {
	return {
		get x() { return x; },
		set x(_x) { x = _x|0; return x; },
		get y() { return y; },
		set y(_y) { y = _y|0; return y; }
	};
}
```
It would be clearer to omit the return statements:


```javascript
function Point(x, y) {
	return {
		get x() { return x; },
		set x(_x) { x = _x|0; },
		get y() { return y; },
		set y(_y) { y = _y|0; }
	};
}
```

## References
* Mozilla Developer Network: [Property setters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set).
