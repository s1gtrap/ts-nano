"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
Object.defineProperty(exports, "__esModule", { value: true });
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.enumerate = function (iter) {
        var i, iter_1, iter_1_1, t, e_1_1;
        var e_1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    i = 0;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, 7, 8]);
                    iter_1 = __values(iter), iter_1_1 = iter_1.next();
                    _b.label = 2;
                case 2:
                    if (!!iter_1_1.done) return [3 /*break*/, 5];
                    t = iter_1_1.value;
                    return [4 /*yield*/, [i++, t]];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4:
                    iter_1_1 = iter_1.next();
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 8];
                case 6:
                    e_1_1 = _b.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 8];
                case 7:
                    try {
                        if (iter_1_1 && !iter_1_1.done && (_a = iter_1.return)) _a.call(iter_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    };
    Utils.split = function (offset, length, spans) {
        var spans_1, spans_1_1, _a, x1, x2, v, e_2_1;
        var e_2, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 5, 6, 7]);
                    spans_1 = __values(spans), spans_1_1 = spans_1.next();
                    _c.label = 1;
                case 1:
                    if (!!spans_1_1.done) return [3 /*break*/, 4];
                    _a = __read(spans_1_1.value, 3), x1 = _a[0], x2 = _a[1], v = _a[2];
                    if (!(x1 <= offset + length && offset <= x1 + x2
                        && Math.min(offset + length, x1 + x2) - Math.max(x1, offset) > 0)) return [3 /*break*/, 3];
                    return [4 /*yield*/, [
                            Math.max(x1, offset),
                            Math.min(offset + length, x1 + x2) - Math.max(x1, offset),
                            v,
                        ]];
                case 2:
                    _c.sent();
                    _c.label = 3;
                case 3:
                    spans_1_1 = spans_1.next();
                    return [3 /*break*/, 1];
                case 4: return [3 /*break*/, 7];
                case 5:
                    e_2_1 = _c.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 7];
                case 6:
                    try {
                        if (spans_1_1 && !spans_1_1.done && (_b = spans_1.return)) _b.call(spans_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    };
    Utils.edges = function (spans) {
        var e_3, _a;
        var edges = [];
        try {
            for (var spans_2 = __values(spans), spans_2_1 = spans_2.next(); !spans_2_1.done; spans_2_1 = spans_2.next()) {
                var _b = __read(spans_2_1.value, 3), offset = _b[0], length_1 = _b[1], className = _b[2];
                if (edges[offset] === undefined) {
                    edges[offset] = [[className], []];
                }
                else {
                    edges[offset][0].push(className);
                }
                if (edges[offset + length_1] === undefined) {
                    edges[offset + length_1] = [[], [className]];
                }
                else {
                    edges[offset + length_1][1].push(className);
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (spans_2_1 && !spans_2_1.done && (_a = spans_2.return)) _a.call(spans_2);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return edges;
    };
    return Utils;
}());
exports.default = Utils;
