import Rope from './Rope';
export default class Lines implements IterableIterator<string> {
    private content;
    constructor(rope: Rope);
    next(): IteratorResult<string>;
    [Symbol.iterator](): IterableIterator<string>;
}
