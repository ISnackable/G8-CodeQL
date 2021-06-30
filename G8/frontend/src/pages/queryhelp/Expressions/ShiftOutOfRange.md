# Shift out of range
Shift operations in JavaScript operate on 32-bit values only, so it is not possible to shift by more than 31 positions. If the right operand of a shift operator is greater than 31, the left operand is actually only shifted by that value modulo 32.


## Recommendation
Use standard library functions such as `Math.pow` to perform the required shifting. Alternatively, you can use the [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) type if it is available on your platform.


## Example
The following code snippet attempts to assign `x` the value 2<sup>40</sup> (1099511627776). In fact, however, the left operand `1` is only shifted by `8` (that is, 40 modulo 32), so `x` ends up being assigned the value 2<sup>8</sup> (256).


```javascript
var x = 1<<40;
```
A better solution would be to use `Math.pow` as follows:


```javascript
var x = Math.pow(2, 40);
```
Note, however, that JavaScript internally represents large numbers as floating point numbers, so numbers with a magnitude larger than 2<sup>53</sup> will be represented imprecisely.


## References
* Mozilla Developer Network: [Bitwise operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators).
* Common Weakness Enumeration: [CWE-197](https://cwe.mitre.org/data/definitions/197.html).
