# Inconsistent direction of for loop
Most `for` loops either increment a variable until an upper bound is reached, or decrement a variable until a lower bound is reached. If, instead, the variable is incremented but checked against a lower bound, or decremented but checked against an upper bound, then the loop will either terminate immediately and never execute its body, or it will keep iterating indefinitely. Neither is likely to be intentional, and is most likely the result of a typo.


## Recommendation
Examine the loop carefully to check whether its test expression or update expression are erroneous.


## Example
In the following example, two loops are used to set all elements of an array `a` outside a range `lower`..`upper` to zero. However, the second loop contains a typo: the loop variable `i` is decremented instead of incremented, so `i` is counted downwards from `upper+1` to `0`, `-1`, `-2` and so on.


```javascript
// zero out everything below index `lower`
for (i=lower-1; i>=0; --i)
    a[i] = 0;

// zero out everything above index `upper`
for (i=upper+1; i<a.length; --i)
    a[i] = 0;

```
To correct this issue, change the second loop to increment its loop variable instead:


```javascript
// zero out everything below index `lower`
for (i=lower-1; i>=0; --i)
    a[i] = 0;

// zero out everything above index `upper`
for (i=upper+1; i<a.length; ++i)
    a[i] = 0;

```

## References
* Mozilla Developer Network: [for](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for).
* Common Weakness Enumeration: [CWE-835](https://cwe.mitre.org/data/definitions/835.html).
