# Ambiguous HTML id attribute
According to the HTML5 standard, the value of the `id` attribute of an element must be unique amongst all the IDs in the element's home subtree. In particular, a single HTML document must not contain two elements with the same ID. Documents that do not conform to this restriction may be interpreted differently by different browsers.


## Recommendation
Choose unique IDs for all elements inside a document. If the `id` attributes are used to attach style information to the elements via CSS, consider using `class` attributes instead.


## Example
The following HTML document contains two `li` elements with the same ID:


```html
<html>
<body>
<ul>
<li id="first">First element
<li id="first">Second element
</ul>
</body>

```
Instead, each element should have its own unique ID:


```html
<html>
<body>
<ul>
<li id="first">First element
<li id="second">Second element
</ul>
</body>

```

## References
* HTML5 Standard: [3.2.5.1 The id attribute](https://www.w3.org/TR/html5/dom.html#the-id-attribute).
