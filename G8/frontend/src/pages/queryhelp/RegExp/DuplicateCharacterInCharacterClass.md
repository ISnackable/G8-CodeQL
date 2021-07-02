# Duplicate character in character class
Character classes in regular expressions represent sets of characters, so there is no need to specify the same character twice in one character class. Duplicate characters in character classes are at best useless, and may even indicate a latent bug.


## Recommendation
If the character was accidentally duplicated, remove it. If the character class was meant to be a group, replace the brackets with parentheses.


## Example
In the following example, the character class `[password|pwd]` contains two instances each of the characters `d`, `p`, `s`, and `w`. The programmer most likely meant to write `(password|pwd)` (a pattern that matches either the string `"password"` or the string `"pwd"`), and accidentally mistyped the enclosing brackets.


```javascript
if (/[password|pwd] =/.test(input))
	console.log("Found password!");
```
To fix this problem, the regular expression should be rewritten to `/(password|pwd) =/`.


## References
* Mozilla Developer Network: [JavaScript Regular Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions).
