# Access to let-bound variable in temporal dead zone
The scope of a variable declared with `let` is its innermost enclosing block statement, loop or function. Unlike variables declared with `var`, variables declared with `let` are not hoisted to the top of their scope, giving rise to a region of code where the variable is in scope, but not declared yet. Accessing a `let`-bound variable inside this so-called "temporal dead zone" is permitted by some legacy implementations, but is illegal in ECMAScript 2015.


## Recommendation
Move the `let` declaration to the beginning of its scope.


## Example
In the following example, `x` is initialized before its declaration:


```javascript
function f() {
    x = 23;
    let x;
}

```
The declaration should be moved as follows:


```javascript
function f() {
    let x;
    x = 23;
}

```

## References
* Mozilla Developer Network: [Temporal dead zone and errors with let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#Temporal_dead_zone_and_errors_with_let).
