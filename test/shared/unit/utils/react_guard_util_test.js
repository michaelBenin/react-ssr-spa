import { expect } from 'chai';
import reactGuardUtil from '../../../../src/utils/react_guard_util';

describe('Font loader util unit tests:', function() {
  it('Should have method loadFonts', function() {
    expect(typeof reactGuardUtil).to.equal('function');
  });
});
