# Useless type test
In ECMAScript 5, the `typeof` operator returns one of the following six type tags: `"undefined"`, `"boolean"`, `"number"`, `"string"`, `"object"`, `"function"`. In ECMAScript 2015, it may additionally return `"symbol"`, while on older versions of Internet Explorer it may return `"unknown"` or `"date"` in certain situations. Comparing it against any other string literal is therefore useless.


## Recommendation
Carefully examine the comparison in question. If the type tag is simply misspelled, correct it. In some cases, the type tag returned by `typeof` is not sufficiently precise, so you may have to use other type test functions.


## Example
The following code snippet tries to determine whether `a` is an array:


```javascript
if (typeof a === 'array')
	console.log("It's an array!");
```
Note that `typeof` is not precise enough to distinguish arrays from other objects, since it returns the type tag `"object"` for both. ECMAScript 5-compatible platforms provide a library function `Array.isArray` that can be used instead:


```javascript
if (Array.isArray(a))
	console.log("It's an array!");
```
On older platforms, you can use the technique explained on the [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray#Compatibility).


## References
* Mozilla Developer Network: [typeof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof).
* Mozilla Developer Network: [Array.isArray()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray).
* Common Weakness Enumeration: [CWE-570](https://cwe.mitre.org/data/definitions/570.html).
* Common Weakness Enumeration: [CWE-571](https://cwe.mitre.org/data/definitions/571.html).
