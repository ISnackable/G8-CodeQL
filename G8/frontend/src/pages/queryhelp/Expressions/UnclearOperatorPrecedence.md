# Unclear precedence of nested operators
Nested expressions that rely on less well-known operator precedence rules can be hard to read and understand. They could even indicate a bug where the author of the code misunderstood the precedence rules.


## Recommendation
Use parentheses or additional whitespace to clarify grouping.


## Example
Consider the following snippet of code:


```javascript
if (x & y == 0) {
  // ...
}
```
It might look like this tests whether `x` and `y` have any bits in common, but in fact `==` binds more tightly than `&`, so the test is equivalent to `x & (y == 0)`.

If this is the intended interpretation, parentheses should be used to clarify this. You could also consider adding extra whitespace around `&` or removing whitespace around `==` to make it visually apparent that it binds less tightly: `x & y==0`.

Probably the best approach in this case, though, would be to use the `&&` operator instead to clarify the intended interpretation: `x && y == 0`.


## References
* Mozilla Developer Network, [Operator precedence](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence).
* Common Weakness Enumeration: [CWE-783](https://cwe.mitre.org/data/definitions/783.html).
