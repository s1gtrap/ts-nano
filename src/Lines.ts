import Rope from './Rope';

export default class Lines implements IterableIterator<string> {
  private content: string | undefined;

  public constructor(rope: Rope) {
    this.content = rope.toString();
  }

  public next(): IteratorResult<string> {
    if (this.content !== undefined) {
      const idx = this.content.indexOf('\n');
      if (idx !== -1) {
        if (this.content[idx - 1] === '\r') {
          const line = this.content.slice(0, idx - 1);
          this.content = this.content.slice(idx + 1);
          return {
            done: false,
            value: line,
          };
        } else {
          const line = this.content.slice(0, idx);
          this.content = this.content.slice(idx + 1);
          return {
            done: false,
            value: line,
          };
        }
      } else {
        const line = this.content;
        this.content = undefined;
        return {
          done: false,
          value: line,
        };
      }
    } else {
      return {
        done: true,
        value: null,
      };
    }
  }

  [Symbol.iterator](): IterableIterator<string> {
    return this;
  }
}
