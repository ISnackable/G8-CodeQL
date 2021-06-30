# Replacement of a substring with itself
Replacing a substring with itself has no effect and usually indicates a mistake, such as misspelling a backslash escape.


## Recommendation
Examine the string replacement to find and correct any typos.


## Example
The following code snippet attempts to backslash-escape all double quotes in `raw` by replacing all instances of `"` with `\"`:


```javascript
var escaped = raw.replace(/"/g, '\"');

```
However, the replacement string `'\"'` is actually the same as `'"'`, with `\"` interpreted as an identity escape, so the replacement does nothing. Instead, the replacement string should be `'\\"'`:


```javascript
var escaped = raw.replace(/"/g, '\\"');

```

## References
* Mozilla Developer Network: [String escape notation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#Escape_notation).
* Common Weakness Enumeration: [CWE-116](https://cwe.mitre.org/data/definitions/116.html).
