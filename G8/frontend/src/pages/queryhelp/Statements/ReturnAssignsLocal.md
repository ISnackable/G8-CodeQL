# Return statement assigns local variable
Assigning a local variable in a return statement is useless, since the local variable will go out of scope immediately and its new value is lost.


## Recommendation
Closely examine the code in question to understand the original intention. For instance, the assignment may originally have referred to a variable from another scope that accidentally was shadowed due to a renaming; in this case, perform another renaming to make it visible again. Or maybe the assignment was meant to assign to a property of the receiver object and the programmer inadvertently forgot to qualify it by `this`; address this by providing the required qualification. Finally, the assignment may simply be unnecessary, in which case it can be removed.


## Example
In the following example, the `getName` method of `Person` contains a useless assignment to `name`.


```javascript
function Person(first, last, age) {
	this.first = first;
	this.last = last;
	this.age = age;
}

Person.prototype.getName = function() {
	var name = first + " " + last;
	return name = name.trim();
};
```
The assignment serves no obvious purpose and should be removed:


```javascript
function Person(first, last, age) {
	this.first = first;
	this.last = last;
	this.age = age;
}

Person.prototype.getName = function() {
	var name = first + " " + last;
	return name.trim();
};
```

## References
* Wikipedia: [Dead store](https://en.wikipedia.org/wiki/Dead_store).
* Common Weakness Enumeration: [CWE-563](https://cwe.mitre.org/data/definitions/563.html).
