# Missing variable declaration
In JavaScript, if a variable is used in a function but not declared as a local variable, it becomes a global variable by default. This can have unintended consequences: unlike local variables, global variables can be read and modified by all functions. If different functions use the same global variable, they may end up overwriting each others values, leading to subtle and difficult to diagnose bugs.


## Recommendation
Check whether the variable in question was meant to be local; if so, declare it by means of a `var` declaration. If the variable is really meant to be global, it is best to document this fact by inserting a global `var` declaration at the beginning of the source file.


## Example
In the following example, both `f` and `g` use a loop counter variable `i`. Since neither of them declares `i` to be a local variable, they end up accessing the same global variable, so every time `f` invokes `g` inside the loop, `g` overwrites `f`'s value for `i`.


```javascript
function f(a) {
	var sum = 0;
	for (i=0; i<a.length; ++i)
		sum += g(a[i]);
	return sum;
}

function g(b) {
	var prod = 1;
	for (i=0; i<b.length; ++i)
		prod *= b[i];
	return prod;
}
```
The example should be fixed by declaring `i` to be a local variable in `f` and `g`.


## References
* D. Crockford, *JavaScript: The Good Parts*, Appendix A. O'Reilly, 2008.
