# Bad param tag
JSDoc comments for functions and constructors should use the `@param` tag to describe the available parameters. Each `@param` tag should include both the name of the documented parameter and a description of its meaning and use. A missing name or description makes the tag much less useful and may indicate badly maintained code.


## Recommendation
Add the missing items to the `@param` tag.


## Example
In the following example, the constructor `Message` has a JSDoc comment containing two `@param` tags for its two parameters, both of which are missing descriptions.


```javascript
/**
 * A message.
 *
 * @constructor
 * 
 * @param title
 * @param text
 */
function Message(title, body) {
    this.title = title;
    this.body = body;
}
```

## References
* Use JSDoc: [The @param tag](http://usejsdoc.org/tags-param.html).
