# Malformed regular expression
A syntactically ill-formed regular expression may be interpreted differently on different platforms and may even lead to a runtime error.


## Recommendation
Examine the regular expression to see whether it contains any typos and correct them.


## Example
In the following example, the regular expression `p{` is not well-formed: `{` begins a range quantifier of the form `{n,m}` specifying that the previous character is repeated between `n` and `m` times, but here it is not followed by anything. Most browsers will interpret this pattern as matching the literal string `"p{"`, but this is not guaranteed by the ECMAScript standard.


```javascript
if (!/p{/.test(input))
	console.log("Found it.");
```
To ensure portability, the opening curly brace should be escaped like this: `/p\{/`.


## References
* Mozilla Developer Network: [JavaScript Regular Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions).
