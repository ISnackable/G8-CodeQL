# Comparison with NaN
Arithmetic comparisons with the special not-a-number value `NaN` are useless: nothing is considered to be equal to `NaN`, not even `NaN` itself, and similarly nothing is considered greater or less than `NaN`.


## Recommendation
Use the `isNaN` function from the standard library to determine whether a given value is `NaN`.


## Example
Instead of `x === NaN`, use `isNaN(x)`.


## References
* Arvind Kumar: [Javascript common mistake of comparing with NaN and not with isNaN](http://www.devarticles.in/javascript/javascript-common-mistake-of-comparing-variable-with-nan-and-not-with-isnan/).
* Mozilla Developer Network: [NaN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN).
* Common Weakness Enumeration: [CWE-570](https://cwe.mitre.org/data/definitions/570.html).
* Common Weakness Enumeration: [CWE-571](https://cwe.mitre.org/data/definitions/571.html).
