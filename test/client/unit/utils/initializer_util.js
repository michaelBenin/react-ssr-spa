import { expect } from 'chai';
import initializerUtil from '../../../../src/client/utils/initializer_util';

describe('initializer util unit tests:', function() {
  it('Should be a function', function() {
    expect(typeof initializerUtil).to.equal('function');
  });
});
