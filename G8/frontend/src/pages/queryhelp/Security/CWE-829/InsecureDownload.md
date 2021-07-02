# Download of sensitive file through insecure connection
Downloading executeables or other sensitive files over an unencrypted connection can leave a server open to man-in-the-middle attacks (MITM). Such an attack can allow an attacker to insert arbitrary content into the downloaded file, and in the worst case, allow the attacker to execute arbitrary code on the vulnerable system.


## Recommendation
Use a secure transfer protocol when downloading executables or other sensitive files.


## Example
In this example, a server downloads a shell script from a remote URL using the `node-fetch` library, and then executes this shell script.


```javascript
const fetch = require("node-fetch");
const cp = require("child_process");

fetch('http://mydownload.example.org/myscript.sh')
    .then(res => res.text())
    .then(script => cp.execSync(script));
```
The HTTP protocol is vulnerable to MITM, and thus an attacker could potentially replace the downloaded shell script with arbitrary code, which gives the attacker complete control over the system.

The issue has been fixed in the example below by replacing the HTTP protocol with the HTTPS protocol.


```javascript
const fetch = require("node-fetch");
const cp = require("child_process");

fetch('https://mydownload.example.org/myscript.sh')
    .then(res => res.text())
    .then(script => cp.execSync(script));
```

## References
* Wikipedia: [Man-in-the-middle attack](https://en.wikipedia.org/wiki/Man-in-the-middle_attack)
* Common Weakness Enumeration: [CWE-829](https://cwe.mitre.org/data/definitions/829.html).
