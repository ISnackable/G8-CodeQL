# Non-case label in switch statement
JavaScript allows to freely mix `case` labels and ordinary statement labels in the body of a `switch` statement. However, this is confusing to read (especially if both kinds of labels have the same amount of indentation), and indeed most likely the result of a typo.


## Recommendation
Examine the statement labels to see whether they were meant to be case labels. If not, consider wrapping them into a statement block and indent them to set them apart visually from the case labels.


## Example
In this example, the label `case3` is most likely a typo for `case 3` and should be fixed.


```javascript
function f(x) {
	switch (x) {
	case 1:
	case 2:
	case3:
		return true;
	default:
		return false;
	}
}
```

## References
* Ecma International, *ECMAScript Language Definition*, 5.1 Edition, Section 12.11. ECMA, 2011.
