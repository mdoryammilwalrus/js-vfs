---
icon: rocket
order: 1
---

# Getting Started

## installation

+++ NPM
```bash
npm install github:mdoryammilwalrus/js-vfs
```
+++ Yarn (1.x)
```bash
yarn global add github:mdoryammilwalrus/js-vfs
```
+++

## Adding js-vfs to a existing project

To add js-vfs to your HTML pages, add this html in the `<head>` above any other script tags:
```html
<script src="build/inject.js"></script>
<script src="build/data.js"></script>
<script>
    var _VFS = new InjectPatches(JSZip.loadAsync(zip));
</script>
```

If you have code that needs to run (like a `init()` function), you can listen for the `"ready"` event with `addEventListener()`:
```js
_VFS.addEventListener("ready", () => {
    // Whatever...
    init();
});
```

## Creating a new project with js-vfs

> **Coming soon**