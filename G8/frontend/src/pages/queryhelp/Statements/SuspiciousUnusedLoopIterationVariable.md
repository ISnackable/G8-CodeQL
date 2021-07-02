# Unused loop iteration variable
Most `for...in` and `for...of` statements use their iteration variable in the loop body, unless they simply count the number of iterations by incrementing a loop counter in the loop body, or check whether the loop body is executed at all. Loops that do not use their iteration variable but do not fall into one of these two categories may indicate a logic error or typo.


## Recommendation
Carefully check whether the loop variable should be used. If the variable is genuinely not being used and the code is correct, consider renaming the variable to `_` or `unused` to indicate to readers of the code that it is intentionally unused.


## Example
In this example, the `for...of` loop iteration variable `x` is never used. It appears that the function is intended to count how many elements of the array `xs` satisfy the filter predicate `p`, but the programmer forgot to actually pass `x` as an argument to `p`.


```javascript
function countOccurrences(xs, p) {
	var count = 0;
	for (let x of xs)
		if (p())
			++count;
	return count;
}
```
To fix this issue, the call `p()` should be replaced by `p(x)`.


## References
* Mozilla Developer Network: [for...in](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in).
* Mozilla Developer Network: [for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of).
