const short2atoms = require('./util/short2atoms');
const atoms2codes = require('./util/atoms2codes');
class cG {
    ruleShort: string | null;
    ruleAtoms: Array<string | Array<string>> | null;
    iteratorIndex: number;
    codes: string[];
    templateFn: templateFn;
    constructor(rule: string | Array<string | Array<string>>) {
        if (typeof rule === 'string') {
            this.ruleShort = rule;
            this.ruleAtoms = null
        } else {
            this.ruleShort = null;
            this.ruleAtoms = rule;
        }
        this.iteratorIndex = 0;
        this.codes = [];
        this.templateFn = {};
    }
    _short2atoms() {
        if (!this.ruleAtoms && this.ruleShort) {
            this.ruleAtoms = short2atoms(this.ruleShort, this.templateFn);
        }
    }
    _gen() {
        if (this.codes.length
            !== 0) {
            return;
        }
        this.codes = atoms2codes(this.ruleAtoms)
    }
    check(code: string) {
        if (this.toGen().includes(code)) return true;
        return false;
    }
    addtFn(tFn: templateFn) {
        this.templateFn = { ...this.templateFn, ...tFn };
        this.ruleAtoms = null
        return this;
    }
    toShort() { return this.ruleShort; }
    toAtoms() { this._short2atoms(); return this.ruleAtoms; }
    toGen() {
        this._short2atoms();
        this._gen();
        return this.codes;
    }
    iterator(index = 0, step = 1): any {
        class I {
            codes: string[];
            index: number;
            step: number;
            constructor(codes: string[], index: number, step: number) {
                this.codes = codes
                this.index = index
                this.step = step
            }
            next() {
                let t = {
                    value: this.codes[this.index],
                    index: this.index,
                }
                this.index += this.step;
                if (this.index >= this.codes.length)
                    this.index = this.index % this.codes.length;
                return t
            }
        }
        return new I(this.toGen(), index, step);
    }
}

module.exports = cG;
