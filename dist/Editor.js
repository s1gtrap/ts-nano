"use strict";
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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
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
        this._highlights = [];
        this._cursor = [0, 0, 0];
        this._delegator = document.createDocumentFragment();
        this._elem.addEventListener('keydown', this.onkeydown.bind(this));
        this._elem.addEventListener('paste', this.onpaste.bind(this));
        this._rope = Rope_1.default.leaf(content);
        this.render();
    }
    Editor.prototype.addEventListener = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        (_a = this._delegator).addEventListener.apply(_a, __spreadArray([], __read(args)));
    };
    Editor.prototype.dispatchEvent = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = this._delegator).dispatchEvent.apply(_a, __spreadArray([], __read(args)));
    };
    Editor.prototype.removeEventListener = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        (_a = this._delegator).removeEventListener.apply(_a, __spreadArray([], __read(args)));
    };
    Object.defineProperty(Editor.prototype, "content", {
        get: function () {
            return this._rope.toString();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Editor.prototype, "highlights", {
        get: function () {
            return Array.from(this._highlights);
        },
        enumerable: false,
        configurable: true
    });
    Editor.prototype.addHighlight = function (span) {
        this._highlights.push(span);
        this.render();
        this.dispatchEvent(new Event('highlightschange'));
    };
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
            this.dispatchEvent(new Event('textchange'));
            return;
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
                    this.dispatchEvent(new Event('textchange'));
                }
                break;
            case 'Enter':
                this._rope.insert(this._rope.lineToChar(this._cursor[2]) + this._cursor[0], '\n');
                this._cursor[1] = this._cursor[0] = 0;
                this._cursor[2] += 1;
                this.render();
                this.dispatchEvent(new Event('textchange'));
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
            this.dispatchEvent(new Event('textchange'));
        }
    };
    Editor.prototype.render = function () {
        var e_1, _a, e_2, _b, e_3, _c;
        while (this._elem.firstChild) {
            this._elem.removeChild(this._elem.firstChild);
        }
        try {
            for (var _d = __values(Utils_1.default.enumerate(this._rope.lineIndices())), _e = _d.next(); !_e.done; _e = _d.next()) {
                var _f = __read(_e.value, 2), i = _f[0], _g = __read(_f[1], 2), lineOffset = _g[0], line = _g[1];
                var div = document.createElement('div');
                var chunks = __spreadArray([[lineOffset, line.length, '']], __read(this._highlights));
                if (i === this._cursor[2]) {
                    chunks.push([lineOffset + this._cursor[0], 1, 'cursor']);
                }
                try {
                    for (var _h = (e_2 = void 0, __values(Array.from(Utils_1.default.merge(lineOffset, line.length + 1, chunks)))), _j = _h.next(); !_j.done; _j = _h.next()) {
                        var _k = __read(_j.value, 3), offset = _k[0], length_1 = _k[1], classes = _k[2];
                        var span = document.createElement('span');
                        try {
                            for (var classes_1 = (e_3 = void 0, __values(classes)), classes_1_1 = classes_1.next(); !classes_1_1.done; classes_1_1 = classes_1.next()) {
                                var className = classes_1_1.value;
                                if (className !== '') {
                                    span.classList.add(className);
                                }
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (classes_1_1 && !classes_1_1.done && (_c = classes_1.return)) _c.call(classes_1);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                        span.textContent = line.slice(offset - lineOffset, offset - lineOffset + length_1) || ' ';
                        div.appendChild(span);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_j && !_j.done && (_b = _h.return)) _b.call(_h);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                this._elem.appendChild(div);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    return Editor;
}());
exports.default = Editor;
