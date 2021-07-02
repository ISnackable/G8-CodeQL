# Identical operands
Many arithmetic or logical operators yield a trivial result when applied to identical operands: for instance, `x-x` yields zero if `x` is a number, and yields `NaN` otherwise; `x&&x` is always equal to `x`. Code like this is often the result of a typo, such as misspelling a variable name. Even if it is intentional (relying, for instance, on side effects), such code is hard to read and understand and should be avoided.


## Recommendation
Examine the operands for typos. Replace intentional uses of identical operands that have side effects with clearer alternatives.


## Example
In the example below, the function `avg` is intended to compute the average of two numbers `x` and `y`. However, the programmer accidentally used `x` twice, so the function just returns `x`:


```javascript
function avg(x, y) {
	return (x + x)/2;
}
```
This problem can be fixed by correcting the typo:


```javascript
function avg(x, y) {
	return (x + y)/2;
}
```
In some cases, an expression that looks redundant cannot, in fact, be simplified due to side effects. For instance, `f() && f()` is not necessarily equivalent to `f()`, since `f` may have side effects. This may not be immediately apparent to the reader, however, and it is usually clearer to expand this expression into an 'if' statement:


```javascript
if (f())
	f();
```
