# Use of debugger statement
The `debugger` statement should only be used during debugging, and should not appear in production code.


## Recommendation
Remove all `debugger` statements.


## Example
The following implementation of Quicksort contains a `debugger` statement which can be removed without affecting the program's functionality.


```javascript
function qsort(a) {
    if (a.length == 0) return [];
 
    var left = [], right = [], pivot = a[0];
 
    for (var i = 1; i < a.length; i++) {
    	debugger;
        a[i] < pivot ? left.push(a[i]) : right.push(a[i]);
    }
 
    return qsort(left).concat(pivot, qsort(right));
}
```

## References
* Mozilla Developer Network: [The debugger statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/debugger).
* Common Weakness Enumeration: [CWE-489](https://cwe.mitre.org/data/definitions/489.html).
