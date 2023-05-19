# js-vfs example

How to use the example:
1. Compress the files in the "data" folder. The zip should not have folders and only a example text file.
2. Run `js-vfs compile` in the example directory. A build folder should be created.
3. Open the example.html file in your browser. You can open your console and run
```js
await (await fetch("example.txt")).text();
```
and the return value should be "Example File"