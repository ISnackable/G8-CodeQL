# Setter ignores its parameter
Property setter functions that silently ignore their parameter make code hard to understand and could indicate an underlying bug.


## Recommendation
If the property is meant to be immutable, the setter should throw an exception to flag any mutation attempt.


## Example
The following example shows a constructor function `Point` that uses property accessors on `x` and `y` to ensure that they are only set to integer values. However, the setter for `y` contains a typo: it erroneously sets `y` to `_x` (which is unbound at this point), not to its parameter `_y`.


```javascript
function Point(x, y) {
	return {
		get x() { return x; },
		set x(_x) { x = _x|0; },
		get y() { return y; },
		set y(_y) { y = _x|0; }
	};
}
```
Clearly, the example should be fixed like this:


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
