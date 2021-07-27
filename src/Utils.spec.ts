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

  describe('#edges', () => {
    it('should return edges of annotated spans', () => {
      expect(Array.from(Utils.edges([]))).to.deep.equal([]);
      expect(Array.from(Utils.edges([[0, 1, 'a']]))).to.deep.equal([[['a'], []], [[], ['a']]]);
      expect(Array.from(Utils.edges([[0, 1, 'a'], [0, 1, 'b']]))).to.deep.equal([[['a', 'b'], []], [[], ['a', 'b']]]);
      expect(Array.from(Utils.edges([[0, 1, 'b'], [0, 1, 'a']]))).to.deep.equal([[['b', 'a'], []], [[], ['b', 'a']]]);
      expect(Array.from(Utils.edges([[0, 1, 'a'], [1, 1, 'b']]))).to.deep.equal([[['a'], []], [['b'], ['a']], [[], ['b']]]);
      expect(Array.from(Utils.edges([[0, 1, 'b'], [1, 1, 'a']]))).to.deep.equal([[['b'], []], [['a'], ['b']], [[], ['a']]]);
      expect(Array.from(Utils.edges([[1, 1, 'a'], [0, 1, 'b']]))).to.deep.equal([[['b'], []], [['a'], ['b']], [[], ['a']]]);
      expect(Array.from(Utils.edges([[1, 1, 'b'], [0, 1, 'a']]))).to.deep.equal([[['a'], []], [['b'], ['a']], [[], ['b']]]);
      expect(Array.from(Utils.edges([[0, 1, 'a'], [2, 1, 'b']]))).to.deep.equal([[['a'], []], [[], ['a']], [['b'], []], [[], ['b']]]);
      expect(Array.from(Utils.edges([[0, 1, 'b'], [2, 1, 'a']]))).to.deep.equal([[['b'], []], [[], ['b']], [['a'], []], [[], ['a']]]);
      expect(Array.from(Utils.edges([[2, 1, 'b'], [0, 1, 'a']]))).to.deep.equal([[['a'], []], [[], ['a']], [['b'], []], [[], ['b']]]);
      expect(Array.from(Utils.edges([[2, 1, 'a'], [0, 1, 'b']]))).to.deep.equal([[['b'], []], [[], ['b']], [['a'], []], [[], ['a']]]);
      expect(Array.from(Utils.edges([[0, 3, 'a'], [1, 1, 'b']]))).to.deep.equal([[['a'], []], [['b'], []], [[], ['b']], [[], ['a']]]);
      expect(Array.from(Utils.edges([[0, 3, 'b'], [1, 1, 'a']]))).to.deep.equal([[['b'], []], [['a'], []], [[], ['a']], [[], ['b']]]);
      expect(Array.from(Utils.edges([[1, 1, 'a'], [0, 3, 'b']]))).to.deep.equal([[['b'], []], [['a'], []], [[], ['a']], [[], ['b']]]);
      expect(Array.from(Utils.edges([[1, 1, 'b'], [0, 3, 'a']]))).to.deep.equal([[['a'], []], [['b'], []], [[], ['b']], [[], ['a']]]);
    });
  });

  describe('#merge', () => {
    it('should merge spans', () => {
      expect(Array.from(Utils.merge(0, 0, [[0, 0, '']]))).to.deep.equal([]);
      expect(Array.from(Utils.merge(0, 1, [[0, 1, '']]))).to.deep.equal([[0, 1, new Set([''])]]);
      expect(Array.from(Utils.merge(42, 19, [[42, 19, '']]))).to.deep.equal([[42, 19, new Set([''])]]);
      expect(Array.from(Utils.merge(0, 1, [[0, 1, ''], [0, 1, 'bf']]))).to.deep.equal([[0, 1, new Set(['', 'bf'])]]);
      expect(Array.from(Utils.merge(0, 2, [[0, 2, ''], [0, 1, 'it']]))).to.deep.equal([[0, 1, new Set(['', 'it'])], [1, 1, new Set([''])]]);
      expect(Array.from(Utils.merge(0, 2, [[0, 2, ''], [1, 1, 'ul']]))).to.deep.equal([[0, 1, new Set([''])], [1, 1, new Set(['', 'ul'])]]);
      expect(Array.from(Utils.merge(0, 2, [[0, 2, ''], [1, 1, 'high'], [0, 1, 'bold']]))).to.deep.equal([[0, 1, new Set(['', 'bold'])], [1, 1, new Set(['', 'high'])]]);
      expect(Array.from(Utils.merge(0, 2, [[0, 2, ''], [1, 1, 'blue'], [0, 2, 'red']]))).to.deep.equal([[0, 1, new Set(['', 'red'])], [1, 1, new Set(['', 'red', 'blue'])]]);
      expect(Array.from(Utils.merge(137, 7, [[137, 7, ''], [140, 3, 'yellow']]))).to.deep.equal([[137, 3, new Set([''])], [140, 3, new Set(['', 'yellow'])], [143, 1, new Set([''])]]);
      expect(Array.from(Utils.merge(10, 35, [[10, 35, ''], [10, 34, 'text-muted'], [44, 1, 'text-primary']]))).to.deep.equal([[10, 34, new Set(['', 'text-muted'])], [44, 1, new Set(['', 'text-primary'])]]);
      expect(Array.from(Utils.merge(10, 35, [[10, 35, ''], [10, 35, 'text-muted'], [44, 1, 'text-primary']]))).to.deep.equal([[10, 34, new Set(['', 'text-muted'])], [44, 1, new Set(['', 'text-muted', 'text-primary'])]]);
      expect(Array.from(Utils.merge(10, 36, [[10, 36, ''], [10, 35, 'text-muted'], [44, 1, 'text-primary']]))).to.deep.equal([[10, 34, new Set(['', 'text-muted'])], [44, 1, new Set(['', 'text-muted', 'text-primary'])], [45, 1, new Set([''])]]);
      expect(Array.from(Utils.merge(23, 64, [[23, 64, ''], [0, 532, 'text-wrap'], [5, 391, 'fs-2']]))).to.deep.equal([[23, 64, new Set(['', 'text-wrap', 'fs-2'])]]);
      expect(Array.from(Utils.merge(0, 40, [[0, 40, ''], [8, 16, 'bold'], [16, 16, 'italic']]))).to.deep.equal([[0, 8, new Set([''])], [8, 8, new Set(['', 'bold'])], [16, 8, new Set(['', 'bold', 'italic'])], [24, 8, new Set(['', 'italic'])], [32, 8, new Set([''])]]);
    });
  });
});
