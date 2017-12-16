[![Build Status](https://travis-ci.org/michaelBenin/react-ssr-spa.svg?branch=master)](https://travis-ci.org/michaelBenin/react-ssr-spa) [![dependencies Status](https://david-dm.org/michaelBenin/react-ssr-spa/status.svg)](https://david-dm.org/michaelBenin/react-ssr-spa) [![devDependencies Status](https://david-dm.org/michaelBenin/react-ssr-spa/dev-status.svg)](https://david-dm.org/michaelBenin/react-ssr-spa?type=dev) [![NSP Status](https://nodesecurity.io/orgs/react-ssr-spa/projects/517c11e2-34a4-425f-bf5e-3b074e49ab7f/badge)](https://nodesecurity.io/orgs/react-ssr-spa/projects/517c11e2-34a4-425f-bf5e-3b074e49ab7f)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Server Coverage: [![Coverage Status](https://coveralls.io/repos/github/michaelBenin/react-ssr-spa/badge.svg?branch=master)](https://coveralls.io/github/michaelBenin/react-ssr-spa?branch=master)

Client Coverage: [![codecov](https://codecov.io/gh/michaelBenin/react-ssr-spa/branch/master/graph/badge.svg)](https://codecov.io/gh/michaelBenin/react-ssr-spa)

Acceptance Tests: [![Sauce Test Status](https://saucelabs.com/buildstatus/YOUR_SAUCE_USERNAME)](https://saucelabs.com/u/YOUR_SAUCE_USERNAME)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/YOUR_SAUCE_USERNAME.svg)](https://saucelabs.com/u/YOUR_SAUCE_USERNAME)


# react-ssr-spa

### About:

react-ssr-spa is a react app that is server side rendered and is a single page app.

Should you use this as a starting point for your application? A good way to know is if you answered yes to any of the following questions.

 Do we need SEO?

 Do we need fast page loads without a loading spinner?

 Do we need a fast app like website?

## Quickstart:

Requirements:

node.js v8.9.1
npm v5.5.1

````
git clone git@github.com:michaelBenin/react-ssr-spa.git
cd react-ssr-spa
npm i
npm start
Open browser http://localhost:8001/
````

### Configuration:

(Optional) Create an .env file at the root of the directory. See .env.example in root.

## Commands:

### Run in dev mode:

    npm start

Optimized for use with:

[React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)

[Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

[Node Inspector Manager](https://chrome.google.com/webstore/detail/nodejs-inspector-manager/bnmjajghllhhhgiaeipaibfmnjnponhd?hl=en)

### Server Side Unit Tests:

    npm run server-unit-test

### Server Side Integration Tests:

    npm run server-integration-test


### Client Side Unit Tests:

    npm run client-unit-test
    npm run client-unit-test-watch


### Client Side Integration Tests:

    npm run client-integration-test
    npm run client-integration-test-watch


### Functional / Acceptance Tests (WIP):

    npm run acceptance-test


### JS Lint (uses eslint):

    npm run js-lint
    npm run js-lint-fix


### Style Lint (uses styleint):

    npm run style-lint
    npm run style-lint-fix

### Fix JS/SCSS Lint:

    npm run fix-all

### Generate JS Documentation:

    npm run js-doc

### Generate Style Documentation:

    npm run style-doc

### Generate All Documentation:

    npm run docs

### Generate Complexity Report:

    npm run complexity-report    

### Build production assets:

    npm run build-prod

### Emulate Production Locally:

    npm run build-prod
    NODE_ENV=test node dist/server

### Run production server (requires PM2 installed globally)

If PM2 is not installed:

    npm i pm2 -g

To run server in production mode:

    npm run prod-server

### Upload Artifact to S3

    npm run create-upload-artifact

### Upload Static Files to S3

    npm run upload-static-files

### Configure Server 

    ansible-playbook -u ubuntu ./ansible/deploy/deploy.yml

### Deployment (ansible & ansistrano)

    ansible-playbook -u ubuntu ./ansible/deploy/deploy.yml

### Rollback (ansible & ansistrano)

    ansible-playbook -u ubuntu ./ansible/rollback/rollback.yml

### Core Libraries:

https://github.com/facebook/react

https://github.com/reactjs/react-router

https://github.com/reactjs/redux

https://github.com/reactjs/react-redux

https://github.com/reactjs/react-router-redux

https://github.com/gaearon/redux-thunk

https://github.com/nfl/react-helmet

https://github.com/expressjs/express

### Inspiration:

https://github.com/rendrjs/rendr

https://github.com/michaelBenin/node-startup

https://github.com/ember-fastboot/ember-cli-fastboot

