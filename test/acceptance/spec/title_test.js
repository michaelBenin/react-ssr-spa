import { expect } from 'chai';

describe('webdriver.io page', function () {
  it('should have the right server rendered title', function () {
    this.timeout(30000);
    browser.url('http://127.0.0.1:8001/repo/michaelBenin/react-ssr-spa');
    const title = browser.getTitle();
    expect(title).to.equal('react-ssr-spa - Server side rendered single page app using reactjs official libraries.');
  });
});
