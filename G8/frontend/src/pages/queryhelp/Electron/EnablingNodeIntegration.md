# Enabling Node.js integration for Electron web content renderers
Enabling Node.js integration in Electron web content renderers (`BrowserWindow`, `BrowserView` and `webview`) can result in remote native code execution attacks. The attack is realized when the renderer uses content from an untrusted remote web site or a trusted site with a cross site scripting vulnerability.


## Recommendation
Node.js integration should be disabled when loading remote web sites. Always set `nodeIntegration` preference to `false` before loading remote web sites, and only enable it for whitelisted sites.

Note that the `nodeIntegration` property is enabled by default in Electron and needs to be set to `false` explicitly.


## Example
The following examples shows insecure and secure uses of `BrowserWindow` and `BrowserView` when loading remote web sites:


```javascript
//BAD: `nodeIntegration` enabled by default
var win_1 = new BrowserWindow();
win_1.loadURL(remote_site);

//BAD: `nodeIntegration` enabled
var win_2 = new BrowserWindow({webPreferences: {nodeIntegration: true}});
win_2.loadURL(remote_site);

//GOOD: `nodeIntegration` disabled
let win_3 = new BrowserWindow({webPreferences: {nodeIntegration: false}});
win_3.loadURL(remote_site);

//BAD: `nodeIntegration` enabled  in the view
var win_4 = new BrowserWindow({webPreferences: {nodeIntegration: false}})
var view_4 = new BrowserView({
  webPreferences: {
    nodeIntegration: true
  }
});
win_4.setBrowserView(view_4);
view_4.webContents.loadURL(remote_site);

```

## References
* Electron Documentation: [Security, Native Capabilities, and Your Responsibility](https://electronjs.org/docs/tutorial/security#2-disable-nodejs-integration-for-remote-content)
* Common Weakness Enumeration: [CWE-94](https://cwe.mitre.org/data/definitions/94.html).
