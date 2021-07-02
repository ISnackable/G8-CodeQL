# Undocumented parameter
JSDoc comments for functions and constructors should use the `@param` tag to describe all available parameters. If documentation for some parameters is missing, this may indicate badly maintained code.


## Recommendation
The missing `@param` tags should be added.


## Example
In the following example, the constructor `Message` has a JSDoc comment with a `@param` tag documenting its first parameter `title`, but no tag for its second parameter `body`.


```javascript
/**
 * A message.
 *
 * @constructor
 * 
 * @param {string} title The title of the message.
 */
function Message(title, body) {
    this.title = title;
    this.body = body;
}
```

## References
* Use JSDoc: [The @param tag](http://usejsdoc.org/tags-param.html).
