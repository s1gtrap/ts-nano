import { expect } from 'chai';

import Utils from './Utils';

describe('Utils', () => {
  describe('#enumerate', () => {
    it('should enumerate iterator elements', () => {
      expect(Array.from(Utils.enumerate([]))).to.deep.equal([]);
      expect(Array.from(Utils.enumerate([0]))).to.deep.equal([[0, 0]]);
      expect(Array.from(Utils.enumerate(['']))).to.deep.equal([[0, '']]);
      expect(Array.from(Utils.enumerate([null]))).to.deep.equal([[0, null]]);
      expect(Array.from(Utils.enumerate([1, 2, 4, 8]))).to.deep.equal([[0, 1], [1, 2], [2, 4], [3, 8]]);
      expect(Array.from(Utils.enumerate(['Hello,', ' world!']))).to.deep.equal([[0, 'Hello,'], [1, ' world!']]);
      expect(Array.from(Utils.enumerate([null, 42, 'ite', [1, 2, 3], { hello: 'world' }]))).to.deep.equal([[0, null], [1, 42], [2, 'ite'], [3, [1, 2, 3]], [4, { hello: 'world' }]]);
    });
  });
});
