# Misleading indentation of dangling 'else'
In JavaScript, an `else` clause is always associated with the closest preceding `if` statement that does not already have an `else` clause. It is good practice to use indentation to clarify this structure by indenting matching `if` ... `else` pairs by the same amount of whitespace.

Indenting the `else` clause of a nested `if` statement to suggest that it matches an outer `if` statement (instead of the one it actually belongs to) is confusing to readers and may even indicate a bug in the program logic.


## Recommendation
Ensure that matching `if` ... `else` pairs are indented accordingly.


## Example
In the following example, the `else` on line 5 belongs to the `if` on line 3, while its indentation wrongly suggests that it belongs to the `if` on line 2.


```javascript
function f() {
	if (cond1())
		if (cond2())
			return 23;
	else
		return 42;
	return 56;
}

```
To correct this issue, indent the `else` on line 5 further:


```javascript
function f() {
	if (cond1())
		if (cond2())
			return 23;
		else
			return 42;
	return 56;
}

```
Confusion about which `if` belongs to which `else` can also be avoided by always enclosing the branches of an `if` statement in curly braces:


```javascript
function f() {
	if (cond1()) {
		if (cond2()) {
			return 23;
		} else {
			return 42;
		}
	}
	return 56;
}

```

## References
* Wikipedia: [Dangling else](http://en.wikipedia.org/wiki/Dangling_else).
* Common Weakness Enumeration: [CWE-483](https://cwe.mitre.org/data/definitions/483.html).
