#!/usr/local/bin/bash

# Builds the app in production mode
echo ---------------------------
echo \| Building application... \|
echo ---------------------------
ng build --prod --base-href /res/ --deploy-url /res/

echo --------------------
echo \| Copying files... \|
echo --------------------
# Copies `mdi.svg`, `material-light.css` and `material-dark.css` to the dist folder
cp ./src/assets/{mdi.svg,material-light.css,material-dark.css} dist/
# Deploys the app to Github pages
ngh
# Removes the dist directory
rm -rf dist/