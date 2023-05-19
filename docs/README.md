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
- Bundling assets to a file
- As a bundler for assets

## How does this work?
js-vfs replaces `fetch` and `XMLHttpRequest` with a patch function that reads from the encoded data.
The data encoding works similar to [TurboWarp/Packager](https://github.com/TurboWarp/packager), but data is saved in a `Uint8Array` instead of a Base85 encoded `String`.

The JavaScript for injecting js-vfs into a file looks like this:
```js
// Create a new js-vfs instance and auto-apply the patches
var _VFS = new InjectPatches(JSZip.loadAsync(zip));
```

You can read more about this on the [Getting Started](guides/getting-started.md) page.