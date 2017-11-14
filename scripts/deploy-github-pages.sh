#!/usr/local/bin/bash

# Builds the app in production mode
echo -e "\e[32m---------------------------"
echo -e "| Building application... |"
echo -e "---------------------------\e[0m"
ng build --prod --base-href /res/ --deploy-url /res/

# Copies `mdi.svg`, `material-light.css` and `material-dark.css` to the dist folder
echo -e "\e[32m--------------------"
echo -e "| Copying files... |"
echo -e "--------------------\e[0m"
cp ./src/assets/{mdi.svg,material-light.css,material-dark.css} dist/

# Deploys the app to Github pages
echo -e "\e[32m--------------------------------"
echo -e "| Deploying to Github Pages... |"
echo -e "--------------------------------\e[0m"
ngh
# Removes the dist directory
rm -rf dist/