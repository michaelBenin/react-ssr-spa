# react-ssr-spa 

### About:

react-ssr-spa is a react app that is server side rendered and is a single page app. 

Should you use this as a starting point for your application? A good way to know is if you answered yes to any of the following questions. 
 
 Do we need SEO?

 Do we need fast page loads without a loading spinner?
 
 Do we need a fast app like website?

## Quickstart:

Requirements:

node.js v5.6.0
npm v3.8.6

````
git clone git@github.com:michaelBenin/react-ssr-spa.git
cd react-ssr-spa
npm i
npm start
````

### Configuration:

(Optional) Create an .env file at the root of the directory. See .env.example in root.

## Commands:

### Run in dev mode:

    npm start

### Server Side Unit Tests:

    npm run server-unit-test

### Server Side Integration Tests:

    npm run server-integration-test


### Client Side Unit Tests:

    npm run client-unit-test


### Client Side Integration Tests:

    npm run client-integration-test


### Functional / Acceptance Tests (WIP):

    npm run acceptance-test


### JS Lint (uses eslint):

    npm run js-lint
    npm run js-lint-fix


### Style Lint:

    npm run style-lint

### Generate JS Documentation:

    npm run js-doc
    
### Generate Style Documentation:

    npm run style-doc

### Generate All Documentation:

    npm run docs

### Build production assets:

    npm run build-prod

### Run production server (requires PM2 installed globally)

If PM2 is not installed:

    npm i pm2 -g

To run server in production mode:

    npm run prod-server

### Upload Artifact to S3

    npm run create-upload-artifact

### Upload Static Files to S3

    npm run upload-static-files

### Deployment (ansible & ansistrano)

    ansible-playbook -u ubuntu ./ansible/deploy/deploy.yml

### Rollback (ansible & ansistrano)

    ansible-playbook -vvvv -u ubuntu ./ansible/rollback/rollback.yml

### Core Libraries:

https://github.com/facebook/react

https://github.com/reactjs/react-router

https://github.com/reactjs/redux

https://github.com/reactjs/react-redux

https://github.com/reactjs/react-router-redux

https://github.com/gaearon/redux-thunk

https://github.com/expressjs/express

### Inspiration: 

https://github.com/rendrjs/rendr

https://github.com/michaelBenin/node-startup

https://github.com/ember-fastboot/ember-cli-fastboot

