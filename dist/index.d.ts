declare const short2atoms: any;
declare const atoms2codes: any;
declare class cG {
    ruleShort: string | null;
    ruleAtoms: Array<string | Array<string>> | null;
    iteratorIndex: number;
    codes: string[];
    templateFn: templateFn;
    constructor(rules: string | Array<string | Array<string>>);
    _short2atoms(): void;
    _gen(): void;
    check(code: string): boolean;
    addtFn(tFn: templateFn): this;
    toShort(): string | null;
    toAtoms(): (string | string[])[] | null;
    toGen(): string[];
    iterator(index?: number, step?: number): any;
}
