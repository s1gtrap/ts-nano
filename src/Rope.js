"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Lines_1 = __importDefault(require("./Lines"));
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
    Rope.prototype.charToLine = function (char) {
        var content = this.toString();
        for (var line = 0;; line++) {
            var idx = content.indexOf('\n') + 1;
            if (idx !== 0) {
                if (char < idx) {
                    return line;
                }
                else {
                    char -= idx;
                    content = content.slice(idx);
                }
            }
            else {
                if (char <= content.length) {
                    return line;
                }
                else {
                    throw new Error('char ${char} out of bounds');
                }
            }
        }
    };
    Rope.prototype.lineToChar = function (line) {
        var content = this.toString();
        var offset = 0;
        for (var i = 0; i !== line; i++) {
            var n = content.indexOf('\n') + 1;
            if (n === 0) {
                throw new Error("line " + line + " is out of bounds");
            }
            offset += n;
            content = content.slice(n);
        }
        return offset;
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
