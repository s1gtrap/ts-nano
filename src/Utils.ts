export type Span<T> = [number, number, T];

export type Edge = [string[], string[]];

export default class Utils {
  public static *enumerate<T>(iter: Iterable<T>): Generator<[number, T]> {
    let i = 0;
    for (const t of iter) {
      yield [i++, t];
    }
  }

  public static *split(
    offset: number,
    length: number,
    spans: Iterable<Span<string>>,
  ): Generator<Span<string>> {
    for (const [x1, x2, v] of spans) {
      if (
        x1 <= offset + length && offset <= x1 + x2
        && Math.min(offset + length, x1 + x2) - Math.max(x1, offset) > 0
      ) {
        yield [
          Math.max(x1, offset),
          Math.min(offset + length, x1 + x2) - Math.max(x1, offset),
          v,
        ];
      }
    }
  }

  public static edges(spans: Iterable<Span<string>>): Edge[] {
    const edges: Edge[] = [];
    for (const [offset, length, className] of spans) {
      if (edges[offset] === undefined) {
        edges[offset] = [[className], []];
      } else {
        edges[offset][0].push(className);
      }
      if (edges[offset + length] === undefined) {
        edges[offset + length] = [[], [className]];
      } else {
        edges[offset + length][1].push(className);
      }
    }
    return edges;
  }

  public static *merge(offset: number, length: number, spans: Iterable<Span<string>>): Generator<Span<Set<string>>> {
    const edges = Utils.edges(Utils.split(offset, length, spans));
    const classes: string[] = [];
    let last;
    for (const [offset, [add, remove]] of Object.entries(edges)) {
      if (last !== undefined) {
        yield [last, Number(offset) - last, new Set(classes)];
      }
      Array.prototype.push.apply(classes, add);
      for (const className of remove) {
        const idx = classes.indexOf(className);
        if (idx === -1) {
          throw new Error(`class never initialized: ${className}`);
        }
        classes.splice(idx, 1);
      }
      last = Number(offset);
    }
  }
}
