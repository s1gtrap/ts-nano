import { expect } from 'chai';

import Rope from './Rope';

describe('Rope', () => {
  describe('#weight', () => {
    it('should evaluate to length of leaves', () => {
      expect(Rope.leaf('Hello ').weight).to.equal(6);
    });

    it('should evaluate to weight of leftmost child of branches', () => {
      expect(Rope.branch(Rope.leaf('Hello '), Rope.leaf('world!')).weight).to.equal(6);
      expect(Rope.branch(Rope.branch(Rope.leaf('Hello '), Rope.leaf('my ')), Rope.branch(Rope.branch(Rope.leaf('na'), Rope.leaf('me i')), Rope.branch(Rope.leaf('s'), Rope.leaf(' Simon')))).weight).to.equal(9);
    });
  });

  describe('#split', () => {
    it('should split rope at given index', () => {
      (() => {
        const rope = Rope.leaf('hi');
        expect(rope.split(2)).to.deep.equal(Rope.leaf(''));
        expect(rope).to.deep.equal(Rope.leaf('hi'));
      })();
      (() => {
        const rope = Rope.leaf('hi');
        expect(rope.split(1)).to.deep.equal(Rope.leaf('i'));
        expect(rope).to.deep.equal(Rope.leaf('h'));
      })();
      (() => {
        const rope = Rope.leaf('hi');
        expect(rope.split(0)).to.deep.equal(Rope.leaf('hi'));
        expect(rope).to.deep.equal(Rope.leaf(''));
      })();
      (() => {
        const rope = Rope.branch(Rope.leaf('hello '), Rope.leaf('world!'));
        expect(rope.split(6)).to.deep.equal(Rope.leaf('world!'));
        expect(rope).to.deep.equal(Rope.branch(Rope.leaf('hello '), Rope.leaf('')));
      })();
      (() => {
        const rope = Rope.branch(Rope.leaf('hello '), Rope.leaf('world!'));
        expect(rope.split(2)).to.deep.equal(Rope.branch(Rope.leaf('llo '), Rope.leaf('world!')));
        expect(rope).to.deep.equal(Rope.branch(Rope.leaf('he'), null));
      })();
      (() => {
        const rope = Rope.branch(Rope.leaf('Hello '), Rope.leaf('world!'));
        expect(rope.split(9)).to.deep.equal(Rope.leaf('ld!'));
        expect(rope).to.deep.equal(Rope.branch(Rope.leaf('Hello '), Rope.leaf('wor')));
      })();
      (() => {
        const rope = Rope.branch(Rope.branch(Rope.leaf('Hello '), Rope.leaf('my ')), Rope.branch(Rope.branch(Rope.leaf('na'), Rope.leaf('me i')), Rope.branch(Rope.leaf('s'), Rope.leaf(' Simon'))));
        expect(rope.split(11)).to.deep.equal(Rope.branch(Rope.leaf('me i'), Rope.branch(Rope.leaf('s'), Rope.leaf(' Simon'))));
        expect(rope).to.deep.equal(Rope.branch(Rope.branch(Rope.leaf('Hello '), Rope.leaf('my ')), Rope.branch(Rope.branch(Rope.leaf('na'), Rope.leaf('')), null)));
      })();
      (() => {
        const rope = Rope.branch(Rope.branch(Rope.leaf('Hello '), Rope.leaf('my ')), Rope.branch(Rope.branch(Rope.leaf('na'), Rope.leaf('me i')), Rope.branch(Rope.leaf('s'), Rope.leaf(' Simon'))));
        expect(rope.split(12)).to.deep.equal(Rope.branch(Rope.leaf('e i'), Rope.branch(Rope.leaf('s'), Rope.leaf(' Simon'))));
        expect(rope).to.deep.equal(Rope.branch(Rope.branch(Rope.leaf('Hello '), Rope.leaf('my ')), Rope.branch(Rope.branch(Rope.leaf('na'), Rope.leaf('m')), null)));
      })();
      (() => {
        const rope = Rope.branch(Rope.branch(Rope.leaf('Hello '), Rope.leaf('my ')), Rope.branch(Rope.branch(Rope.leaf('na'), Rope.leaf('me i')), Rope.branch(Rope.leaf('s'), Rope.leaf(' Simon'))));
        expect(rope.split(10)).to.deep.equal(Rope.branch(Rope.branch(Rope.leaf('a'), Rope.leaf('me i')), Rope.branch(Rope.leaf('s'), Rope.leaf(' Simon'))));
        expect(rope).to.deep.equal(Rope.branch(Rope.branch(Rope.leaf('Hello '), Rope.leaf('my ')), Rope.branch(Rope.branch(Rope.leaf('n'), null), null)));
      })();
    });
  });

  describe('#insert', () => {
    it('should insert into rope at given index', () => {
      (() => {
        const rope = Rope.leaf('Hellworld');
        rope.insert(4, 'o, ');
        expect(rope).to.deep.equal(Rope.branch(Rope.branch(Rope.leaf('Hell'), Rope.leaf('o, ')), Rope.leaf('world')));
      })();
    });
  });

  describe('#lines', () => {
    it('should iterate over lines', () => {
      expect(Array.from(Rope.leaf('').lines())).to.deep.equal(['']);
      expect(Array.from(Rope.leaf('\n').lines())).to.deep.equal(['', '']);
      expect(Array.from(Rope.leaf('\r\n').lines())).to.deep.equal(['', '']);
      expect(Array.from(Rope.leaf('\n\n').lines())).to.deep.equal(['', '', '']);
      expect(Array.from(Rope.leaf('\n\r\n').lines())).to.deep.equal(['', '', '']);
      expect(Array.from(Rope.leaf('\r\n\r\n').lines())).to.deep.equal(['', '', '']);
      expect(Array.from(Rope.leaf('a\n').lines())).to.deep.equal(['a', '']);
      expect(Array.from(Rope.leaf(' \r\n').lines())).to.deep.equal([' ', '']);
      expect(Array.from(Rope.leaf('Hello world\n').lines())).to.deep.equal(['Hello world', '']);
      expect(Array.from(Rope.leaf('Hello world\r\n').lines())).to.deep.equal(['Hello world', '']);
      expect(Array.from(Rope.leaf('Hello,\nworld\n').lines())).to.deep.equal(['Hello,', 'world', '']);
      expect(Array.from(Rope.leaf('Hello,\nworld\r\n').lines())).to.deep.equal(['Hello,', 'world', '']);
      expect(Array.from(Rope.leaf('Hello,\r\nworld\n').lines())).to.deep.equal(['Hello,', 'world', '']);
      expect(Array.from(Rope.leaf('Hello,\r\nworld\r\n').lines())).to.deep.equal(['Hello,', 'world', '']);
    });
  });

  describe('#lineIndices', () => {
    it('should iterate over lines with character index/offset', () => {
      expect(Array.from(Rope.leaf('').lineIndices())).to.deep.equal([[0, '']]);
      expect(Array.from(Rope.leaf('\n').lineIndices())).to.deep.equal([[0, ''], [1, '']]);
      expect(Array.from(Rope.leaf('\r\n').lineIndices())).to.deep.equal([[0, ''], [2, '']]);
      expect(Array.from(Rope.leaf('\n\n').lineIndices())).to.deep.equal([[0, ''], [1, ''], [2, '']]);
      expect(Array.from(Rope.leaf('\n\r\n').lineIndices())).to.deep.equal([[0, ''], [1, ''], [3, '']]);
      expect(Array.from(Rope.leaf('\r\n\r\n').lineIndices())).to.deep.equal([[0, ''], [2, ''], [4, '']]);
      expect(Array.from(Rope.leaf('a\n').lineIndices())).to.deep.equal([[0, 'a'], [2, '']]);
      expect(Array.from(Rope.leaf(' \r\n').lineIndices())).to.deep.equal([[0, ' '], [3, '']]);
      expect(Array.from(Rope.leaf('Hello world\n').lineIndices())).to.deep.equal([[0, 'Hello world'], [12, '']]);
      expect(Array.from(Rope.leaf('Hello world\r\n').lineIndices())).to.deep.equal([[0, 'Hello world'], [13, '']]);
      expect(Array.from(Rope.leaf('Hello,\nworld\n').lineIndices())).to.deep.equal([[0, 'Hello,'], [7, 'world'], [13, '']]);
      expect(Array.from(Rope.leaf('Hello,\nworld\r\n').lineIndices())).to.deep.equal([[0, 'Hello,'], [7, 'world'], [14, '']]);
      expect(Array.from(Rope.leaf('Hello,\r\nworld\n').lineIndices())).to.deep.equal([[0, 'Hello,'], [8, 'world'], [14, '']]);
      expect(Array.from(Rope.leaf('Hello,\r\nworld\r\n').lineIndices())).to.deep.equal([[0, 'Hello,'], [8, 'world'], [15, '']]);
    });
  });

  describe('#charToLine', () => {
    it('should return line index of given char', () => {
      expect(Rope.leaf('').charToLine(0)).to.equal(0);
      expect(Rope.leaf('\n').charToLine(0)).to.equal(0);
      expect(Rope.leaf('\n').charToLine(1)).to.equal(1);
      expect(Rope.leaf('\r\n').charToLine(1)).to.equal(0);
      expect(Rope.leaf('\n\n').charToLine(1)).to.equal(1);
      expect(Rope.leaf('\n\r\n').charToLine(1)).to.equal(1);
      expect(Rope.leaf('\r\n\r\n').charToLine(1)).to.equal(0);
      expect(Rope.leaf('a\n').charToLine(0)).to.equal(0);
      expect(Rope.leaf('a\n').charToLine(1)).to.equal(0);
      expect(Rope.leaf('a\n').charToLine(2)).to.equal(1);
      expect(Rope.leaf(' \r\n').charToLine(0)).to.equal(0);
      expect(Rope.leaf(' \r\n').charToLine(1)).to.equal(0);
      expect(Rope.leaf(' \r\n').charToLine(2)).to.equal(0);
      expect(Rope.leaf(' \r\n').charToLine(3)).to.equal(1);
      expect(Rope.leaf('Hello world\n').charToLine(0)).to.equal(0);
      expect(Rope.leaf('Hello world\n').charToLine(11)).to.equal(0);
      expect(Rope.leaf('Hello world\n').charToLine(12)).to.equal(1);
      expect(Rope.leaf('Hello world\r\n').charToLine(0)).to.equal(0);
      expect(Rope.leaf('Hello world\r\n').charToLine(12)).to.equal(0);
      expect(Rope.leaf('Hello world\r\n').charToLine(13)).to.equal(1);
      expect(Rope.leaf('Hello,\nworld\n').charToLine(0)).to.equal(0);
      expect(Rope.leaf('Hello,\nworld\n').charToLine(6)).to.equal(0);
      expect(Rope.leaf('Hello,\nworld\n').charToLine(7)).to.equal(1);
      expect(Rope.leaf('Hello,\nworld\n').charToLine(12)).to.equal(1);
      expect(Rope.leaf('Hello,\nworld\n').charToLine(13)).to.equal(2);
      expect(Rope.leaf('Hello,\nworld\r\n').charToLine(0)).to.equal(0);
      expect(Rope.leaf('Hello,\nworld\r\n').charToLine(6)).to.equal(0);
      expect(Rope.leaf('Hello,\nworld\r\n').charToLine(7)).to.equal(1);
      expect(Rope.leaf('Hello,\nworld\r\n').charToLine(13)).to.equal(1);
      expect(Rope.leaf('Hello,\nworld\r\n').charToLine(14)).to.equal(2);
      expect(Rope.leaf('Hello,\r\nworld\n').charToLine(0)).to.equal(0);
      expect(Rope.leaf('Hello,\r\nworld\n').charToLine(7)).to.equal(0);
      expect(Rope.leaf('Hello,\r\nworld\n').charToLine(8)).to.equal(1);
      expect(Rope.leaf('Hello,\r\nworld\n').charToLine(13)).to.equal(1);
      expect(Rope.leaf('Hello,\r\nworld\n').charToLine(14)).to.equal(2);
      expect(Rope.leaf('Hello,\r\nworld\r\n').charToLine(0)).to.equal(0);
      expect(Rope.leaf('Hello,\r\nworld\r\n').charToLine(7)).to.equal(0);
      expect(Rope.leaf('Hello,\r\nworld\r\n').charToLine(8)).to.equal(1);
      expect(Rope.leaf('Hello,\r\nworld\r\n').charToLine(14)).to.equal(1);
      expect(Rope.leaf('Hello,\r\nworld\r\n').charToLine(15)).to.equal(2);
    });

    it('should throw when out of bounds', () => {
      expect(() => Rope.leaf('').charToLine(1)).to.throw();
      expect(() => Rope.leaf('\n').charToLine(2)).to.throw();
      expect(() => Rope.leaf('\n\n').charToLine(3)).to.throw();
      expect(() => Rope.leaf('\n\n\n').charToLine(4)).to.throw();
      expect(() => Rope.leaf('\r\n\r\n\r\n').charToLine(42)).to.throw();
      expect(() => Rope.leaf('Hello,\r\nworld\r\n').charToLine(16)).to.throws();
      expect(() => Rope.leaf('Hello,\r\nworld\r\n').charToLine(420)).to.throws();
    });
  });

  describe('#lineToChar', () => {
    it('should return char index of given line', () => {
      expect(Rope.leaf('').lineToChar(0)).to.equal(0);
      expect(Rope.leaf('\n').lineToChar(0)).to.equal(0);
      expect(Rope.leaf('\n').lineToChar(1)).to.equal(1);
      expect(Rope.leaf('\r\n').lineToChar(1)).to.equal(2);
      expect(Rope.leaf('\n\n').lineToChar(1)).to.equal(1);
      expect(Rope.leaf('\n\r\n').lineToChar(1)).to.equal(1);
      expect(Rope.leaf('\r\n\r\n').lineToChar(1)).to.equal(2);
      expect(Rope.leaf('a\n').lineToChar(1)).to.equal(2);
      expect(Rope.leaf(' \r\n').lineToChar(1)).to.equal(3);
      expect(Rope.leaf('Hello world\n').lineToChar(1)).to.equal(12);
      expect(Rope.leaf('Hello world\r\n').lineToChar(1)).to.equal(13);
      expect(Rope.leaf('Hello,\nworld\n').lineToChar(1)).to.equal(7);
      expect(Rope.leaf('Hello,\nworld\r\n').lineToChar(1)).to.equal(7);
      expect(Rope.leaf('Hello,\r\nworld\n').lineToChar(1)).to.equal(8);
      expect(Rope.leaf('Hello,\r\nworld\r\n').lineToChar(1)).to.equal(8);
      expect(Rope.leaf('Hello,\nworld\n').lineToChar(2)).to.equal(13);
      expect(Rope.leaf('Hello,\nworld\r\n').lineToChar(2)).to.equal(14);
      expect(Rope.leaf('Hello,\r\nworld\n').lineToChar(2)).to.equal(14);
      expect(Rope.leaf('Hello,\r\nworld\r\n').lineToChar(2)).to.equal(15);
    });

    it('should throw when out of bounds', () => {
      expect(() => Rope.leaf('').lineToChar(1)).to.throw();
      expect(() => Rope.leaf('\n').lineToChar(2)).to.throw();
      expect(() => Rope.leaf('\n\n').lineToChar(3)).to.throw();
      expect(() => Rope.leaf('\n\n\n').lineToChar(4)).to.throw();
      expect(() => Rope.leaf('\r\n\r\n\r\n').lineToChar(42)).to.throw();
      expect(() => Rope.leaf('Hello,\r\nworld\r\n').lineToChar(3)).to.throws();
      expect(() => Rope.leaf('Hello,\r\nworld\r\n').lineToChar(4)).to.throws();
      expect(() => Rope.leaf('Hello,\r\nworld\r\n').lineToChar(100)).to.throws();
    });
  });
});
