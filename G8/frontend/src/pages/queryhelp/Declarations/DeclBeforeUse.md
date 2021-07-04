# Variable not declared before use
JavaScript allows local variables to be used before they are declared. However, this is confusing for readers of the code, since it may not be clear whether the use refers to the local variable or to a global variable of the same name.


## Recommendation
Move local variable declarations to the beginning of the enclosing function, or (for global variables) to the beginning of the source file.


## Example
In the following example, the local variable `x` declared in function `f` shadows the global variable of the same name. However, the first use of the local variable precedes its declaration, so a developer unfamiliar with the code might assume that this use refers to the global variable instead of the local variable.


```javascript
var x = 23;

function f() {
	x = 42;
	var x;
}
```

## References
* D. Crockford, *JavaScript: The Good Parts*, Section 4.9. O'Reilly, 2008.
