# Sign check of bitwise operation
Checking whether the result of a bitwise operation is greater than zero may yield unexpected results due to arithmetic overflow.


## Recommendation
It is more robust to check whether the result of the bitwise operation is *non-zero*.


## Example
In the following example, function `bitIsSet` is meant to implement a check whether the `n`th bit of value `x` is set.


```javascript
function bitIsSet(x, n) {
	return (x & (1<<n)) > 0;
}

console.log(bitIsSet(-1, 31)); // prints 'false'
```
However, this check fails to produce the correct value when `x` is set to `-1` (that is, all its bits are ones), and `n` is set to `31`: in this case, the expression `x & (1<<n)` evaluates to `-2147483648`. So the function returns `false`, even though the 31st bit of `x` is, in fact, set.

To account for this edge case, `bitIsSet` should be rewritten like this:


```javascript
function bitIsSet(x, n) {
	return (x & (1<<n)) !== 0;
}

console.log(bitIsSet(-1, 31)); // prints 'false'
```

## References
* Mozilla Developer Network: [Bitwise operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators).
