# Implicit operand conversion
In JavaScript, most operators can be applied to operands of arbitrary types; at runtime, the operands will be implicitly converted to the appropriate type. For instance, the expression `p in obj` checks whether the object `obj` contains a property whose name equals the string that `p` evaluates to. If `p` does not evaluate to a string or `o` does not evaluate to an object, implicit conversions are performed before the check is carried out.

In many cases, however, these implicit conversions result from a typo or a misunderstanding of operator precedence rules. Even if the conversions are intentional, relying on them makes the code hard to understand.


## Recommendation
Inspect the expression carefully to check whether the operands have been mistyped, and correct them if this is the case. If the conversions are intentional, consider replacing them by explicit conversions to clarify the meaning of the code.


## Example
The following code intends to check whether object `obj` does not contain a property of the name stored in variable `member`:


```javascript
function invk(obj, member) {
    if (!member in obj)
        throw new Error("No such member: " + member);
    return obj[member]();
}
```
However, this test is ineffective as written: the operator `!` binds more tightly than `in`, so it is applied first. Applying `!` to a non-empty string yields `false`, so the `in` operator actually ends up checking whether `obj` contains a property called `"false"`.

To fix this, parentheses should be introduced as follows:


```javascript
function invk(obj, member) {
    if (!(member in obj))
        throw new Error("No such member: " + member);
    return obj[member]();
}
```
As an example of the intentional use of implicit conversions, consider the following function for comparing two numbers `x` and `y`. It returns `1` if `x>y`, `-1` if `x<y`, and `0` if they are equal.


```javascript
function cmp(x, y) {
    return (x > y) - (x < y);
}
```
It would be much clearer to write this out directly:


```javascript
function cmp(x, y) {
    if (x > y)
        return 1;
    if (x < y)
        return -1;
    return 0;
}
```
At the very least, the Boolean comparison results should be explicitly converted to numbers:


```javascript
function cmp(x, y) {
    return +(x > y) - +(x < y);
}
```

## References
* Ecma International, *ECMAScript Language Definition*, 5.1 Edition, Section 9. ECMA, 2011.
* Common Weakness Enumeration: [CWE-704](https://cwe.mitre.org/data/definitions/704.html).
