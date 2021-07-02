# Malformed id attribute
According to the HTML5 standard, the value of the `id` attribute of an element must contain at least one character, and must not contain any space characters. ID attributes that do not conform to this restriction may be interpreted differently by different browsers, and may indicate a misunderstanding on the part of the developer.


## Recommendation
Inspect the ID attribute in question. If its value is empty, the attribute is most likely useless and can be removed. If it contains a space, perhaps the attribute was meant to be a `class` attribute.


## Example
The following HTML element has an ID attribute with a space in it:


```html
<div id="heading important">An important heading</div>
```
Most likely this was meant to be a `class` attribute, like this:


```html
<div class="heading important">An important heading</div>
```

## References
* HTML5 Standard: [3.2.5.1 The id attribute](https://www.w3.org/TR/html5/dom.html#the-id-attribute).
* Common Weakness Enumeration: [CWE-758](https://cwe.mitre.org/data/definitions/758.html).
