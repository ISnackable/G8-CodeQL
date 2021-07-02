# Conflicting HTML element attributes
According to the HTML5 standard, an HTML element must not have two or more attributes with the same name. Elements that do not conform to this restriction may be interpreted differently by different browsers.


## Recommendation
Inspect the element in question and delete all but one of the conflicting attributes.


## Example
The following HTML snippet contains an anchor element with two conflicting `href` attributes:


```html
<a href="http://semmle.com" href="https://semmle.com">Semmle</a>
```
The conflict can be resolved by deleting the first attribute:


```html
<a href="https://semmle.com">Semmle</a>
```

## References
* HTML5 Standard: [8.1.2.3 Attributes](https://www.w3.org/TR/html5/syntax.html#attributes-0).
* Common Weakness Enumeration: [CWE-758](https://cwe.mitre.org/data/definitions/758.html).
