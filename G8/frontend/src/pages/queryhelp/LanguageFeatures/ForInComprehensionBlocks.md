# Use of for-in comprehension blocks
`for`-`in` blocks in array comprehensions are a Mozilla-specific language extensions that is no longer supported even by SpiderMonkey, and is unlikely to be included in future ECMAScript standards. This language feature should not be used.


## Recommendation
The `for`-`in` block can be replaced by a (standards-compliant) `for`-`of` block iterating over a list of property names obtained, for example, from `Object.keys`.


## Example
In the following contrived example, a `for`-`in` block is used to iterate over the keys `i` of an array and construct an array of strings of the form `"v = a[i]"`, where `v` is the value of `a[i]`.


```javascript
var a = [23,,42];
var desc = [for(i in a) i + " = a[" + i + "]"];

```
The example can be rewritten to use a `for`-`of` block iterating over `Object.keys(a)` instead.


```javascript
var a = [23,,42];
var desc = [for(i of Object.keys(a)) i + " = a[" + i + "]"];

```
Note that `Object.keys` only includes own properties, not properties inherited from a prototype. If the latter behavior is needed, the array comprehension should be replaced by a `for`-`in` loop that imperatively populates the result array.


## References
* Mozilla Developer Network: [Array comprehensions: Differences to the older JS1.7.2/JS1.8 comprehensions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Array_comprehensions#Differences_to_the_older_JS1.7.2FJS1.8_comprehensions).
* Common Weakness Enumeration: [CWE-758](https://cwe.mitre.org/data/definitions/758.html).
