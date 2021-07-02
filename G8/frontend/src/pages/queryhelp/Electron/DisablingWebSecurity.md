# Disabling Electron webSecurity
Electron is secure by default through a same-origin policy requiring all JavaScript and CSS code to originate from the machine running the Electron application. Setting the `webSecurity` property of a `webPreferences` object to `false` will disable the same-origin policy.

Disabling the same-origin policy is strongly discouraged.


## Recommendation
Do not disable `webSecurity`.


## Example
The following example shows `webSecurity` being disabled.


```javascript
const mainWindow = new BrowserWindow({
  webPreferences: {
    webSecurity: false
  }
})
```
This is problematic, since it allows the execution of insecure code from other domains.


## References
* Electron Documentation: [Security, Native Capabilities, and Your Responsibility](https://electronjs.org/docs/tutorial/security#5-do-not-disable-websecurity)
* Common Weakness Enumeration: [CWE-79](https://cwe.mitre.org/data/definitions/79.html).
