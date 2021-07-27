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
}
