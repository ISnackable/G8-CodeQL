# Back reference precedes capture group
Back references can be used to refer back to the result of a previously matched capture group. It is syntactically legal to refer to a capture group that has not finished matching yet, but such a back reference always matches the empty string and is not very useful.


## Recommendation
Remove the back reference if it is useless, or update it to refer to the right capture group.


## Example
In the following example, the back reference `\2` comes before the capture group `(.*)` it refers to. (Note that the first group is non-capturing.)


```javascript
if (/(?:start|end)(\[*|\{*)abc\2:(.*)/.test(input))
	console.log("Found the pattern.");
```
Forward references like this can arise if a regular expression is updated inconsistently. In this example, for instance, the first group may initially have been capturing so the back reference referred to the group `(\[*|\{*])`. This group, however, is now the first capturing group, so the back reference should be updated to `\1`.


## References
* Mozilla Developer Network: [JavaScript Regular Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions).
