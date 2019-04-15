#!/bin/bash

cd frontend
npm run build
rm build/main.css.map
rm build/main.js.map
rsync -azP --delete build/ deploy@trucktracker.net:~/sites/frontend
