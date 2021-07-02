# Overwritten property
In ECMAScript 2015 and above, as well as ECMAScript 5 non-strict mode, an object literal may define the same property multiple times, with later definitions overwriting earlier ones. In particular, if the last definition assigns a different value from earlier definitions, the earlier value is lost, which is most likely unintentional and should be avoided.


## Recommendation
Rename the properties to have different names.


## Example
In the following example, the object literal assigned to `point` has two definitions of property `x`. The object's use in function `dist` suggests that the second definition should define a property `y` instead, and should be renamed.


```javascript
function dist(p) {
	return Math.sqrt(p.x*p.x+p.y*p.y);
}

var point = {
	x: 3,
	x: 4
};
console.log(dist(point));
```

## References
* Ecma International, *ECMAScript Language Definition*, 5.1 Edition, Annex C. ECMA, 2011.
* Ecma International, *ECMAScript Language Definition*, 6th Edition, Annex E. ECMA, 2015.
* Common Weakness Enumeration: [CWE-563](https://cwe.mitre.org/data/definitions/563.html).
