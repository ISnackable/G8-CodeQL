# Conflicting function declarations
If two functions with the same name are declared in the same scope, one of the declarations overrides the other without warning. This makes the code hard to read and maintain. In some cases, which declaration overrides which may be platform dependent.


## Recommendation
If the two declarations are duplicates, remove one of them. Otherwise, rename one of them to distinguish the two functions, or turn the function declarations into assignments of function expressions to the same local variable.


## Example
In the following example, function `converter` is defined differently in the two branches of the `if` statement. However, the function definition appearing later in the program text will override the one appearing earlier, independent of the flow of execution through the `if` statement, so in this case it is always the second function that is returned. (Note that this may not be true on older browsers.)


```javascript
function getConverter(dir) {
	if (dir === 'c2f') {
		function converter(c) {
			return c * 9/5 + 32;
		}
	} else {
		function converter(f) {
			return (f - 32) * 5/9;
		}
	}
	return converter;
}
```
To address this problem, introduce a local variable `converter` and convert the function declarations into assignments of function expressions to this variable:


```javascript
function getConverter(dir) {
	var converter;
	if (dir === 'c2f') {
		converter = function (c) {
			return c * 9/5 + 32;
		};
	} else {
		converter = function (f) {
			return (f - 32) * 5/9;
		};
	}
	return converter;
}
```

## References
* Ecma International, *ECMAScript Language Definition*, 5.1 Edition, Section 10.5. ECMA, 2011.
* Common Weakness Enumeration: [CWE-563](https://cwe.mitre.org/data/definitions/563.html).
