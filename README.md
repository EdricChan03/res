<a name="top"></a>
# Resources

Resources for Codepen, my website and other stuff!

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.4.

[Back to top](#top)
## Serving locally
Run `npm install` to install all the dependencies (and devDependencies) required for the app to work.

[Back to top](#top)
### Downloading icons
Firstly, you have to download `mdi.svg`, which will be no longer included by default in the app. To proceed, enter this command in the terminal:
```bash
gulp default-icons
```
[Back to top](#top)
### Using the Angular CLI to serve
Run `ng serve` to serve the app. Specify the `--open` parameter to automatically open the app's page in a new tab on your default browser. Otherwise, open `http://localhost:4200` on your browser.

---
[Back to top](#top)
# Gulp tasks
[Back to top](#top)
<a name="gulp-task-default-icons"></a>

## `default-icons` <sub><sup>:white_check_mark: STABLE</sup></sub>
```bash
gulp default-icons
```
Executes the default workflow of using icons in the project.

[Back to top](#top)
<a name="gulp-task-no-download-icons"></a>

## `no-download-icons` <sub><sup>:white_check_mark: STABLE</sup></sub>
```bash
gulp no-download-icons
```
Executes the same workflow as above, but assumes that you've already downloaded `src/assets/mdi.svg`.

[Back to top](#top)
<a name="gulp-task-download-icons"></a>

## `download-icons` <sub><sup>:white_check_mark: STABLE</sup></sub>
```bash
gulp download-icons
```
Downloads the icons from <https://materialdesignicons.com>.
Alternatively, you can download the icons yourself and place it under `src/assets`.

[Back to top](#top)

<a name="gulp-task-download-icons-params"></a>

### Params
View the source code to see all the available parameters.

[Back to top](#top)

<a name="gulp-task-download-icons-param-show-file-storage"></a>

#### `--show-file-storage` <sub><sup>:warning: EXPERIMENTAL</sup></sub>
```bash
gulp download-icons --show-file-storage
```
**Currently not working right now. DO NOT USE.**

[Back to top](#top)

<a name="gulp-task-download-icons-param-show-file-transfer"></a>

#### `--show-file-transfer` <sub><sup>:white_check_mark: STABLE</sup></sub>
```bash
gulp download-icons --show-file-transfer
```
Description: Shows the file transfer stats
Preview:

```
### | 12% | 1.23KB / 6.78KB
```
[Back to top](#top)

<a name="gulp-task-download-icons-param-verbose"></a>

#### `--verbose` <sub><sup>:warning: EXPERIMENTAL</sup></sub>
```bash
gulp download-icons --verbose
```
Enables verbose logging.
**Currently a bit broken.**
[Back to top](#top)

---

<a name="gulp-task-modify-icons"></a>

## `modify-icons` <sub><sup>:white_check_mark: STABLE</sup></sub>
Modifies the icons to work with Angular Material 2/5.

[Back to top](#top)