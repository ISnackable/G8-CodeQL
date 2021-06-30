# Off-by-one comparison against length
Reading an array element from an index that is greater than the array length always returns `undefined`. If the index is compared to the array length using the less-than-or-equal operator `<=` instead of the less-than operator `<`, the index could be out of bounds, which may not be intentional and may adversely affect performance.


## Recommendation
Use less-than (`<`) rather than less-than-or-equal (`<=`) when comparing a potential index against the array length. For loops that iterate over every element in an array, use a `for...of` loop or the `forEach` method instead of explicitly iterating over all indices.


## Example
The following example shows a function that intends to check whether an array `a` contains an element `elt` by iterating over its elements and comparing them to `elt`. However, the terminating condition of the loop is incorrectly specified as `i <= a.length`, not `i < a.length`, so `elt` will additionally be compared against the value `undefined` read from index `a.length`, meaning that the function considers every array to contain `undefined`:


```javascript
function contains(a, elt) {
  for (let i = 0; i <= a.length; ++i)
    if (a[i] === elt)
      return true;
  return false;
}
```
The problem can be fixed by using less-than instead of less-than-or-equals:


```javascript
function contains(a, elt) {
  for (let i = 0; i < a.length; ++i)
    if (a[i] === elt)
      return true;
  return false;
}
```

## References
* Mozilla Developer Network: [Array.length](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length)
* Mozilla Developer Network: [Array.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
* Mozilla Developer Network: [for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)
* Common Weakness Enumeration: [CWE-193](https://cwe.mitre.org/data/definitions/193.html).
