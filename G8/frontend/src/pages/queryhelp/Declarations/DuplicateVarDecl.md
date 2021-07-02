# Duplicate variable declaration
A variable declaration statement that declares the same variable twice is confusing and hard to maintain.


## Recommendation
Remove one of the two declarations. When removing a declaration with an initializer, further changes may be necessary to ensure that the variable is correctly initialized.


## Example
In the following example, the variable declaration statement declares the variable `dom` twice. The second declaration is unnecessary, and since it has no initializer it can simply be removed.


```javascript
var dom,
    contactDetails,
    phonesTemplate,
    emailsTemplate,
    dom;

```

## References
* Ecma International, *ECMAScript Language Definition*, 5.1 Edition, Section 12.2. ECMA, 2011.
