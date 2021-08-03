"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Lines = /** @class */ (function () {
    function Lines(rope) {
        this.content = rope.toString();
    }
    Lines.prototype.next = function () {
        if (this.content !== undefined) {
            var idx = this.content.indexOf('\n');
            if (idx !== -1) {
                if (this.content[idx - 1] === '\r') {
                    var line = this.content.slice(0, idx - 1);
                    this.content = this.content.slice(idx + 1);
                    return {
                        done: false,
                        value: line,
                    };
                }
                else {
                    var line = this.content.slice(0, idx);
                    this.content = this.content.slice(idx + 1);
                    return {
                        done: false,
                        value: line,
                    };
                }
            }
            else {
                var line = this.content;
                this.content = undefined;
                return {
                    done: false,
                    value: line,
                };
            }
        }
        else {
            return {
                done: true,
                value: null,
            };
        }
    };
    Lines.prototype[Symbol.iterator] = function () {
        return this;
    };
    return Lines;
}());
exports.default = Lines;
