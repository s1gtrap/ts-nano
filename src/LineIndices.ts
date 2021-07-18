import Rope from './Rope';

export default class LineIndices implements IterableIterator<[number, string]> {
  private content: string | undefined;
  private offset = 0;

  public constructor(rope: Rope) {
    this.content = rope.toString();
  }

  public next(): IteratorResult<[number, string]> {
    if (this.content !== undefined) {
      const idx = this.content.indexOf('\n');
      if (idx !== -1) {
        if (this.content[idx - 1] === '\r') {
          const line = this.content.slice(0, idx - 1);
          const offset = this.offset;
          this.content = this.content.slice(idx + 1);
          this.offset += idx + 1;
          return {
            done: false,
            value: [offset, line],
          };
        } else {
          const line = this.content.slice(0, idx);
          const offset = this.offset;
          this.content = this.content.slice(idx + 1);
          this.offset += idx + 1;
          return {
            done: false,
            value: [offset, line],
          };
        }
      } else {
        const line = this.content;
        const offset = this.offset;
        this.content = undefined;
        return {
          done: false,
          value: [offset, line],
        };
      }
    } else {
      return {
        done: true,
        value: null,
      };
    }
  }

  [Symbol.iterator](): IterableIterator<[number, string]> {
    return this;
  }
}
