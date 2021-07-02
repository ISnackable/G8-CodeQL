# Backspace escape in regular expression
The meaning of the `\b` escape sequence inside a regular expression depends on its syntactic context: inside a character class, it matches the backspace character; outside of a character class, it matches a word boundary. This context dependency makes regular expressions hard to read, so the `\b` escape sequence should not be used inside character classes.


## Recommendation
Replace `\b` in character classes with the semantically identical escape sequence `\x08`.


## Example
In the following example, the regular expression contains two uses of `\b`: in the first case, it matches a word boundary, in the second case it matches a backspace character.


```javascript
if (/\b[\t\b]/.test(input))
	console.log("Found word boundary followed by tab or backspace");
```
To avoid mistaking the backspace character for the word boundary metacharacter, rewrite the regular expression as `/\b[\t\x08]/`.


## References
* Mozilla Developer Network: [JavaScript Regular Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions).
