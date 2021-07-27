export declare type Span<T> = [number, number, T];
export declare type Edge = [string[], string[]];
export default class Utils {
    static enumerate<T>(iter: Iterable<T>): Generator<[number, T]>;
    static split(offset: number, length: number, spans: Iterable<Span<string>>): Generator<Span<string>>;
    static edges(spans: Iterable<Span<string>>): Edge[];
}
