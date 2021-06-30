# Use of AngularJS markup in URL-valued attribute
Using AngularJS markup (that is, AngularJS expressions enclosed in double curly braces) in HTML attributes that reference URLs is not recommended: the browser may attempt to fetch the URL before the AngularJS compiler evaluates the markup, resulting in a request for an invalid URL.

While this is not a serious problem, it can degrade user experience, since the page may, for example, display broken image links while loading.


## Recommendation
Use the corresponding AngularJS attributes: `ng-src` instead of `src`, `ng-href` instead of `href`, and `ng-srcset` instead of `srcset`.


## Example
The following example snippet loads an image from a URL that contains the AngularJS expression `{{item._id}}`.


```html
<img src="#/resources/pics/{{item._id}}">

```
At page loading time before AngularJS has been fully initialized, the browser may attempt to load the image from the un-evaluated URL `#/resources/pics/{{item._id}}`, which will most likely fail and result in a broken image link. Later on when AngularJS has been loaded, the AngularJS compiler will evaluate the expression `{{item._id}}` and replace it with its value, which will cause the browser to reload the image.

To avoid the broken link and the reload, use the AngularJS-specific attribute `ng-src`:


```html
<img ng-src="#/resources/pics/{{item._id}}">

```

## References
* AngularJS API Reference: [ngHref](https://docs.angularjs.org/api/ng/directive/ngHref).
* AngularJS API Reference: [ngSrc](https://docs.angularjs.org/api/ng/directive/ngSrc).
* AngularJS API Reference: [ngSrcset](https://docs.angularjs.org/api/ng/directive/ngSrcset).
