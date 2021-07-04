# Enabling Electron allowRunningInsecureContent
Electron is secure by default through a policy banning the execution of content loaded over HTTP. Setting the `allowRunningInsecureContent` property of a `webPreferences` object to `true` will disable this policy.

Enabling the execution of insecure content is strongly discouraged.


## Recommendation
Do not enable the `allowRunningInsecureContent` property.


## Example
The following example shows `allowRunningInsecureContent` being enabled.


```javascript
const mainWindow = new BrowserWindow({
  webPreferences: {
    allowRunningInsecureContent: true
  }
})
```
This is problematic, since it allows the execution of code from an untrusted origin.


## References
* Electron Documentation: [Security, Native Capabilities, and Your Responsibility](https://electronjs.org/docs/tutorial/security#8-do-not-set-allowrunninginsecurecontent-to-true)
* Common Weakness Enumeration: [CWE-494](https://cwe.mitre.org/data/definitions/494.html).
