# Empty character class
An empty character class in a regular expression does not match anything and may indicate missing code.


## Recommendation
Omit the empty character class. If the whole regular expression would become empty, use `/(?:)/` to express a deliberately empty regular expression.


## Example
In the following example, the programmer presumably meant to write a regular expression that matches an opening square bracket or curly brace, followed by one or more letters or digits, followed by a closing square bracket or curly brace. However, they forgot to escape the closing square bracket with a backslash, leading to an empty character class. The resulting regular expression is malformed and could be interpreted differently on different platforms.


```javascript
if (!/[[{]\w+[]}]/.test(input))
	console.log("Malformed input.");
```
To fix this problem, the regular expression should be rewritten to `/[[{]\w+[\]}]/`.


## References
* Mozilla Developer Network: [JavaScript Regular Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions).
