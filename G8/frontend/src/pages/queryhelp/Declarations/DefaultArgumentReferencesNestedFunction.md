# Default parameter references nested function
Default parameter values can only refer to variables and functions that are defined before the parameter. In particular, they cannot refer to nested functions defined inside the function body, since their definition is not evaluated until after default parameter values have been computed.


## Recommendation
Move the function into the enclosing scope so that it becomes available to the default parameter.


## Example
In the following example, the default parameter value for the parameter `y` of the function `f` is computed from the value of the parameter `x` using the function `defaultVal`. However, since `defaultVal` is defined inside `f` itself, it is not yet defined at the point where the default value of `y` is evaluated, which will lead to a runtime error.


```javascript
function f(x, y = defaultVal(x)) {
    function defaultVal(x) {
        return x+19;
    }
    return x*y;
}

```
To fix this problem, `defaultVal` should be moved into the outer scope so that it becomes available to `y`:


```javascript
function defaultVal(x) {
    return x+19;
}

function f(x, y = defaultVal(x)) {
    return x*y;
}

```

## References
* Mozilla Developer Network: [Default parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters).
