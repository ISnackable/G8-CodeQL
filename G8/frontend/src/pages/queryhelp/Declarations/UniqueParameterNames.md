# Duplicate parameter names
In non-strict mode, JavaScript allows a function to have several parameters with the same name, where later parameters shadow earlier parameters. This is an error-prone feature which makes code hard to understand and should be avoided.


## Recommendation
Rename the parameters to have different names.


## Example
In the following example, function `f` has two parameters named `x`, the second one presumably being a typo for `y`. Since no parameter `y` is declared, the use of `y` in the body of `f` refers to a global variable of that name, if it exists.


```javascript
function f(x, x) {
	return x+y;
}
```
Duplicate parameter names are illegal in strict mode.


## References
* Ecma International, *ECMAScript Language Definition*, 5.1 Edition, Annex C. ECMA, 2011.
