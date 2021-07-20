export default class Utils {
  public static *enumerate<T>(iter: Iterable<T>): Generator<[number, T]> {
    let i = 0;
    for (const t of iter) {
      yield [i++, t];
    }
  }
}
