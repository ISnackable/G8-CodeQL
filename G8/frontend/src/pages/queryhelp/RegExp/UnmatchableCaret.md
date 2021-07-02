# Unmatchable caret in regular expression
The caret character `^` in a regular expression only matches at the beginning of the input, or (for multi-line regular expressions) at the beginning of a line. If it is preceded by a pattern that must match a non-empty sequence of (non-newline) input characters, it cannot possibly match, rendering the entire regular expression unmatchable.


## Recommendation
Examine the regular expression to find and correct any typos.


## Example
In the following example, the regular expression `/\[^.]*\.css/` cannot match any string, since it contains a caret assertion preceded by an escape sequence that matches an opening bracket.


```javascript
if (file.match(/\[^.]*\.css/))
	console.log("Found it.");
```

## References
* Mozilla Developer Network: [JavaScript Regular Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions).
* Common Weakness Enumeration: [CWE-561](https://cwe.mitre.org/data/definitions/561.html).
