import { expect } from 'chai';
import FontLoaderUtil from '../../../../src/client/utils/font_loader_util';

describe('Font loader util unit tests:', function() {
  it('Should have method loadFonts', function() {
    expect(typeof FontLoaderUtil.loadFonts).to.equal('function');
  });
});
