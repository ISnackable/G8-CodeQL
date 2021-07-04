# Unused variable, import, function or class
Unused local variables make code hard to read and understand. Any computation used to initialize an unused variable is wasted, which may lead to performance problems.

Similarly, unused imports and unused functions or classes can be confusing. They may even be a symptom of a bug caused, for example, by an incomplete refactoring.


## Recommendation
Remove the unused program element.


## Example
In this code, the function `f` initializes a local variable `x` with a call to the function `expensiveComputation`, but later on this variable is never read. Removing `x` would improve code quality and performance.


```javascript
function f() {
	var x = expensiveComputation();
	return 23;
}
```
A slightly subtle case is shown below, where a function expression named `f` is assigned to a variable `f`:


```javascript
var f = function f() {
  return "Hi!";
};
f();
```
Note that this example involves two distinct variables, both named `f`: the global variable to which the function is assigned, and the variable implicitly declared by the function expression. The call to `f()` refers to the former variable, whereas the latter is unused. Hence the example can be rewritten as follows, eliminating the useless variable:


```javascript
var f = function () {
  return "Hi!";
};
f();
```
A similar situation can occur with ECMAScript 2015 module exports, as shown in the following example:


```javascript
export default function f() {
  return "Hi!";
};
```
Again, the named function expression implicitly declares a variable `f`, but because the export statement is a default export, this variable is unused and can be eliminated:


```javascript
export default function () {
  return "Hi!";
};
```

## References
* Coding Horror: [Code Smells](http://blog.codinghorror.com/code-smells/).
* Mozilla Developer Network: [Named function expressions](https://developer.mozilla.org/en/docs/web/JavaScript/Reference/Operators/function#Named_function_expression).
* Mozilla Developer Network: [Using the default export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export#Using_the_default_export).
