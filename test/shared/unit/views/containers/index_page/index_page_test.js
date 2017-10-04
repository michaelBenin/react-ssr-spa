import React from 'react';

import { expect } from 'chai';
import { StaticRouter } from 'react-router';

import IndexPage from '../../../../../../src/views/containers/pages/index_page/index_page';
import Enzyme from '../../../../utils/enzyme_adapter_util';

const { shallow } = Enzyme;

describe('A suite for index page', function() {
  it('renders without error', function() {
    expect(
      shallow(
        <StaticRouter context={{}}>
          <IndexPage />
        </StaticRouter>
      ).dive().length
    ).to.equal(1);
  });
});
