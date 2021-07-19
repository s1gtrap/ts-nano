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
var Lines_1 = __importDefault(require("./Lines"));
var LineIndices_1 = __importDefault(require("./LineIndices"));
var Rope = /** @class */ (function () {
    function Rope(_node) {
        this._node = _node;
    }
    Rope.leaf = function (content) {
        if (content === void 0) { content = ''; }
        return new Rope({
            kind: 'leaf',
            text: content,
        });
    };
    Rope.branch = function (left, right) {
        return new Rope({
            kind: 'branch',
            left: left,
            right: right,
        });
    };
    Object.defineProperty(Rope.prototype, "length", {
        get: function () {
            var _a, _b;
            switch (this._node.kind) {
                case 'branch':
                    return (((_a = this._node.left) === null || _a === void 0 ? void 0 : _a.length) || 0) + (((_b = this._node.right) === null || _b === void 0 ? void 0 : _b.length) || 0);
                case 'leaf':
                    return this._node.text.length;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rope.prototype, "weight", {
        get: function () {
            var _a;
            switch (this._node.kind) {
                case 'branch':
                    return ((_a = this._node.left) === null || _a === void 0 ? void 0 : _a.length) || 0;
                case 'leaf':
                    return this._node.text.length;
            }
        },
        enumerable: false,
        configurable: true
    });
    Rope.prototype.index = function (idx) {
        switch (this._node.kind) {
            case 'branch':
                if (this.weight <= idx && this._node.right) {
                    return this._node.right.index(idx - this.weight);
                }
                else if (this._node.left) {
                    return this._node.left.index(idx);
                }
                else {
                    throw 'unreachable: neither left/right of _node is defined';
                }
            case 'leaf':
                return this._node.text[idx];
        }
    };
    Rope.prototype.insert = function (idx, content) {
        var tail = this.split(idx);
        this.concat(Rope.leaf(content));
        this.concat(tail);
    };
    Rope.prototype.remove = function (idx, len) {
        if (len === void 0) { len = 1; }
        var sub = this.split(idx);
        var tail = sub.split(len);
        this.concat(tail);
    };
    Rope.prototype.split = function (idx) {
        switch (this._node.kind) {
            case 'branch':
                if (this.weight <= idx && this._node.right) {
                    return this._node.right.split(idx - this.weight);
                }
                else if (this._node.left) {
                    var tail = this._node.left.split(idx);
                    if (this._node.right) {
                        tail.concat(this._node.right);
                    }
                    this._node.right = null;
                    return tail;
                }
                else {
                    throw 'unreachable: neither left/right of _node is defined';
                }
            case 'leaf': {
                var tail = Rope.leaf(this._node.text.slice(idx));
                this._node.text = this._node.text.slice(0, idx);
                return tail;
            }
        }
    };
    Rope.prototype.concat = function (tail) {
        var head = this._node;
        this._node = {
            kind: 'branch',
            left: new Rope(head),
            right: tail,
        };
    };
    Rope.prototype.lines = function () {
        return new Lines_1.default(this);
    };
    Rope.prototype.lineIndices = function () {
        return new LineIndices_1.default(this);
    };
    Rope.prototype.charToLine = function (char) {
        var e_1, _a;
        var end = 0;
        var num = 0;
        try {
            for (var _b = __values(this.lineIndices()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), idx = _d[0], line = _d[1];
                end = idx + line.length;
                if (idx > char) {
                    break;
                }
                num += 1;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (char > end) {
            throw new Error('char ${char} out of bounds');
        }
        return num - 1;
    };
    Rope.prototype.lineToChar = function (line) {
        var e_2, _a;
        var end = 0;
        var num = 0;
        try {
            for (var _b = __values(this.lineIndices()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), idx = _d[0], l = _d[1];
                end = idx + l.length;
                if (num === line) {
                    return idx;
                }
                num += 1;
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        if (line >= num) {
            throw new Error("line " + line + " is out of bounds");
        }
        return end;
    };
    Rope.prototype.toString = function () {
        var _a, _b;
        switch (this._node.kind) {
            case 'branch':
                return (((_a = this._node.left) === null || _a === void 0 ? void 0 : _a.toString()) || '') + (((_b = this._node.right) === null || _b === void 0 ? void 0 : _b.toString()) || '');
            case 'leaf':
                return this._node.text;
        }
    };
    return Rope;
}());
exports.default = Rope;
