interface templateFn {
    [key: string]: (arg: string) => string;
}
declare const innertFn: templateFn;
declare function _short2atoms(short: string, moretFn?: templateFn): Array<string | Array<string>>;
