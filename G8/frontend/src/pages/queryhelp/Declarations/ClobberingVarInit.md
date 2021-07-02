# Conflicting variable initialization
If a variable is declared and initialized twice inside the same variable declaration statement, the second initialization immediately overwrites the first one. This is confusing at best, and probably indicates an underlying bug.


## Recommendation
Rename the second variable declaration to avoid the conflict. For every use of the variable, examine it to find out whether it is meant to refer to the first or to the second declaration. If it is meant to refer to the second declaration, rename the use as well.


## Example
In the following example, the variable declaration statement declares and initializes the variable `key` twice, once to `iter[0]` and once to `iter[1]`. The second initialization overwrites the first, so `key` ends up being set to `iter[1]`.


```javascript
for (var iter in Iterator(aExtraHeaders)) {
    var key = iter[0], key = iter[1];
    xhr.setRequestHeader(key, value);
}

```
From context, it is clear that the second declaration is a typo: it should instead declare and initialize the variable `value`, which is referred to in the next line:


```javascript
for (var iter in Iterator(aExtraHeaders)) {
    var key = iter[0], value = iter[1];
    xhr.setRequestHeader(key, value);
}

```

## References
* Ecma International, *ECMAScript Language Definition*, 5.1 Edition, Section 12.2. ECMA, 2011.
* Common Weakness Enumeration: [CWE-563](https://cwe.mitre.org/data/definitions/563.html).
