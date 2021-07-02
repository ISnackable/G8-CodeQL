# Not all control paths return a value
Unlike Java and other statically typed languages, JavaScript does not require that all execution paths in a function return a value: if an invocation of the function "falls off" the end of the function without explicitly returning a value, the special value `undefined` is implicitly returned.

Relying on this behavior is dangerous, however, since it can lead to situations where `undefined` is returned by accident, simply because the programmer overlooked a possible execution path. Functions with implicit return behavior may also be hard to use in client code, which has to be prepared for either an explicit return value or `undefined` being returned.


## Recommendation
Insert an explicit return statement. If the "fall through" behavior should never be triggered, it is often a good idea to instead throw an exception.


## Example
In the following example, the function `call` takes two arguments `o` and `m`. It checks whether `o` has a function-valued property with name `m`, and if so invokes it as a method, returning the result. Otherwise, nothing is returned.


```javascript
function call(o, m) {
	if (o && typeof o[m] === 'function')
		return o[m]();
}
```
Assuming that the second case should never occur, an exception should be thrown as follows:


```javascript
function call(o, m) {
	if (o && typeof o[m] === 'function')
		return o[m]();
	throw new Error("no such method");
}
```

## References
* Mozilla Developer Network: [Return](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return).
