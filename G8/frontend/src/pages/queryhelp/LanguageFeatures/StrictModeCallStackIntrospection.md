# Use of call stack introspection in strict mode
The properties `callee` and `caller` of arguments objects as well as the properties `caller` and `arguments` of function objects are not available in strict-mode code, and any attempt to access them will result in a runtime error.


## Recommendation
Instead of using `arguments.callee`, you can refer to the enclosing function by its name (possibly giving it a name first if it is an anonymous function expression). Uses of the other properties can often be eliminated by refactoring the program.


## Example
In the following example, `arguments.callee` is used to recursively invoke the enclosing function, which is anonymous.

```javascript

var o = {
  A: function(x) {
       'use strict';
       if (!(this instanceof arguments.callee))
         return new arguments.callee(x);
       this.x = x;
     }
};

```
To avoid this use, the function can be given a name and referred to using that name:

```javascript

var o = {
  A: function A(x) {
       'use strict';
       if (!(this instanceof A))
         return new A(x);
       this.x = x;
     }
};

```

## References
* Mozilla Developer Network: [arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions_and_function_scope/arguments).
