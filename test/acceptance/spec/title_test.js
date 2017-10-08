import { expect } from 'chai';

describe('#homepage', function() {
  it('should have the right server rendered title', function() {
    browser.url('http://127.0.0.1:8001');
    const title = browser.getTitle();
    expect(title).to.equal('Homepage of react-ssr-spa');
  });

  it('should execute js correctly', function() {
    browser.waitForExist('.fonts-loaded.hydrated', 10000);
  });

  browser.click('[href="/repo/michaelBenin/react-ssr-spa"]');

  browser.waitForExist('.repo-detail-page__main', 2000);

  browser.waitUntil(
    function() {
      return browser.getTitle() === 'react-ssr-spa';
    },
    2000,
    'expected title update after 2s'
  );
});

describe('#repoDetail', function() {
  it('should have the right server rendered title', function() {
    browser.url('http://127.0.0.1:8001/repo/michaelBenin/react-ssr-spa');
    const title = browser.getTitle();
    expect(title).to.equal('react-ssr-spa');
  });

  it('should execute js correctly', function() {
    browser.waitForExist('.fonts-loaded.hydrated', 10000);
  });
});

describe('#about', function() {
  it('should have the right server rendered title', function() {
    browser.url('http://127.0.0.1:8001/about');
    const title = browser.getTitle();
    expect(title).to.equal('About Page of react-ssr-spa');
  });

  it('should execute js correctly', function() {
    browser.waitForExist('.fonts-loaded.hydrated', 10000);
  });
});
