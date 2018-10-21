#!/bin/bash

# Enable color support
CLICOLOR=1

# Automatically exit if an error happens
set -e

echo -e "\x1b[32m-----------------------"
echo -e "| 1. Copying icons |"
echo -e "-----------------------\x1b[0m"
gulp default-icons
# Builds the app in production mode
echo -e "\x1b[32m---------------------------"
echo -e "| 2. Building application |"
echo -e "---------------------------\x1b[0m"
ng build --prod --base-href /res/ --deploy-url /res/

# Copies `mdi.svg`, `material-light.css` and `material-dark.css` to the dist folder
echo -e "\x1b[32m--------------------"
echo -e "| 3. Copying files |"
echo -e "--------------------\x1b[0m"
cp ./src/assets/{mdi.svg,material-light.css,material-dark.css,init-blogger.js} dist/

# Deploys the app to Github pages
echo -e "\x1b[32m--------------------------------"
echo -e "| 4. Deploying to Github Pages |"
echo -e "--------------------------------\x1b[0m"
ngh
# Removes the dist directory
rm -rf dist/
