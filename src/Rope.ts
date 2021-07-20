import Lines from './Lines';
import LineIndices from './LineIndices';
import Utils from './Utils';

type Node = {
  kind: 'branch',
  left: Rope | null,
  right: Rope | null,
} | {
  kind: 'leaf',
  text: string,
};

export default class Rope {
  private constructor(private _node: Node) {}

  public static leaf(content = ''): Rope {
    return new Rope({
      kind: 'leaf',
      text: content,
    });
  }

  public static branch(left: Rope | null, right: Rope | null): Rope {
    return new Rope({
      kind: 'branch',
      left,
      right,
    });
  }

  public get length(): number {
    switch (this._node.kind) {
      case 'branch':
        return (this._node.left?.length || 0) + (this._node.right?.length || 0);
      case 'leaf':
        return this._node.text.length;
    }
  }

  public get weight(): number {
    switch (this._node.kind) {
      case 'branch':
        return this._node.left?.length || 0;
      case 'leaf':
        return this._node.text.length;
    }
  }

  public index(idx: number): string {
    switch (this._node.kind) {
      case 'branch':
        if (this.weight <= idx && this._node.right) {
          return this._node.right.index(idx - this.weight);
        } else if (this._node.left) {
          return this._node.left.index(idx);
        } else {
          throw 'unreachable: neither left/right of _node is defined';
        }
      case 'leaf':
        return this._node.text[idx];
    }
  }

  public insert(idx: number, content: string): void {
    const tail = this.split(idx);
    this.concat(Rope.leaf(content));
    this.concat(tail);
  }

  public remove(idx: number, len = 1): void {
    const sub = this.split(idx);
    const tail = sub.split(len);
    this.concat(tail);
  }

  public split(idx: number): Rope {
    switch (this._node.kind) {
      case 'branch':
        if (this.weight <= idx && this._node.right) {
          return this._node.right.split(idx - this.weight);
        } else if (this._node.left) {
          const tail = this._node.left.split(idx);
          if (this._node.right) {
            tail.concat(this._node.right);
          }
          this._node.right = null;
          return tail;
        } else {
          throw 'unreachable: neither left/right of _node is defined';
        }
      case 'leaf': {
        const tail = Rope.leaf(this._node.text.slice(idx));
        this._node.text = this._node.text.slice(0, idx);
        return tail;
      }
    }
  }

  public concat(tail: Rope): void {
    const head = this._node;
    this._node = {
      kind: 'branch',
      left: new Rope(head),
      right: tail,
    };
  }

  public lines(): IterableIterator<string> {
    return new Lines(this);
  }

  public lineIndices(): IterableIterator<[number, string]> {
    return new LineIndices(this);
  }

  public charToLine(char: number): number {
    let end = 0;
    let last = 0;
    for (const [i, [idx, line]] of Utils.enumerate(this.lineIndices())) {
      end = idx + line.length;
      if (idx > char) {
        break;
      }
      last = i;
    }
    if (char > end) {
      throw new Error(`char ${char} is out of bounds`);
    }
    return last;
  }

  public lineToChar(line: number): number {
    for (const [i, [char]] of Utils.enumerate(this.lineIndices())) {
      if (i === line) {
        return char;
      }
    }
    throw new Error(`line ${line} is out of bounds`);
  }

  public toString(): string {
    switch (this._node.kind) {
      case 'branch':
        return (this._node.left?.toString() || '') + (this._node.right?.toString() || '');
      case 'leaf':
        return this._node.text;
    }
  }
}
