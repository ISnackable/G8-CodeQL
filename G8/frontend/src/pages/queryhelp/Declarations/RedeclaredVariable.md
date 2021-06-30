# Redeclared variable
Local variables in JavaScript are function-scoped (unlike, for instance, in Java, which uses block scope), and can be redeclared an arbitrary number of times. If a variable is declared twice in different blocks, however, this can confuse readers, since the declarations look like they refer to different variables.


## Recommendation
If the two declarations logically refer to the same variable, replace them with a single declaration at the beginning of the block. If they do not, rename one of the variables to distinguish it from the other.


## Example
In the following code snippet, both declarations for `value` declare the same local variable, although their uses are independent.


```javascript
function f(x) {
	switch (x.type) {
	case 'String':
		var value = x.value;
		return +value.trim();
	case 'Integer':
		var value = x.value;
		return value%2;
	}
}
```

## References
* D. Crockford, *JavaScript: The Good Parts*, Section 4.9. O'Reilly, 2008.
