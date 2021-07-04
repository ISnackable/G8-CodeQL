# Unbound back reference
In regular expressions, back references can be used to refer back to the result of a previously matched capture group. The ECMAScript standard forbids back references of the form '\\n', where 'n' is a positive number greater than the number of capture groups in the regular expression.

While many browsers allow such references and interpret them as normal character escapes instead, this behavior is non-standard and should not be relied on. It can also be a source of bugs if the regular expression is changed later on, since the character escape may then start matching newly introduced capture groups.


## Recommendation
If the back reference is meant to refer to a capture group, ensure that there is a capture group with the right number. If it is meant to be an escape sequence, convert it to a hexadecimal character escape, which is ECMAScript-compliant.


## Example
In the following example, the back reference `\1` presumably is meant to refer to the string matched by the group `(?:\s+)`. However, that group is non-capturing.


```javascript
/^(?:\s+)\w+\1$/;

```
To fix this, convert the group into a capturing group `(\s+)`.

If `\1` is actually meant to match the character with character code 1, it should be rewritten into the hexadecimal character escape `\x01`.


## References
* Ecma International, *ECMAScript Language Definition*, 5.1 Edition, Section 15. ECMA, 2011.
* Mozilla Developer Network: [JavaScript Regular Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions).
