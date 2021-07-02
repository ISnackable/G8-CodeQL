# Misspelled variable name
If a reference to a local variable is accidentally misspelled, it will be interpreted as a reference to an implicitly declared global variable, which may indicate a bug. Even if this is intentional, it should be avoided as it makes the code hard to read.


## Recommendation
Correct the misspelling.


## Example
The following code snippet attempts to loop over an array `ids` in order to update DOM nodes referenced by the elements of the array. Note, however, that the upper bound of the loop is specified as `lenght`, a typo for the local variable `length`. At runtime, `lenght` will evaluate to `undefined`, so the check `i < lenght` will always fail, and the loop body is never executed.


```javascript
function selectElements(ids) {
    for (var i=0, length=ids.length; i<lenght; ++i) {
        var id = ids[i];
        if (id) {
            var element = document.getElementById(id);
            element.className += " selected";
        }
    }
}

```
The misspelling should be corrected by replacing `lenght` with `length`.


## References
* D. Crockford: *JavaScript: The Good Parts*, Appendix A: Awful Parts, Global Variables. O'Reilly, 2008.
