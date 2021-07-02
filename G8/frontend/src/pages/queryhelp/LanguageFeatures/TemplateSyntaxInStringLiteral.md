# Template syntax in string literal
Template literals are strings enclosed with backticks (``` `` ```). These may contain placeholder expressions with the syntax `${*..*}`, which are evaluated at runtime and inserted as part of the string.

Ordinary string literals may be enclosed by single (`''`) or double quotes (`""`), and the placeholder syntax `${*..*}` has no special meaning in these.

In files that make use of template literals, it is hard to distinguish actual template literals from ordinary strings that happen to contain placeholder syntax. This is often the result of mistyping the quotes on a template literal.


## Recommendation
Consider if this was intended to be a template literal, and if so, change the quotes to backticks (``` `` ```). Alternatively:

* Rename some local variables so that the placeholders do not give the impression of referencing those.
* Avoid mixing JavaScript template literals with other template systems in the same file.

## Example
In the following example, the call to `log.error` will log the string "`${id}`", rather than the contents of the `id` variable.


```javascript
log.info(`Connecting to ${id}`)
let connection = openConnection(id)
if (!connection) {
  log.error('Could not connect to ${id}')
}

```
To correct the error message, change the quotes to backticks:


```javascript
log.info(`Connecting to ${id}`)
let connection = openConnection(id)
if (!connection) {
  log.error(`Could not connect to ${id}`)
}

```

## References
* Mozilla Developer Network: [Template literals](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Template_literals).
