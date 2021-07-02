# Nested loops with same variable
Nested 'for' loops with the same iteration variable are hard to understand, since the inner loop affects the iteration variable of the outer loop. Sometimes this behavior is unintended and indicates a bug.


## Recommendation
Use different iteration variables in both loops.


## Example
In this example, the outer loop iterates `i` from 0 to 10. The inner loop initializes `j` to the value of `i`, and then iterates it down to 5. Hence, the outer loop will never terminate since the inner loop prevents its iteration variable from reaching 10.


```javascript
for (var i=0; i<10; ++i) {
	// NOT OK
	for (var j=i; i>5; --i)
		f(i, j);
}
```
Most likely, the loop condition `i>5` of the inner loop is a typo for `j>5`, and similarly the update expression `--i` should be `--j`:


```javascript
for (var i=0; i<10; ++i) {
	// NOT OK
	for (var j=i; j>5; --j)
		f(i, j);
}
```

## References
* Ecma International, *ECMAScript Language Definition*, 5.1 Edition, Section 12.6.3. ECMA, 2011.
