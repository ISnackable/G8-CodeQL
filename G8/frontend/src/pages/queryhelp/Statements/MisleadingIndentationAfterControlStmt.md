# Misleading indentation after control statement
Loop bodies and the 'then' and 'else' branches of `if` statements can either be block statements delimited by curly braces, or simple statements. In the latter case, special care must be taken to correctly indent statements to indicate whether or not they belong to the body of the loop or the `if` statement. In particular, the statement immediately after the loop or `if` statement should not be indented by the same amount as the body to avoid misunderstanding of the control flow structure.


## Recommendation
Use additional indentation to set loop bodies and then/else branches apart, but use the same amount of indentation for statements that follow each other in a sequence of statements.


## Example
In this example, the 'then' branch of the `if` statement consists of the single statement `scream();`. Indentation makes it appear as if the statement `runAway();` also belongs to the 'then' branch, while in fact it does not: it is simply the next statement after the `if`, and will be executed regardless of whether the condition `afraid()` evaluates to true or false.


```javascript
if (afraid())
	scream();
	runAway();
```
If both statements were intended to be part of the 'then' branch, they should be enclosed in a block of statements like this:


```javascript
if (afraid()) {
	scream();
	runAway();
}
```
If the second statement does not logically belong in the 'then' branch, its indentation should be decreased like this:


```javascript
if (afraid())
	scream();
runAway();
```

## References
* Tutorialzine: [10 Mistakes That JavaScript Beginners Often Make](http://tutorialzine.com/2014/04/10-mistakes-javascript-beginners-make/).
* Common Weakness Enumeration: [CWE-483](https://cwe.mitre.org/data/definitions/483.html).
