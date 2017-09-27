import React from 'react';
import { expect } from 'chai';
import { StaticRouter } from 'react-router';

import AboutPage from '../../../../../../src/views/containers/pages/about_page/about_page';
import Enzyme from '../../../../utils/enzyme_adapter_util';

const { shallow, mount } = Enzyme;

describe('A suite for about page', function() {
  it('contains the correct class', function correctClass() {
    expect(shallow(<AboutPage />).is('.about-page')).to.equal(true);
  });

  it('contains spec with an expectation', function() {
    expect(
      mount(
        <StaticRouter context={{}}>
          <AboutPage />
        </StaticRouter>
      ).find('.about-page').length
    ).to.equal(1);
  });
});
