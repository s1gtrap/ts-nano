"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
                if (this._cursor[0] < this._rope.lines()[this._cursor[2]].length) {
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
                    this._cursor[0] = Math.min(this._cursor[1], this._rope.lines()[this._cursor[2]].length);
                    this.render();
                }
                break;
            case 'ArrowDown':
                if (this._cursor[2] < this._rope.lines().length - 1) {
                    this._cursor[2] += 1;
                    this._cursor[0] = Math.min(this._cursor[1], (_a = this._rope.lines()[this._cursor[2]]) === null || _a === void 0 ? void 0 : _a.length);
                    this.render();
                }
                break;
            case 'Backspace':
                if (this._rope.lineToChar(this._cursor[2]) + this._cursor[0] > 0) {
                    var len = (_b = this._rope.lines()[this._cursor[2] - 1]) === null || _b === void 0 ? void 0 : _b.length;
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
        var _this = this;
        while (this._elem.firstChild) {
            this._elem.removeChild(this._elem.firstChild);
        }
        this._rope.lines().forEach(function (line, i) {
            var div = document.createElement('div');
            if (i === _this._cursor[2]) {
                var head = document.createElement('span');
                var cursor = document.createElement('span');
                var tail = document.createElement('span');
                head.textContent = line.slice(0, _this._cursor[1]);
                cursor.textContent = line[_this._cursor[1]] || ' ';
                cursor.classList.add('cursor');
                tail.textContent = line.slice(_this._cursor[1] + 1);
                div.appendChild(head);
                div.appendChild(cursor);
                div.appendChild(tail);
            }
            else {
                div.textContent = line;
            }
            _this._elem.appendChild(div);
        });
    };
    return Editor;
}());
exports.default = Editor;
