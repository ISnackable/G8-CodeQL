# String instead of regular expression
Calling the builtin methods `String.prototype.split` and `String.prototype.replace` with a string as the first argument makes the methods search for that exact string. Providing a regular expression instead of the string makes the methods perform a regular expression search.

Calling the methods with a string that has the format of a regular expression is likely a mistake because the methods will not convert the string to a regular expression.


## Recommendation
Call `String.prototype.split` and `String.prototype.replace` with a regular expression as the first argument unless you want an exact search.


## Example
The following code snippet shows a call to `String.prototype.replace`. The purpose of the call is to remove all characters that are not alphanumeric.

```javascript

			var cleaned = input.replace("[^a-zA-Z0-9]+", "");
		
```
Unfortunately, the first argument is a string and not a regular expression, so the call will only remove the first substring that is exactly "`[^a-zA-Z0-9]+`".

Instead, the first argument should be a regular expression with the `global` flag set:

```javascript

			var cleaned = input.replace(/[^a-zA-Z0-9]+/g, "");
		
```

## References
* Mozilla Developer Network: [String.prototype.split](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split)
* Mozilla Developer Network: [String.prototype.replace](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace)
