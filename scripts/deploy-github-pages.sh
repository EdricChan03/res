#!/usr/local/bin/bash

# Builds the app in production mode
echo -e "\e[32m---------------------------"
echo -e "|                         |"
echo -e "| Building application... |"
echo -e "|                         |"
echo -e "---------------------------\e[0m"
ng build --prod --base-href /res/ --deploy-url /res/

echo -e "\e[32m--------------------"
echo -e "|                  |"
echo -e "| Copying files... |"
echo -e "|                  |"
echo -e "--------------------\e[0m"
# Copies `mdi.svg`, `material-light.css` and `material-dark.css` to the dist folder
cp ./src/assets/{mdi.svg,material-light.css,material-dark.css} dist/
# Deploys the app to Github pages
ngh
# Removes the dist directory
rm -rf dist/