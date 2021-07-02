# Omitted array element
Elements of array literal expressions that are omitted will be initialized to `undefined`. However, such omitted elements are easy to miss and make code hard to read. They should be avoided.


## Recommendation
Explicitly initialize the array elements to `undefined`. If you want to create an array with a specific number of uninitialized elements, use the `Array` constructor instead.


## Example
The following code snippet initializes `a` to an array of size ten by using omitted elements.


```javascript
var a = [,,,,,,,,,,];
```
This code is clearly hard to read, and should be replaced by the following snippet:


```javascript
var a = new Array(10);
```

## References
* D. Crockford, *JavaScript: The Good Parts*, Appendix C.6. O'Reilly, 2008.
