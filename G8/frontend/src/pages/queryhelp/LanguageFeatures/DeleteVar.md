# Deleting non-property
The `delete` operator should only be used to delete properties from objects. Using it to delete variables makes code hard to maintain and will break in strict mode.


## Recommendation
If the variable you are deleting is a global variable, this is a sign that your code relies too much on global state. Try encapsulating this global state by means of one of the module patterns introduced in *JavaScript: The Good Parts*.


## Example
In the following code snippet, `delete` is used to clean up the global `cache` variable used by function `get`.


```javascript
var cache;

function init() {
	cache = {};
}

function done() {
	delete cache;
}

function get(k) {
	k = '$' + k;
	if (!cache.hasOwnProperty(k))
		cache[k] = compute(k);
	return cache[k];
}

function compute(k) {
	// compute value for k
	// ...
}
```
It would be clearer to wrap the whole module into a closure like this (which also avoids exposing function `compute` to the outside world):


```javascript
(function(global) {
	var cache;

	global.init = function init() {
		cache = {};
	};

	global.done = function done() {
	};

	global.get = function get(k) {
		k = '$' + k;
		if (!cache.hasOwnProperty(k))
			cache[k] = compute(k);
		return cache[k];
	}

	function compute(k) {
		// compute value for k
		// ...
	}
}(this));
```

## References
* JSLint Error Explanations: [Only properties should be deleted](http://jslinterrors.com/only-properties-should-be-deleted).
* Common Weakness Enumeration: [CWE-480](https://cwe.mitre.org/data/definitions/480.html).
