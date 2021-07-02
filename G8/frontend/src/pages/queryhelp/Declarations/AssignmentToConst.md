# Assignment to constant
Most popular JavaScript platforms support `const` declarations, although this feature is not part of the ECMAScript 5 standard. Assigning a new value to a variable that is declared `const` does not result in an error on current platforms, and simply has no effect. Relying on this behavior is error-prone, particularly since ECMAScript 2015 prohibits such assignments.


## Recommendation
If the variable genuinely needs to be reassigned, change its declaration from `const` to `var`, or merge the assignment into the variable declaration, if possible. Otherwise, remove the spurious assignment.


## Example
In the following example, `loc` is initialized to `null`, and then set to either `"here"` or `"there"`, depending on the value of variable `dist`. Most current platforms, however, will ignore the assignments entirely, so `loc` will retain its original value `null`.


```javascript
const loc = null;
if (dist < 10)
    loc = "here";
else
    loc = "there";
```
Instead, the assignments to `loc` can be merged into its declaration like this:


```javascript
const loc = dist < 10 ? "here" : "there";
```

## References
* Mozilla Developer Network: [const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const).
