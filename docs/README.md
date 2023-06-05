---
icon: home
---

# What is js-vfs?

js-vfs is a tool for making JavaScript programs that use `fetch` or `XMLHttpRequest` work on local files.

!!!warning Warning
js-vfs works best for single-page websites.

Normal page navigation will cause **ALL THE FILES** to be reloaded
!!!

## Why is this useful?

js-vfs can be used for:
- Bundling assets
- Getting things to work on local or single files

## How does this work?
js-vfs replaces `fetch` and `XMLHttpRequest` with a patch function that reads from the encoded data.
The data encoding works the same way that [TurboWarp/Packager](https://github.com/TurboWarp/packager) does.

The JavaScript for injecting js-vfs into a file looks like this:
```js
// Create a new js-vfs instance and auto-apply the patches
var _VFS = new InjectPatches(JSZip.loadAsync(zip));
```

You can read more about this on the [Getting Started](guides/getting-started.md) page.