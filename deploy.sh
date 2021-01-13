#!/bin/bash

# This script has to be run on the server, manually or via node

cd frontend
git checkout master
git pull origin master
npm ci
npm run build
rm -rf dist
mkdir dist
cp -r build/img dist/
cp build/index.html dist/
cp build/main.css dist/
cp build/main.js dist/
