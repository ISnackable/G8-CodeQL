# Syntax error
Syntax errors prevent code from executing correctly. If a piece of code contains syntax errors, this most likely indicates that it is never run and thus is dead code that should be removed.


## Recommendation
Fix the syntax error. It may also be worth investigating whether the file containing the erroneous code fragment is ever included from anywhere. If it is not, then it is dead code, which should be removed.


## Example
In the following example, function `findBox` contains incomplete code: the string literal and its containing block statement are not properly terminated, leading to a syntax error.


```javascript
function findBox() {
  return $("box.important
```

## References
* Ecma International, *ECMAScript Language Definition*, 5.1 Edition, Section 15.11.6.4. ECMA, 2011.
