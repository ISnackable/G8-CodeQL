# Conditional comments
Conditional comments are only supported in Internet Explorer and should be avoided for portability.


## Recommendation
Use feature detection (as offered by major frameworks such as [jQuery](http://jquery.com)) instead.


## Example
The following code snippet uses conditional comments to detect whether it is running on Internet Explorer 9 or newer. A better alternative would be to directly check for the desired features using, for instance, jQuery's `$.support` object.


```javascript
/*@cc_on
  @if (@_jscript_version >= 6)
    console.log("You're running a new version of IE.");
  @else
    console.log("You're running an old version of IE.");
  @end
  @*/

```
Note that conditional comments are no longer supported in Internet Explorer 11 Standards mode.


## References
* Internet Explorer Dev Center: [@cc_on Statement (JavaScript)](http://msdn.microsoft.com/en-us/library/ie/8ka90k2e(v=vs.94).aspx).
* Common Weakness Enumeration: [CWE-758](https://cwe.mitre.org/data/definitions/758.html).
