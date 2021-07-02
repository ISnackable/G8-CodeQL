# Unknown directive
If a directive is accidentally misspelled, it will have no effect.


## Recommendation
Correct the misspelling.


## Example
The following code snippet shows a function that contains a `"usestrict"` directive. Most likely, the programmer intended this to be a `"use strict"` directive, but due to the typo, the function will not execute in strict mode.


```javascript
function f() {
    "usestrict";
    ...
}

```
Correct the misspelling by replacing `"usestrict"` with `"use strict"`.


## References
* Mozilla Developer Network: ["use strict"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)
* asm.js: ["use asm"](http://asmjs.org/spec/latest/#validation)
