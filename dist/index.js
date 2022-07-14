"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var short2atoms = require('./util/short2atoms');
var atoms2codes = require('./util/atoms2codes');
var cG = /** @class */ (function () {
    function cG(rules) {
        if (typeof rules === 'string') {
            this.ruleShort = rules;
            this.ruleAtoms = null;
        }
        else {
            this.ruleShort = null;
            this.ruleAtoms = rules;
        }
        this.iteratorIndex = 0;
        this.codes = [];
        this.templateFn = {};
    }
    cG.prototype._short2atoms = function () {
        if (!this.ruleAtoms && this.ruleShort) {
            this.ruleAtoms = short2atoms(this.ruleShort, this.templateFn);
        }
    };
    cG.prototype._gen = function () {
        if (this.codes.length
            !== 0) {
            return;
        }
        this.codes = atoms2codes(this.ruleAtoms);
    };
    cG.prototype.check = function (code) {
        if (this.toGen().includes(code))
            return true;
        return false;
    };
    cG.prototype.addtFn = function (tFn) {
        this.templateFn = __assign(__assign({}, this.templateFn), tFn);
        this.ruleAtoms = null;
        return this;
    };
    cG.prototype.toShort = function () { return this.ruleShort; };
    cG.prototype.toAtoms = function () { this._short2atoms(); return this.ruleAtoms; };
    cG.prototype.toGen = function () {
        this._short2atoms();
        this._gen();
        return this.codes;
    };
    cG.prototype.iterator = function (index, step) {
        if (index === void 0) { index = 0; }
        if (step === void 0) { step = 1; }
        var I = /** @class */ (function () {
            function I(codes, index, step) {
                this.codes = codes;
                this.index = index;
                this.step = step;
            }
            I.prototype.next = function () {
                var t = {
                    value: this.codes[this.index],
                    index: this.index,
                };
                this.index += this.step;
                if (this.index >= this.codes.length)
                    this.index = this.index % this.codes.length;
                return t;
            };
            return I;
        }());
        return new I(this.toGen(), index, step);
    };
    return cG;
}());
module.exports = cG;
