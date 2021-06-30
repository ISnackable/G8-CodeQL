# Comparison between inconvertible types
In JavaScript, equality operators (`==`, `!=`, `===`, `!==`) and relational operators (`<`, `<=`, `>`, `>=`) can be applied to values of arbitrary types. However, if the operands cannot be converted to a common type, the result of the comparison will always be trivially true (for equality) or false (for inequality). Such comparisons are often due to a typo or a misunderstanding of the language semantics.


## Recommendation
Inspect the comparison carefully to check whether it is due to a typo. If one of the operands is a constant, replace it with a constant of the right type. Otherwise, introduce appropriate function calls to convert the operands to a common type.


## Example
The following code attempts to check whether the global variable `window` is defined:


```javascript
if (typeof window !== undefined)
	console.log("Running in a browser.");
```
However, this test is ineffective: `typeof` always returns a string, never `undefined`, so the `if` condition will always evaluate to `true`. Instead, the result of `typeof` should be compared to the string literal `"undefined"`:


```javascript
if (typeof window !== "undefined")
	console.log("Running in a browser.");
```
As another example, consider the following code snippet, which is meant to check whether the string `"hello"` occurs in the string held in variable `text`.


```javascript
if (text.indexOf("hello" >= 0))
	console.log("Found it.");
```
Note, however, that the test has been mistyped: the closing parenthesis of the call to `index` should come before the operator `>=`, not after it. As it stands, this code performs a greater-or-equal comparison between the constant string `"hello"` and the number zero, which evaluates to `false`. This value is then passed to `indexOf`, which converts it to the string `"false"` and returns the first index at which this string occurs in `text` (or `-1` if it does not occur at all).

To fix this issue, the test should be rebracketed like this:


```javascript
if (text.indexOf("hello") >= 0)
	console.log("Found it.");
```

## References
* Mozilla Developer Network: [Comparison Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators).
* Mozilla Developer Network: [Equality comparisons and when to use them](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_when_to_use_them).
* Common Weakness Enumeration: [CWE-570](https://cwe.mitre.org/data/definitions/570.html).
* Common Weakness Enumeration: [CWE-571](https://cwe.mitre.org/data/definitions/571.html).
