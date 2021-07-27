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

  describe('#split', () => {
    it('should split spans over intervals given', () => {
      expect(Array.from(Utils.split(0, 0, []))).to.deep.equal([]);
      expect(Array.from(Utils.split(0, 0, [[1, 2, 'a']]))).to.deep.equal([]);
      expect(Array.from(Utils.split(1, 0, [[0, 1, 'a'], [1, 1, 'b']]))).to.deep.equal([]);
      expect(Array.from(Utils.split(1, 1, [[0, 1, 'a'], [2, 1, 'b']]))).to.deep.equal([]);
      expect(Array.from(Utils.split(0, 1, []))).to.deep.equal([]);
      expect(Array.from(Utils.split(8, 72, []))).to.deep.equal([]);
      expect(Array.from(Utils.split(0, 1, [[0, 1, 'a']]))).to.deep.equal([[0, 1, 'a']]);
      expect(
        Array.from(
          Utils.split(0, 1, [[0, 2, 'some-class-lmao']]),
        ),
      ).to.deep.equal([[0, 1, 'some-class-lmao']]);
      expect(Array.from(Utils.split(1, 1, [[0, 2, 'yeet']]))).to.deep.equal([[1, 1, 'yeet']]);
      expect(Array.from(Utils.split(0, 1, [[1, 1, 'col-6']]))).to.deep.equal([]);
      expect(Array.from(Utils.split(1, 1, [[0, 1, 'some-other-class-rofl']]))).to.deep.equal([]);
      expect(
        Array.from(
          Utils.split(10, 36, [[10, 35, 'text-muted'], [44, 1, 'text-primary']]),
        ),
      ).to.deep.equal([[10, 35, 'text-muted'], [44, 1, 'text-primary']]);
      expect(
        Array.from(
          Utils.split(
            2,
            7,
            [
              [4, 2, 'inner'],
              [2, 1, 'lower-edge'],
              [6, 1, 'upper-edge'],
              [1, 4, 'lower-outer'],
              [6, 42, 'upper-outer'],
              [0, 78, 'outer'],
            ],
          ),
        ),
      ).to.deep.equal(
        [
          [4, 2, 'inner'],
          [2, 1, 'lower-edge'],
          [6, 1, 'upper-edge'],
          [2, 3, 'lower-outer'],
          [6, 3, 'upper-outer'],
          [2, 7, 'outer'],
        ],
      );
    });
  });
});
