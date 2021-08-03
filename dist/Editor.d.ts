export declare type Highlight = [number, number, string];
export default class Editor implements EventTarget {
    private _elem;
    private _highlights;
    private _cursor;
    private _rope;
    private _delegator;
    constructor(_elem: HTMLElement, content?: string);
    addEventListener(...args: [string, EventListenerOrEventListenerObject | null]): void;
    dispatchEvent(...args: [Event]): boolean;
    removeEventListener(...args: [string, EventListenerOrEventListenerObject | null]): void;
    get highlights(): Highlight[];
    addHighlight(span: Highlight): void;
    private onkeydown;
    private onpaste;
    private render;
}
