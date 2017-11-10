#!/usr/local/bin/bash

# Builds the app in production mode
ng build --prod --base-href /res/ --deploy-url /res/

# Copies `mdi.svg` to the dist folder
cp ./src/assets/mdi.svg dist/
# Deploys the app to Github pages
ngh
# Removes the dist directory
rm -rf dist/