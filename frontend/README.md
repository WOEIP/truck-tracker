# Project overview
Truck Tracker helps West Oakland residents monitor truck traffic, so we can better understand the impact of trucking emissions on our community, hold violators accountable, and advocate for cleaner air. The Truck Tracker tool is a project of the [West Oakland Environmental Indicators Project](https://woeip.org). WOEIP is a resident led, community-based environmental justice organization dedicated to achieving healthy homes, healthy jobs, and healthy neighborhoods for all who live, work, learn, and play in West Oakland, California. Currently in beta, we hope to continue expanding the tool so it can be adopted by other communities.

## Contributing

Clone the repo. Make sure you have [npm](https://www.npmjs.com/get-npm) installed:

```
npm -v
```

Once installed, in terminal:

```
cd /truck-tracker/frontend
npm install
npm run dev
```

Create a new branch.

Edit files as appropriate.

Open a pull request that describes your changes and documents why you made the changes you did.

Request a review.

Your pull request will be reviewed by a member of the Truck Tracker team as soon as we can.

### Folder hierarchy

- Web pages are located in /truck-tracker-master/frontend/src/components
- CSS files are located in /truck-tracker-master/frontend/src/styles


### Add a new page or update a URL

In editor, open /truck-tracker-master/frontend/src/containers/App.js

At top of file, add or update `import {new-file-name} from './../containers/{new-file-name}';`, replacing everything in curly braces.

Scroll to `getActiveContent()` function and add new case-return pair:

```
case '#{URL-slug}':
  return {new-file-name};
```
