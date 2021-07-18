import Rope from './Rope';
export default class LineIndices implements IterableIterator<[number, string]> {
    private content;
    private offset;
    constructor(rope: Rope);
    next(): IteratorResult<[number, string]>;
    [Symbol.iterator](): IterableIterator<[number, string]>;
}
