---
icon: upload
---

# Adding files & Compiling scripts

## Adding files

!!!light Info
The compile tool will look for a file named "data.zip" in the current working directory by default.
You can change the file name with the --file option if you want.
!!!

1. To start, create a empty directory and a folder named data inside of it.
You should create some files inside of it with contents.

2. Zip the files inside the folder (**NOT THE FOLDER ITSELF**) and move the zip archive to the empty directory you created earlier.
You should have a zip file named "data.zip" and a folder named "data".

## Compiling scripts

To compile the scripts with the data, run:
```bash
js-vfs compile
```
This will create a "build" directory with some javascript files in it.

!!!danger Danger
Any files in the build directory will be deleted
!!!