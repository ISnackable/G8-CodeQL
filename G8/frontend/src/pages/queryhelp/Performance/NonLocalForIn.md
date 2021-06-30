# Iteration using non-local variable
A for-in loop whose iteration variable is a property, a global variable, a local variable from a surrounding scope, or a local variable that is captured in a closure may prevent optimization of the function it appears in, which could make the program run slower. The same applies to for-of loops.

In particular, the V8 engine (which is used by the Google Chrome browser and the Node.js platform) does not currently optimize functions containing such loops.


## Recommendation
Turn the iteration variable into a local variable if possible.


## Example
In the following example, function `extend` copies all properties of its argument `src` into object `dest` using a for-in loop. Note, however, that the loop variable `p` is not declared in `extend`, and thus is interpreted as a global variable.


```javascript
function extend(dest, src) {
    for (p in src)
        dest[p] = src[p];
    return dest;
}
```
However, this is clearly just a typo, and the `p` should be declared as a local variable instead:


```javascript
function extend(dest, src) {
    for (var p in src)
        dest[p] = src[p];
    return dest;
}
```
As another example, consider the following generalization of `extend` that accepts zero or more `src` objects:


```javascript
function combine(dest) {
    var p;

    function extend(src) {
        for (p in src)
            dest[p] = src[p];
    }

    for (var i=1; i<arguments.length; ++i)
        extend(arguments[i]);

    return dest;
}
```
Note that `p` is now a local variable, but it is declared in the outer function `combine`, not in the inner function `extend` where it is actually used. The declaration should be moved into `extend` as follows:


```javascript
function combine(dest) {
    function extend(src) {
        for (var p in src)
            dest[p] = src[p];
    }

    for (var i=1; i<arguments.length; ++i)
        extend(arguments[i]);

    return dest;
}
```
In those (rare) cases where the iteration variable really has to be a global variable or a property, you can introduce a new, local iteration variable and copy its value into the desired global variable or property inside the loop.


## References
* Petka Antonov: [Optimization killers](https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#5-for-in).
