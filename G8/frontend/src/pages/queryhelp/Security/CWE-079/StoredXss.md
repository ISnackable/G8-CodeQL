# Stored cross-site scripting
Directly using uncontrolled stored value (for example, file names) to create HTML content without properly sanitizing the input first, allows for a cross-site scripting vulnerability.

This kind of vulnerability is also called *stored* cross-site scripting, to distinguish it from other types of cross-site scripting.


## Recommendation
To guard against cross-site scripting, consider using contextual output encoding/escaping before using uncontrolled stored values to create HTML content, or one of the other solutions that are mentioned in the references.


## Example
The following example code writes file names directly to a HTTP response. This leaves the website vulnerable to cross-site scripting, if an attacker can choose the file names on the disk.


```javascript
var express = require('express'),
    fs = require('fs');

express().get('/list-directory', function(req, res) {
    fs.readdir('/public', function (error, fileNames) {
        var list = '<ul>';
        fileNames.forEach(fileName => {
            // BAD: `fileName` can contain HTML elements
            list += '<li>' + fileName + '</li>';
        });
        list += '</ul>'
        res.send(list);
    });
});

```
Sanitizing the file names prevents the vulnerability:


```javascript
var express = require('express'),
    fs = require('fs'),
    escape = require('escape-html');

express().get('/list-directory', function(req, res) {
    fs.readdir('/public', function (error, fileNames) {
        var list = '<ul>';
        fileNames.forEach(fileName => {
            // GOOD: escaped `fileName` can not contain HTML elements
            list += '<li>' + escape(fileName) + '</li>';
        });
        list += '</ul>'
        res.send(list);
    });
});

```

## References
* OWASP: [XSS (Cross Site Scripting) Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html).
* OWASP [Types of Cross-Site Scripting](https://www.owasp.org/index.php/Types_of_Cross-Site_Scripting).
* Wikipedia: [Cross-site scripting](http://en.wikipedia.org/wiki/Cross-site_scripting).
* Common Weakness Enumeration: [CWE-79](https://cwe.mitre.org/data/definitions/79.html).
* Common Weakness Enumeration: [CWE-116](https://cwe.mitre.org/data/definitions/116.html).
