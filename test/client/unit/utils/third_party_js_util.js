import { expect } from 'chai';
import {
  loadAllThirdPartyJs,
  ThirdPartyJs
} from '../../../../src/client/utils/third_party_js_util';

describe('third party js util unit tests:', function() {
  it('loadAllThirdPartyJS Should be a function', function() {
    expect(typeof loadAllThirdPartyJs).to.equal('function');
  });

  it('SetThirdPartyGlobals should be a function', function() {
    expect(typeof ThirdPartyJs.setThirdPartyGlobals).to.equal('function');
  });
});
