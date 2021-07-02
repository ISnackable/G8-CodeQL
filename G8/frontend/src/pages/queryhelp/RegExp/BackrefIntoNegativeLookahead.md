# Back reference into negative lookahead assertion
Back references can be used to refer to the result of a previously matched capture group. It is syntactically legal to refer from outside a negative lookahead assertion to a capture group nested inside that assertion, but since the regular expression can only match when the body of the negative lookahead assertion did *not* match, such a back reference always matches the empty string. This probably indicates a mistake.


## Recommendation
Remove the back reference if it is useless, or fix the regular expression to make sure the reference refers to the intended capture group.


## Example
In the following example, the back reference `\2` refers to the capture group `(a+)` inside the negative lookahead assertion `(?!(a+)b)`.


```javascript
/(.*?)a(?:d*)a(?!(a+)b)\2(.*)/;
```
Useless back references like this can arise if a regular expression is updated inconsistently. In this example, for instance, the group `(?:d*)` may initially have been capturing, so the back reference `\2` would have referred to it instead of the capture group inside the negative lookahead assertion. If this is the case, the group `(?:d*)` should be made capturing again, that is, it should be replaced by `(d*)`.

Note that referring to a capture group from within the same negative lookahead assertion is unproblematic.


## References
* Ecma International, *ECMAScript Language Definition*, 5.1 Edition, Section 15.10.2.8. ECMA, 2011.
