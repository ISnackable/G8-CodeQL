# Useless conditional
If a condition always evaluates to true or always evaluates to false, this often indicates incomplete code or a latent bug and should be examined carefully.


## Recommendation
Examine the surrounding code to determine why the condition is useless. If it is no longer needed, remove it.


## Example
The following example constructs an array `lines`, and then attempts to check whether it has any elements by means of an if conditional `if (!lines)`.


```javascript
function getLastLine(input) {
  var lines = [], nextLine;
  while ((nextLine = readNextLine(input)))
    lines.push(nextLine);
  if (!lines)
    throw new Error("No lines!");
  return lines[lines.length-1];
}
```
Note that in JavaScript (unlike some other languages) arrays and objects are always considered to be true when evaluated in a Boolean context. The code should instead check `lines.length`:


```javascript
function getLastLine(input) {
  var lines = [], nextLine;
  while ((nextLine = readNextLine(input)))
    lines.push(nextLine);
  if (!lines.length)
    throw new Error("No lines!");
  return lines[lines.length-1];
}
```

## References
* Mozilla Developer Network: [Truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy), [Falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy).
* Common Weakness Enumeration: [CWE-570](https://cwe.mitre.org/data/definitions/570.html).
* Common Weakness Enumeration: [CWE-571](https://cwe.mitre.org/data/definitions/571.html).
