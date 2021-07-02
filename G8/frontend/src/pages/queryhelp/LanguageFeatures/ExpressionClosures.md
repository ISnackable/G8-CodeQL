# Use of platform-specific language features
Non-standard language extensions such as expression closures or `let` expressions should be avoided, since they make code harder to read or reuse.


## Recommendation
Use standard language features instead. For instance, expression closures can be replaced by ECMAScript 2015 arrow functions, or alternatively by plain functions; `let` statements and expressions can be replaced by ECMAScript 2015 `let` declarations; and `for each ... in` statements can be replaced by ECMAScript 2015 `for ... of` statements.


## Example
The following example uses an expression closure with `map`:


```javascript
[1, 2, 3].map(function(x) x * x);
```
The equivalent code using an ECMAScript 2015 arrow function is as follows:


```javascript
[1, 2, 3].map((x) => x * x);
```
On ECMAScript 2015 platforms, a plain function can be used instead:


```javascript
[1, 2, 3].map(function (x) { return x * x; });
```
As another example, consider this use of a `let` statement:


```javascript
function sumOfSquares(a) {
	var sum = 0;
	for (var i=0; i<a.length; ++i) {
		let (square = a[i]*a[i]) {
			sum += square;
		}
	}
	return sum;
}

```
It can easily be replaced by a block-scoped `let` declaration:


```javascript
function sumOfSquares(a) {
	var sum = 0;
	for (var i=0; i<a.length; ++i) {
		let square = a[i]*a[i];
		sum += square;
	}
	return sum;
}

```
Older versions of Firefox support a postfix notation for array comprehensions:


```javascript
var numbers = [1, 2, 3, 4, 5];
var squares = [i*i for (i of numbers)];
```
This notation should be converted into the semantically equivalent prefix notation supported by newer browsers:


```javascript
var numbers = [1, 2, 3, 4, 5];
var squares = [for (i of numbers) i*i];
```

## References
* Mozilla Developer Network: [Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions).
* Mozilla Developer Network: [Non-standard let extensions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#Non-standard_let_extensions).
* Mozilla Developer Network: [for each...in](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for_each...in).
* Common Weakness Enumeration: [CWE-758](https://cwe.mitre.org/data/definitions/758.html).
