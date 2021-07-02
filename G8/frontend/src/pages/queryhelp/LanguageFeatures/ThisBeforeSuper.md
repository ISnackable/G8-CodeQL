# Use of incompletely initialized object
If a class extends another class, its constructor needs to call the super constructor before referencing `this` or accessing properties through `super`. Failure to do so will cause a runtime error.


## Recommendation
Insert a super constructor call.


## Example
In the following example, class `A` extends class `B`, but its constructor assigns to `this.x` without first invoking the super constructor, which will cause a runtime error.

```javascript

class A extends B {
  constructor() { this.x = 42; }
}

```
To prevent the error, a super constructor call should be inserted:

```javascript

class A extends B {
  constructor() { super(); this.x = 42; }
}

```

## References
* Mozilla Developer Network: [Sub classing with extends](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Sub_classing_with_extends).
