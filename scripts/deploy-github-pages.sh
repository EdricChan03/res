#!/usr/local/bin/bash

CLICOLOR=1
echo -e "\e[32m-----------------------"
echo -e "| 1. Generating icons |"
echo -e "-----------------------\e[0m"
gulp default-icons
# Builds the app in production mode
echo -e "\e[32m---------------------------"
echo -e "| 2. Building application |"
echo -e "---------------------------\e[0m"
ng build --prod --base-href /res/ --deploy-url /res/

# Copies `mdi.svg`, `material-light.css` and `material-dark.css` to the dist folder
echo -e "\e[32m--------------------"
echo -e "| 3. Copying files |"
echo -e "--------------------\e[0m"
cp ./src/assets/{mdi.svg,material-light.css,material-dark.css,init-blogger.js} dist/

# Deploys the app to Github pages
echo -e "\e[32m--------------------------------"
echo -e "| 4. Deploying to Github Pages |"
echo -e "--------------------------------\e[0m"
ngh
# Removes the dist directory
rm -rf dist/