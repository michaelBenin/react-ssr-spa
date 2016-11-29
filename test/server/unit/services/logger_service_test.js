import { expect } from 'chai';
import log from '../../../../src/server/services/logger_service';

describe('Testing logger service.', () => {
  it('Should return a function', () => {
    expect(typeof log.info).to.equal('function');
  });
});
