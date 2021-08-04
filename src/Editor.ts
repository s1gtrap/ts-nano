import Utils, { Span } from './Utils';
import Rope from './Rope';

export type Highlight = [number, number, string];

export default class Editor implements EventTarget {
  private _highlights: [number, number, string][] = [];
  private _cursor = [0, 0, 0];
  private _rope: Rope;
  private _delegator = document.createDocumentFragment();

  constructor(private _elem: HTMLElement, content = '') {
    this._elem.addEventListener('keydown', this.onkeydown.bind(this));
    this._elem.addEventListener('paste', this.onpaste.bind(this));
    this._rope = Rope.leaf(content)
    this.render();
  }

  public addEventListener(...args: [string, EventListenerOrEventListenerObject | null]): void {
    this._delegator.addEventListener(...args);
  }

  public dispatchEvent(...args: [Event]): boolean {
    return this._delegator.dispatchEvent(...args);
  }

  public removeEventListener(...args: [string, EventListenerOrEventListenerObject | null]): void {
    this._delegator.removeEventListener(...args);
  }

  public get content(): string {
    return this._rope.toString();
  }

  public get highlights(): Highlight[] {
    return Array.from(this._highlights);
  }

  public addHighlight(span: Highlight): void {
    this._highlights.push(span);
    this.render();
    this.dispatchEvent(new Event('change'));
  }

  private onkeydown(e: KeyboardEvent) {
    if (e.key === 'v' && (e.ctrlKey || e.metaKey)) { // paste
      return;
    }
    if (e.key.length === 1) {
      this._rope.insert(this._rope.lineToChar(this._cursor[2]) + this._cursor[0], e.key);
      this._cursor[0] += 1;
      this._cursor[1] = this._cursor[0];
      this.render();
    }
    switch (e.key) {
      case 'ArrowLeft':
        if (this._cursor[0] > 0) {
          this._cursor[0] -= 1;
          this._cursor[1] = this._cursor[0];
          this.render();
        } else {
          this._cursor[1] = this._cursor[0];
        }
        break;
      case 'ArrowRight':
        if (this._cursor[0] < Array.from(this._rope.lines())[this._cursor[2]].length) {
          this._cursor[0] += 1;
          this._cursor[1] = this._cursor[0];
          this.render();
        } else {
          this._cursor[1] = this._cursor[0];
        }
        break;
      case 'ArrowUp':
        if (this._cursor[2] > 0) {
          this._cursor[2] -= 1;
          this._cursor[0] = Math.min(this._cursor[1], Array.from(this._rope.lines())[this._cursor[2]].length);
          this.render();
        }
        break;
      case 'ArrowDown':
        if (this._cursor[2] < Array.from(this._rope.lines()).length - 1) {
          this._cursor[2] += 1;
          this._cursor[0] = Math.min(this._cursor[1], Array.from(this._rope.lines())[this._cursor[2]]?.length);
          this.render();
        }
        break;
      case 'Backspace':
        if (this._rope.lineToChar(this._cursor[2]) + this._cursor[0] > 0) {
          const len = Array.from(this._rope.lines())[this._cursor[2] - 1]?.length;
          this._rope.remove(this._rope.lineToChar(this._cursor[2]) + this._cursor[0] - 1);
          if (this._cursor[0] > 0) {
            this._cursor[1] = this._cursor[0] -= 1;
          } else if (this._cursor[2] > 0) {
            this._cursor[2] -= 1;
            this._cursor[1] = this._cursor[0] = len;
          }
          this.render();
        }
        break;
      case 'Enter':
        this._rope.insert(this._rope.lineToChar(this._cursor[2]) + this._cursor[0], '\n');
        this._cursor[1] = this._cursor[0] = 0;
        this._cursor[2] += 1;
        this.render();
        break;
      default:
        break;
    }
  }

  private onpaste(e: ClipboardEvent) {
    if (e.clipboardData) {
      const idx = this._rope.lineToChar(this._cursor[2]) + this._cursor[0];
      const text = e.clipboardData.getData('text');
      this._rope.insert(idx, text);
      this._cursor[2] = this._rope.charToLine(idx + text.length);
      this._cursor[0] = this._cursor[1] = idx + text.length - this._rope.lineToChar(this._cursor[2])
      this.render();
    }
  }

  private render() {
    while (this._elem.firstChild) {
      this._elem.removeChild(this._elem.firstChild);
    }
    for (const [i, [lineOffset, line]] of Utils.enumerate(this._rope.lineIndices())) {
      const div = document.createElement('div');
      const chunks: Span<string>[] = [[lineOffset, line.length, ''], ...this._highlights];
      if (i === this._cursor[2]) {
        chunks.push([lineOffset + this._cursor[0], 1, 'cursor']);
      }
      for (const [offset, length, classes] of Array.from(Utils.merge(lineOffset, line.length + 1, chunks))) {
        const span = document.createElement('span');
        for (const className of classes) {
          if (className !== '') {
            span.classList.add(className);
          }
        }
        span.textContent = line.slice(offset - lineOffset, offset - lineOffset + length) || ' ';
        div.appendChild(span);
      }
      this._elem.appendChild(div);
    }
  }
}
