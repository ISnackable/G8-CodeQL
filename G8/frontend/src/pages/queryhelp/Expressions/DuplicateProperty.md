# Duplicate property
In ECMAScript 2015 and above, as well as ECMAScript 5 non-strict mode, an object literal may define the same property multiple times, with later definitions overwriting earlier ones. If all definitions assign the same value to the property, this will not to lead to problems at runtime, but it makes the code harder to read and maintain.


## Recommendation
Eliminate the spurious redefinition.


## Example
In the following example, the object literal passed to method `css` has two definitions of property `backgroundColor`, both setting it to value `"orange"`.


```javascript
$(".alert").css({
  backgroundColor: "orange",
  fontWeight: "bold",
  backgroundColor: "orange"
});
```
The second definition is spurious and should be removed:


```javascript
$(".alert").css({
  backgroundColor: "orange",
  fontWeight: "bold"
});
```

## References
* Ecma International, *ECMAScript Language Definition*, 5.1 Edition, Annex C. ECMA, 2011.
* Ecma International, *ECMAScript Language Definition*, 6th Edition, Annex E. ECMA, 2015.
* Common Weakness Enumeration: [CWE-563](https://cwe.mitre.org/data/definitions/563.html).
