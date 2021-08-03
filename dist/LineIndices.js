"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LineIndices = /** @class */ (function () {
    function LineIndices(rope) {
        this.offset = 0;
        this.content = rope.toString();
    }
    LineIndices.prototype.next = function () {
        if (this.content !== undefined) {
            var idx = this.content.indexOf('\n');
            if (idx !== -1) {
                if (this.content[idx - 1] === '\r') {
                    var line = this.content.slice(0, idx - 1);
                    var offset = this.offset;
                    this.content = this.content.slice(idx + 1);
                    this.offset += idx + 1;
                    return {
                        done: false,
                        value: [offset, line],
                    };
                }
                else {
                    var line = this.content.slice(0, idx);
                    var offset = this.offset;
                    this.content = this.content.slice(idx + 1);
                    this.offset += idx + 1;
                    return {
                        done: false,
                        value: [offset, line],
                    };
                }
            }
            else {
                var line = this.content;
                var offset = this.offset;
                this.content = undefined;
                return {
                    done: false,
                    value: [offset, line],
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
    LineIndices.prototype[Symbol.iterator] = function () {
        return this;
    };
    return LineIndices;
}());
exports.default = LineIndices;
