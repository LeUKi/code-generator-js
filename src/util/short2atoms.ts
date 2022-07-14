interface templateFn {
    [key: string]: (arg: string) => string;
};
const innertFn: templateFn = {
    'msg': msg => "msgis:" + msg,
}
function _short2atoms(short: string, moretFn: templateFn = {}): Array<string | Array<string>> {
    let t = short.trim();
    if (t.length === 0) {
        return [];
    }
    let shorts = t.split(' ');
    let atoms: Array<string | Array<string>> = [];
    shorts.forEach(s => {
        if (!s.includes(':') || s === ':') {
            atoms.push(s);
        } else if (s[0] === ':') {
            if (s[1] === ':') {
                //模板匹配
                let key: string = s.slice(2).split('=')[0],
                    arg: string = s.slice(2).split('=')[1] || '',
                    templateFn: templateFn = { ...innertFn, ...moretFn }
                if (key in templateFn) atoms.push(templateFn[key](arg));
                else {
                    console.error(`templateFn[${key}] not found`);
                    atoms.push(key);
                }
            } else {
                if (s.slice(1).includes(':')) {
                    //多字符
                    atoms.push(s.slice(1).split(':'));
                } else {
                    //单字符
                    atoms.push(s.slice(1).split(''));
                }
            }
        } else if (!isNaN(s[0] as unknown as number)) {
            //数字
            let t = s.split(':');
            let isValid = true;
            t.forEach((t, i) => {
                if (isNaN(t as unknown as number) && i !== 3) isValid = false;
            })
            if (isValid) {
                let start: number = parseInt(t[0]),
                    end: number = parseInt(t[1]),
                    step: number = parseInt(t[2]) || 1,
                    fill: string = t[3] || '0',
                    len: number = parseInt(t[4]) || (t[1].length > t[0].length ? t[1].length : t[0].length),
                    atom: string[] = [],
                    pad = function (tbl: string[]) {
                        return function (num: number, n: number) {
                            return (0 >= (n = n - num.toString().length)) ? num :
                                (tbl[n] || (tbl[n] = Array(n + 1).join(fill))) + num;
                        }
                    }([]);
                for (let i = start; i <= end; i += step) atom.push(pad(i, len).toString())
                atoms.push(atom);
            } else {
                console.error(`${s} is not a valid rule numbers atom.`);
                atoms.push(s);
            }
        } else if (/^[a-z]:[a-z]|[A-Z]:[A-Z]$/.test(s)) {
            //字母
            let atom: string[] = []
            for (let i = s[0].charCodeAt(0); i <= s[2].charCodeAt(0); i += 1) {
                atom.push(String.fromCharCode(i));
            }
            atoms.push(atom);
        } else {
            console.error(`${s} is not a valid rule atom.`);
            atoms.push(s);
        }
    })
    return atoms;
}
module.exports = _short2atoms;
// export { short2atoms };