# Misspelled identifier
Misspelled identifiers make code harder to read and understand. In a dynamically typed language like JavaScript, they may also indicate a bug where a reference to a property was accidentally misspelled.

Note that this rule does not flag misspellings of local variable names, which are instead highlighted by the rule 'Misspelled variable name'.


## Recommendation
Correct the misspelling.


## Example
The following code snippet attempts to loop over an array `ids` in order to update DOM nodes referenced by the elements of the array. Note, however, that the upper bound of the loop is specified as `ids.lenght`, a typo for `ids.length`. At runtime, `ids.lenght` will evaluate to `undefined`, so the check `i < ids.lenght` will always fail, and the loop body is never executed.


```javascript
for (var i=1; i<ids.lenght; ++i) {
    var id = ids[i];
    if (id) {
        var element = document.getElementById(id);
        element.className += " selected";
    }
}
```
The misspelling should be corrected by replacing `lenght` with `length`.

