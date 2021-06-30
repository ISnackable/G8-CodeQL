# Regular expression always matches
There are several built-in JavaScript functions that search for a regular expression match within a string, such as `RegExp.prototype.test` and `String.prototype.search`. If the regular expression is not anchored, it only needs to match a substring of the input and won't necessarily match the whole string.

If the regular expression being searched for accepts the empty string, this means it can match an empty substring anywhere in the input string, and will thus always find a match. In this case, testing if a match exists is redundant and indicates dead code.


## Recommendation
Examine the regular expression and determine how it was intended to match:

* To match the whole input string, add anchors at the beginning and end of the regular expression.
* To search for an occurrence within the input string, consider what the shortest meaningful match is and restrict the regular expression accordingly, such as by changing a `*` to a `+`.

## Example
In the following example, a regular expression is used to check the format of a string `id`. However, the check always passes because the regular expression can match the empty substring. For example, it will allow the ID string "`%%`" by matching an empty string at index 0.


```javascript
if (!/[a-z0-9]*/.test(id)) {
    throw new Error("Invalid id: " + id);
}

```
To ensure the regular expression matches the whole string, add anchors at the beginning and end:


```javascript
if (!/^[a-z0-9]*$/.test(id)) {
    throw new Error("Invalid id: " + id);
}

```

## References
* Mozilla Developer Network: [JavaScript Regular Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions).
