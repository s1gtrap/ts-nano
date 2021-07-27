export type Span<T> = [number, number, T];

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
}
