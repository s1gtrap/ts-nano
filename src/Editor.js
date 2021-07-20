"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = __importDefault(require("./Utils"));
var Rope_1 = __importDefault(require("./Rope"));
var Editor = /** @class */ (function () {
    function Editor(_elem, content) {
        if (content === void 0) { content = ''; }
        this._elem = _elem;
        this._cursor = [0, 0, 0];
        this._elem.addEventListener('keydown', this.onkeydown.bind(this));
        this._elem.addEventListener('paste', this.onpaste.bind(this));
        this._rope = Rope_1.default.leaf(content);
        this.render();
    }
    Editor.prototype.onkeydown = function (e) {
        var _a, _b;
        if (e.key === 'v' && (e.ctrlKey || e.metaKey)) { // paste
            return;
        }
        if (e.key.length === 1) {
            this._rope.insert(this._rope.lineToChar(this._cursor[2]) + this._cursor[0], e.key);
            this._cursor[0] += 1;
            this._cursor[1] = this._cursor[0];
            this.render();
        }
        switch (e.key) {
            case 'ArrowLeft':
                if (this._cursor[0] > 0) {
                    this._cursor[0] -= 1;
                    this._cursor[1] = this._cursor[0];
                    this.render();
                }
                else {
                    this._cursor[1] = this._cursor[0];
                }
                break;
            case 'ArrowRight':
                if (this._cursor[0] < Array.from(this._rope.lines())[this._cursor[2]].length) {
                    this._cursor[0] += 1;
                    this._cursor[1] = this._cursor[0];
                    this.render();
                }
                else {
                    this._cursor[1] = this._cursor[0];
                }
                break;
            case 'ArrowUp':
                if (this._cursor[2] > 0) {
                    this._cursor[2] -= 1;
                    this._cursor[0] = Math.min(this._cursor[1], Array.from(this._rope.lines())[this._cursor[2]].length);
                    this.render();
                }
                break;
            case 'ArrowDown':
                if (this._cursor[2] < Array.from(this._rope.lines()).length - 1) {
                    this._cursor[2] += 1;
                    this._cursor[0] = Math.min(this._cursor[1], (_a = Array.from(this._rope.lines())[this._cursor[2]]) === null || _a === void 0 ? void 0 : _a.length);
                    this.render();
                }
                break;
            case 'Backspace':
                if (this._rope.lineToChar(this._cursor[2]) + this._cursor[0] > 0) {
                    var len = (_b = Array.from(this._rope.lines())[this._cursor[2] - 1]) === null || _b === void 0 ? void 0 : _b.length;
                    this._rope.remove(this._rope.lineToChar(this._cursor[2]) + this._cursor[0] - 1);
                    if (this._cursor[0] > 0) {
                        this._cursor[1] = this._cursor[0] -= 1;
                    }
                    else if (this._cursor[2] > 0) {
                        this._cursor[2] -= 1;
                        this._cursor[1] = this._cursor[0] = len;
                    }
                    this.render();
                }
                break;
            case 'Enter':
                this._rope.insert(this._rope.lineToChar(this._cursor[2]) + this._cursor[0], '\n');
                this._cursor[1] = this._cursor[0] = 0;
                this._cursor[2] += 1;
                this.render();
                break;
            default:
                break;
        }
    };
    Editor.prototype.onpaste = function (e) {
        if (e.clipboardData) {
            var idx = this._rope.lineToChar(this._cursor[2]) + this._cursor[0];
            var text = e.clipboardData.getData('text');
            this._rope.insert(idx, text);
            this._cursor[2] = this._rope.charToLine(idx + text.length);
            this._cursor[0] = this._cursor[1] = idx + text.length - this._rope.lineToChar(this._cursor[2]);
            this.render();
        }
    };
    Editor.prototype.render = function () {
        var e_1, _a;
        while (this._elem.firstChild) {
            this._elem.removeChild(this._elem.firstChild);
        }
        try {
            for (var _b = __values(Utils_1.default.enumerate(this._rope.lines())), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), i = _d[0], line = _d[1];
                var div = document.createElement('div');
                if (i === this._cursor[2]) {
                    var head = document.createElement('span');
                    var cursor = document.createElement('span');
                    var tail = document.createElement('span');
                    head.textContent = line.slice(0, this._cursor[1]);
                    cursor.textContent = line[this._cursor[1]] || ' ';
                    cursor.classList.add('cursor');
                    tail.textContent = line.slice(this._cursor[1] + 1);
                    div.appendChild(head);
                    div.appendChild(cursor);
                    div.appendChild(tail);
                }
                else {
                    div.textContent = line;
                }
                this._elem.appendChild(div);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    return Editor;
}());
exports.default = Editor;
