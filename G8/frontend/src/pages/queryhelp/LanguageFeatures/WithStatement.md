# With statement
The `with` statement provides a shorthand when accessing many properties of the same object. If a property is not found on that object, enclosing scopes are searched for a variable of the same name. This is confusing and makes code brittle and hard to read. For this reason, `with` is best avoided.


## Recommendation
Eliminate `with` statements by introducing explicit property accesses.


## Example
The following code snippet reads properties `firstName`, `lastName` and `email` from the object stored in `record` by means of a `with` statement. It also invokes the `addRecord` function, which is presumably defined in an enclosing scope.


```javascript
function process(record) {
	with (record) {
		addRecord(firstName + " " + lastName, email);
	}
}
```
Note that if `record` does not have any of the properties `firstName`, `lastName` or `email`, they will be looked up as variables in enclosing scopes. Conversely, if it should happen to have a property `addRecord`, the function call will attempt to invoke the value of this property as a method.

To clarify the intended meaning of the code, the `with` statement should be removed and property accesses should be introduced to make it explicit which names are intended to be read from `record`, and which ones are intended to be looked up in enclosing scopes:


```javascript
function process(record) {
	addRecord(record.firstName + " " + record.lastName, record.email);
}
```
Note that `with` statements are not allowed in strict mode code.


## References
* D. Crockford, *JavaScript: The Good Parts*, Appendix B.2. O'Reilly, 2008.
