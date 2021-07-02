# Self assignment
Assigning a variable to itself typically indicates a mistake such as a missing `this` qualifier or a misspelled variable name.


## Recommendation
Carefully inspect the assignment to check for misspellings or missing qualifiers.

If the self-assignment is intentional and is needed for documentation or optimization purposes, add a JSDoc comment with a `@type` tag. This will indicate the self-assignment is intentional.


## Example
In the example below, the constructor function `Rectangle` is intended to initialize properties `x`, `y`, `width`, and `height` to the parameters of the same names.


```javascript
function Rectangle(x, y, width, height) {
	this.x = x;
	this.y = y;
	width = width;
	this.height = height;
}

```
Note, however, that on line 4 the programmer forgot to qualify the left hand side of the assignment with `this`: the code now performs a useless assignment of the `width` parameter to itself and leaves the `width` property uninitialized.

To fix this issue, insert a `this` qualifier:


```javascript
function Rectangle(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}

```

## References
* Ecma International, *ECMAScript Language Definition*, 5.1 Edition, Section 11.13. ECMA, 2011.
* Common Weakness Enumeration: [CWE-480](https://cwe.mitre.org/data/definitions/480.html).
* Common Weakness Enumeration: [CWE-561](https://cwe.mitre.org/data/definitions/561.html).
