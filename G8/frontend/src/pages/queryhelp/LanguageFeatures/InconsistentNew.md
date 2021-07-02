# Inconsistent use of 'new'
JavaScript does not enforce a distinction between constructor functions and normal functions, so the same function can be invoked both as a constructor with `new` and as a normal function without `new`. This is unusual, however, and can often indicate a bug.


## Recommendation
Examine the function in question and all calls to it. If it is not actually meant to be invoked as a constructor, turn all constructor calls to it into normal function calls. If it *is* meant to be invoked as a constructor, either turn all normal function calls to it into constructor calls, or introduce a guard for intercepting calls without `new` as described below.


## Example
In the following example, `Point` is clearly meant to be a constructor function, but on line 7 it is invoked without `new`. This means that `this` in the function body will refer to the global object, so the assignments to `x` and `y` will create global variables.


```javascript
function Point(x, y) {
  this.x = x;
  this.y = y;
}

var p = new Point(23, 42),
    q = Point(56, 72);

```
The easiest way to fix this is to rewrite the call on line 7 to use `new`:


```javascript
function Point(x, y) {
  this.x = x;
  this.y = y;
}

var p = new Point(23, 42),
    q = new Point(56, 72);

```
Alternatively, if you absolutely have to make it possible to call `Point` both with and without `new`, you could insert a guard that intercepts calls without `new` as follows:


```javascript
function Point(x, y) {
  if (!(this instanceof Point))
    return new Point(x, y);
  this.x = x;
  this.y = y;
}

var p = new Point(23, 42),
    q = Point(56, 72);

```
Now, if `Point` is invoked without `new`, its `this` object (which is the global object) is not an instance of `Point`, so the "then" branch of the `if` statement is executed, which re-invokes `Point` on the same arguments, but this time with `new`.


## References
* D. Crockford, *JavaScript: The Good Parts*, Appendix B.11. O'Reilly, 2008.
