# Whitespace contradicts operator precedence
Nested expressions where the spacing around operators suggests a different grouping than that imposed by the JavaScript operator precedence rules are problematic: they could indicate a bug where the author of the code misunderstood the precedence rules. Even if there is no a bug, the spacing could be confusing to people who read the code.


## Recommendation
Make sure that the spacing around operators reflects operator precedence, or use parentheses to clarify grouping.


## Example
Consider the following piece of code for allocating an array:


```javascript
var a = new Array(capacity + capacity>>1);
```
Here, the spacing around `+` and `>>` suggests the grouping `capacity + (capacity>>1)`, that is, the allocated array should be 50% larger than the given capacity.

However, `+` has higher precedence than `>>`, so this code allocates an array of size `(capacity + capacity) >> 1`, which is the same as `capacity`.

To fix this issue, parentheses should be used like this:


```javascript
var a = new Array(capacity + (capacity>>1));
```

## References
* J. Bloch and N. Gafter, *Java Puzzlers: Traps, Pitfalls, and Corner Cases*, Puzzle 35. Addison-Wesley, 2005.
* Common Weakness Enumeration: [CWE-783](https://cwe.mitre.org/data/definitions/783.html).
