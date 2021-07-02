# Illegal invocation
Class methods and arrow functions must not be invoked using `new`, and attempting to do so will result in a runtime error.

Conversely, constructors can only be invoked using `new` or `super(...)`, and attempting to invoke them as a normal function will result in a runtime error.


## Recommendation
Correct the invocation in question by adding or removing `new` as appropriate.


## Example
In the following example, `Point` is a class, but on line 8 it is invoked without `new`. This will lead to a runtime error.

```javascript

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let p = Point(23, 42);

```
Instead, `new` should be used:

```javascript

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let p = new Point(23, 42);

```

## References
* Mozilla Developer Network: [Constructors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor).
* Mozilla Developer Network: [Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions).
* Mozilla Developer Network: [Method definitions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions).
