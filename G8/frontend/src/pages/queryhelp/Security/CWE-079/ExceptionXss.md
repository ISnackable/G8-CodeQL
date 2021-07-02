# Exception text reinterpreted as HTML
Directly writing error messages to a webpage without sanitization allows for a cross-site scripting vulnerability if parts of the error message can be influenced by a user.


## Recommendation
To guard against cross-site scripting, consider using contextual output encoding/escaping before writing user input to the page, or one of the other solutions that are mentioned in the references.


## Example
The following example shows an exception being written directly to the document, and this exception can potentially be influenced by the page URL, leaving the website vulnerable to cross-site scripting.


```javascript
function setLanguageOptions() {
    var href = document.location.href,
        deflt = href.substring(href.indexOf("default=")+8);
    
    try {
        var parsed = unknownParseFunction(deflt); 
    } catch(e) {
        document.write("Had an error: " + e + ".");
    }
}

```

## Example
This second example shows an input being validated using the JSON schema validator `ajv`, and in case of an error, the error message is sent directly back in the response.


```javascript
import express from 'express';
import Ajv from 'ajv';

let app = express();
let ajv = new Ajv();

ajv.addSchema({type: 'object', additionalProperties: {type: 'number'}}, 'pollData');

app.post('/polldata', (req, res) => {
    if (!ajv.validate('pollData', req.body)) {
        res.send(ajv.errorsText());
    }
});

```
This is unsafe, because the error message can contain parts of the input. For example, the input `{'<img src=x onerror=alert(1)>': 'foo'}` will generate the error `data/<img src=x onerror=alert(1)> should be number`, causing reflected XSS.


## References
* OWASP: [DOM based XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html).
* OWASP: [XSS (Cross Site Scripting) Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html).
* OWASP [DOM Based XSS](https://www.owasp.org/index.php/DOM_Based_XSS).
* OWASP [Types of Cross-Site Scripting](https://www.owasp.org/index.php/Types_of_Cross-Site_Scripting).
* Wikipedia: [Cross-site scripting](http://en.wikipedia.org/wiki/Cross-site_scripting).
* Common Weakness Enumeration: [CWE-79](https://cwe.mitre.org/data/definitions/79.html).
* Common Weakness Enumeration: [CWE-116](https://cwe.mitre.org/data/definitions/116.html).
