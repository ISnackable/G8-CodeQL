# Assignment to property of primitive value
In JavaScript, primitive values such as numbers and strings are immutable. Assigning to a property of a primitive value has, in general, no effect, while attempting to manipulate such a property using `Object.defineProperty` will result in a runtime error.

There is one exception: assigning to a property for which a setter has been defined on the corresponding prototype object (such as `Number.prototype` or `String.prototype`) will invoke the setter function.


## Recommendation
Carefully examine the assignment in question. A common mistake is trying to change the contents of a string by treating it as an array of characters and assigning to its elements. This has no effect, since strings are immutable in JavaScript. Instead, a new string should be created using string concatenation.

Assignments that rely on setters on prototype objects may work as intended, but this behavior is subtle and hard to understand, and therefore should be avoided.


## Example
The following code snippet tries to pad the string `s` to a length divisible by eight by mutating its characters:

```javascript

for (var i=s.length; i%8; ++i)
  s[i] = ' ';

```
This approach will not work because strings are immutable in JavaScript. Instead, string concatenation should be used to pad the string:

```javascript

for (var i=s.length; i%8; ++i)
  s += ' ';

```

## References
* Ecma International, [ECMAScript 2016 Language Specification, Section 12.15: Assignment Operators](https://262.ecma-international.org/7.0/#prod-AssignmentExpression).
* Ecma International, [ECMAScript 2016 Language Specification, Section 19.1.2.4: Object.defineProperty](https://262.ecma-international.org/7.0/#sec-object.defineproperty).
* Common Weakness Enumeration: [CWE-704](https://cwe.mitre.org/data/definitions/704.html).
