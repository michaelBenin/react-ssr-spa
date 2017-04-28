import { JSDOM } from 'jsdom';

const exposedProperties = ['window', 'navigator', 'document'];

const jsdom = new JSDOM('');
global.document = jsdom.window.document;
global.window = jsdom.window;

Object.keys(document).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

global.documentRef = document;
