#!/bin/bash

cd frontend
npm run build
rm build/main.css.map
rm build/main.js.map
rsync -azP --delete build/ deploy@trucktracker.net:~/sites/frontend/dist

# This should work. TODO test it!!!!!
# cd ../backend
# npm install
# cd ..
# rsync -azP backend/ deploy@trucktracker.net:~/sites/backend
