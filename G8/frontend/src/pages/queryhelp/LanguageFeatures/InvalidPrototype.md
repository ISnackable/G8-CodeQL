# Invalid prototype value
All JavaScript objects (including functions, classes and arrays) have a prototype, which is either `null` or another object. The prototype of an object can be set in two ways, both of which guard against attempts to assign an invalid prototype (such as a primitive value):

1. Assigning a value to the object's `__proto__` property; if the value is not a valid prototype, the assignment is silently ignored.
1. Using the standard library functions `Object.create` or `Object.setPrototypeOf`; invalid prototype values lead to a runtime error.
In summary, any attempt to set the prototype of an object to a value that is not an object or `null` will be ineffective and may lead to a runtime error.


## Recommendation
Fix the prototype assignment by providing a valid prototype value.


## Example
The following code attempts to create an object with prototype `undefined`, which will cause an error at runtime:

```javascript

let dict = Object.create(undefined);

```
If the intention is to create an object without a prototype object, `null` should be used instead:

```javascript

let dict = Object.create(null);

```

## References
* Mozilla Developer Network: [Inheritance and the prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain).
* Common Weakness Enumeration: [CWE-704](https://cwe.mitre.org/data/definitions/704.html).
