export declare type Span<T> = [number, number, T];
export default class Utils {
    static enumerate<T>(iter: Iterable<T>): Generator<[number, T]>;
    static split(offset: number, length: number, spans: Iterable<Span<string>>): Generator<Span<string>>;
}
