# Parameter reassigned in function that uses arguments
A function that reassigns one of its parameters and also uses the special arguments object may not be optimized properly, which could make the program run slower. In particular, the V8 engine (which is used by the Google Chrome browser and the Node.js platform) does not currently perform any advanced optimizations on such functions.


## Recommendation
Either eliminate all uses of the `arguments` variable, or copy the parameter into a local variable and reassign that local variable instead.


## Example
In the following example, function `sum` takes two arguments `xs` and `start`, and returns the sum of all elements in the array `xs`, plus the value of `start`. The argument `start` is optional and defaults to `0`.


```javascript
function sum(xs, start) {
    if (arguments.length < 2)
        start = 0;

    var sum = start;
    for (var i=0; i<xs.length; ++i)
        sum += xs[i];

    return sum;
}

```
Observe that to find out whether the argument was provided, `sum` checks `arguments.length` (which evaluates to the number of actual arguments passed to `sum`), and reassigns `sum` to `0` if fewer than two arguments were passed.

In this example, it is easy to eliminate the use of the `arguments` variable: instead of checking `arguments.length`, we can instead check whether `sum` is undefined:


```javascript
function sum(xs, start) {
    if (typeof start === 'undefined')
        start = 0;

    var sum = start;
    for (var i=0; i<xs.length; ++i)
        sum += xs[i];

    return sum;
}

```
A more general solution is to introduce a new local variable, assign the initial value of `sum` to this local variable, and then update and use the local variable instead of the parameter:


```javascript
function sum(xs, _start) {
    var start = arguments.length < 2 ? 0 : _start;

    var sum = start;
    for (var i=0; i<xs.length; ++i)
        sum += xs[i];

    return sum;
}

```

## References
* Petka Antonov: [Optimization killers](https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#31-reassigning-a-defined-parameter-while-also-mentioning-arguments-in-the-body-typical-example).
