export default class Rope {
    private _node;
    private constructor();
    static leaf(content?: string): Rope;
    static branch(left: Rope | null, right: Rope | null): Rope;
    get length(): number;
    get weight(): number;
    index(idx: number): string;
    insert(idx: number, content: string): void;
    remove(idx: number, len?: number): void;
    split(idx: number): Rope;
    concat(tail: Rope): void;
    charToLine(char: number): number;
    lineToChar(line: number): number;
    toString(): string;
    lines(): IterableIterator<string>;
}
