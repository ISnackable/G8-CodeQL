# Duplicate HTML element attributes
According to the HTML5 standard, an HTML element must not have two or more attributes with the same name. If the attribute values are the same, this is most likely harmless, but it may indicate a copy-paste mistake.


## Recommendation
Inspect the element in question and delete all but one of the redundant attributes.


## Example
The following HTML snippet contains an anchor element with a redundant `href` attribute:


```html
<a href="https://semmle.com" href="https://semmle.com">Semmle</a>
```
The redundancy can be resolved by deleting one of the attributes:


```html
<a href="https://semmle.com">Semmle</a>
```

## References
* HTML5 Standard: [8.1.2.3 Attributes](https://www.w3.org/TR/html5/syntax.html#attributes-0).
