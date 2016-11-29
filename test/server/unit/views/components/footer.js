import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import Footer from '../../../../../src/views/components/footer/footer';

describe('A suite for footer', function describeSuite() {
  it('contains the correct class', function correctClass() {
    expect(shallow(<Footer />).is('.footer')).to.equal(true);
  });
  it('contains spec with an expectation', function containsExpectation() {
    expect(mount(<Footer />).find('.footer').length).to.equal(1);
  });
});
