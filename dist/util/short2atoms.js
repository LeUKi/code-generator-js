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
;
var innertFn = {
    'msg': function (msg) { return "msgis:" + msg; },
};
function _short2atoms(short, moretFn) {
    if (moretFn === void 0) { moretFn = {}; }
    var t = short.trim();
    if (t.length === 0) {
        return [];
    }
    var shorts = t.split(' ');
    var atoms = [];
    shorts.forEach(function (s) {
        if (!s.includes(':') || s === ':') {
            atoms.push(s);
        }
        else if (s[0] === ':') {
            if (s[1] === ':') {
                //模板匹配
                var key = s.slice(2).split('=')[0], arg = s.slice(2).split('=')[1] || '', templateFn = __assign(__assign({}, innertFn), moretFn);
                if (key in templateFn)
                    atoms.push(templateFn[key](arg));
                else {
                    console.error("templateFn[".concat(key, "] not found"));
                    atoms.push(key);
                }
            }
            else {
                if (s.slice(1).includes(':')) {
                    //多字符
                    atoms.push(s.slice(1).split(':'));
                }
                else {
                    //单字符
                    atoms.push(s.slice(1).split(''));
                }
            }
        }
        else if (!isNaN(s[0])) {
            //数字
            var t_1 = s.split(':');
            var isValid_1 = true;
            t_1.forEach(function (t, i) {
                if (isNaN(t) && i !== 3)
                    isValid_1 = false;
            });
            if (isValid_1) {
                var start = parseInt(t_1[0]), end = parseInt(t_1[1]), step = parseInt(t_1[2]) || 1, fill_1 = t_1[3] || '0', len = parseInt(t_1[4]) || (t_1[1].length > t_1[0].length ? t_1[1].length : t_1[0].length), atom = [], pad = function (tbl) {
                    return function (num, n) {
                        return (0 >= (n = n - num.toString().length)) ? num :
                            (tbl[n] || (tbl[n] = Array(n + 1).join(fill_1))) + num;
                    };
                }([]);
                for (var i = start; i <= end; i += step)
                    atom.push(pad(i, len).toString());
                atoms.push(atom);
            }
            else {
                console.error("".concat(s, " is not a valid rule numbers atom."));
                atoms.push(s);
            }
        }
        else if (/^[a-z]:[a-z]|[A-Z]:[A-Z]$/.test(s)) {
            //字母
            var atom = [];
            for (var i = s[0].charCodeAt(0); i <= s[2].charCodeAt(0); i += 1) {
                atom.push(String.fromCharCode(i));
            }
            atoms.push(atom);
        }
        else {
            console.error("".concat(s, " is not a valid rule atom."));
            atoms.push(s);
        }
    });
    return atoms;
}
module.exports = _short2atoms;
// export { short2atoms };
