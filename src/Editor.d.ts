export default class Editor {
    private _elem;
    private _cursor;
    private _rope;
    constructor(_elem: HTMLElement, content?: string);
    private onkeydown;
    private onpaste;
    private render;
}
