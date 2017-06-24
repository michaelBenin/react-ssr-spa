import React from 'react';

import { expect } from 'chai';
import { shallow, mount } from 'enzyme';

import AboutPage from '../../../../../src/views/containers/pages/about_page/about_page';

describe('A suite for about page', function() {
  it('contains the correct class', function correctClass() {
    expect(shallow(<AboutPage />).is('.about-page')).to.equal(true);
  });

  it('contains spec with an expectation', function() {
    expect(mount(<AboutPage />).find('.about-page').length).to.equal(1);
  });
});
