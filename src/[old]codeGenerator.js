function codeGen(rules) {
    if (typeof (rules) == 'string') {
        rules = codeParse(rules)
    }

    function codeParse(e) {
        let TEMP = []
        let sTYPE = ["YYYY", "YY", "MM", "DD", "HH", "hh", "mm", "ss"]
        let rule = []
        e.split("]").map(o => o.split("[")).map(o => {
            if (o[1]) {
                TEMP.push(o[1])
            }
        })
        TEMP.map(o => {
            if (sTYPE.includes(o)) {
                rule.push({
                    type: o,
                })
            } else if (o.includes("-")) {
                let temp = o.split("-")
                if (isNaN(temp[0])) {
                    rule.push({
                        type: "forABC",
                        start: temp[0],
                        end: temp[1],

                    })
                } else {
                    rule.push({
                        type: "forNum",
                        start: Number(temp[0]),
                        end: Number(temp[1]),
                        stringlen: temp[1].length,
                        strinfill: temp[2] != undefined ? temp[2] : "0",
                        step: temp[3] ? Number(temp[3]) : 1,
                    })
                }
            } else if (o.includes("\"")) {
                rule.push({
                    type: "static",
                    string: o.replaceAll("\"", "")
                })
            }
        })
        return rule
    }

    function make(rules) {
        let result = []
        return rules.map(rule => {
            let nowDate = new Date()
            let fn = {
                static: (e) => [e.string],
                forNum: (e) => {
                    let T = []
                    let pad = function (tbl) {
                        return function (num, n) {
                            return (0 >= (n = n - num.toString().length)) ? num : (tbl[n] || (tbl[n] = Array(n + 1).join(e.strinfill))) + num;
                        }
                    }([]);
                    for (let i = e.start; i <= e.end; i += e.step) T.push(pad(i, e.stringlen) + "")
                    return T
                },
                forABC: (e) => {
                    let T = []
                    let pad = function (tbl) {
                        return function (num, n) {
                            return (0 >= (n = n - num.toString().length)) ? num : (tbl[n] || (tbl[n] = Array(n + 1).join(""))) + num;
                        }
                    }([]);
                    for (let i = e.start.charCodeAt(); i <= e.end.charCodeAt(); i += 1) T.push(pad(String.fromCharCode(i), 1))
                    return T
                },
                YYYY: () => [String(nowDate.getFullYear())],
                YY: () => [String(nowDate.getFullYear()).slice(2)],
                MM: () => [nowDate.getMonth() > 9 ? String(nowDate.getMonth() + 1) : "0" + String(nowDate.getMonth() + 1)],
                DD: () => [nowDate.getDate() > 9 ? String(nowDate.getDate()) : "0" + String(nowDate.getDate())],
                HH: () => [nowDate.getHours() > 9 ? String(nowDate.getHours()) : "0" + String(nowDate.getHours())],
                hh: () => [nowDate.getHours() > 11 ? nowDate.getHours() - 12 > 9 ? String(nowDate.getHours() - 12) : "0" + String(nowDate.getHours() - 12) : nowDate.getHours() > 9 ? String(nowDate.getHours()) : "0" + String(nowDate.getHours())],
                mm: () => [nowDate.getMinutes() > 9 ? String(nowDate.getMinutes()) : "0" + String(nowDate.getMinutes())],
                ss: () => [nowDate.getSeconds() > 9 ? String(nowDate.getSeconds()) : "0" + String(nowDate.getSeconds())],

            }
            return fn[rule.type](rule)
        })
    }

    function cartesian(arr) {
        if (arr.length < 2) return arr[0] || [];
        return [].reduce.call(arr, function (col, set) {
            let res = [];
            col.forEach(c => {
                set.forEach(s => {
                    res.push(c + s);
                })
            });
            return res;
        });
    }
    console.log(make(rules));
    return cartesian(make(rules))
}

function rulesInfo(rules) {
    let nowDate = new Date()
    let fn0 = {
        static: (e) => [`["${e.string}"]`],
        forNum: (e) => {
            let pad = function (tbl) {
                return function (num, n) {
                    return (0 >= (n = n - num.toString().length)) ? num : (tbl[n] || (tbl[n] = Array(n + 1).join("0"))) + num;
                }
            }([]);
            return [`[${pad(e.start, e.stringlen)}-${pad(e.end, e.stringlen)}-${e.strinfill}-${e.step}]`]
        },
        forABC: (e) => ["[" + e.start + "-" + e.end + "]"],
        YYYY: () => ['[YYYY]'],
        YY: () => ['[YY]'],
        MM: () => ['[MM]'],
        DD: () => ['[DD]'],
        HH: () => ['[HH]'],
        hh: () => ['[hh]'],
        mm: () => ['[mm]'],
        ss: () => ['[ss]'],
    }
    let fn1 = {
        static: (e) => [e.string],
        forNum: (e) => {
            let pad = function (tbl) {
                return function (num, n) {
                    return (0 >= (n = n - num.toString().length)) ? num : (tbl[n] || (tbl[n] = Array(n + 1).join(e.strinfill))) + num;
                }
            }([]);
            return [pad(e.start, e.stringlen) + ""]
        },
        forABC: (e) => [e.start],
        YYYY: () => [String(nowDate.getFullYear())],
        YY: () => [String(nowDate.getFullYear()).slice(2)],
        MM: () => [nowDate.getMonth() > 9 ? String(nowDate.getMonth() + 1) : "0" + String(nowDate.getMonth() + 1)],
        DD: () => [nowDate.getDate() > 9 ? String(nowDate.getDate()) : "0" + String(nowDate.getDate())],
        HH: () => [nowDate.getHours() > 9 ? String(nowDate.getHours()) : "0" + String(nowDate.getHours())],
        hh: () => [nowDate.getHours() > 11 ? nowDate.getHours() - 12 > 9 ? String(nowDate.getHours() - 12) : "0" + String(nowDate.getHours() - 12) : nowDate.getHours() > 9 ? String(nowDate.getHours()) : "0" + String(nowDate.getHours())],
        mm: () => [nowDate.getMinutes() > 9 ? String(nowDate.getMinutes()) : "0" + String(nowDate.getMinutes())],
        ss: () => [nowDate.getSeconds() > 9 ? String(nowDate.getSeconds()) : "0" + String(nowDate.getSeconds())],
    }
    let fn2 = {
        static: (e) => [e.string],
        forNum: (e) => {
            let pad = function (tbl) {
                return function (num, n) {
                    return (0 >= (n = n - num.toString().length)) ? num : (tbl[n] || (tbl[n] = Array(n + 1).join(e.strinfill))) + num;
                }
            }([]);
            return [pad(e.end, e.stringlen) + ""]
        },
        forABC: (e) => [e.end],
        YYYY: () => [String(nowDate.getFullYear())],
        YY: () => [String(nowDate.getFullYear()).slice(2)],
        MM: () => [nowDate.getMonth() > 9 ? String(nowDate.getMonth() + 1) : "0" + String(nowDate.getMonth() + 1)],
        DD: () => [nowDate.getDate() > 9 ? String(nowDate.getDate()) : "0" + String(nowDate.getDate())],
        HH: () => [nowDate.getHours() > 9 ? String(nowDate.getHours()) : "0" + String(nowDate.getHours())],
        hh: () => [nowDate.getHours() > 11 ? nowDate.getHours() - 12 > 9 ? String(nowDate.getHours() - 12) : "0" + String(nowDate.getHours() - 12) : nowDate.getHours() > 9 ? String(nowDate.getHours()) : "0" + String(nowDate.getHours())],
        mm: () => [nowDate.getMinutes() > 9 ? String(nowDate.getMinutes()) : "0" + String(nowDate.getMinutes())],
        ss: () => [nowDate.getSeconds() > 9 ? String(nowDate.getSeconds()) : "0" + String(nowDate.getSeconds())],
    }
    return {
        Stringify: rules.map(o => fn0[o.type](o)[0]),
        Start: rules.map(o => fn1[o.type](o)[0]),
        End: rules.map(o => fn2[o.type](o)[0]),
    }
}

function codeCheck(code, rules) {
    let codes = codeGen(rules);
    if (codes.includes(code)) return true;
    return false;
}

function rulesParse(rules) {
    let TEMP = []
    let sTYPE = ["YYYY", "YY", "MM", "DD", "HH", "hh", "mm", "ss"]
    let rule = []
    rules.split("]").map(o => o.split("[")).map(o => {
        if (o[1]) {
            TEMP.push(o[1])
        }
    })
    TEMP.map(o => {
        if (sTYPE.includes(o)) {
            rule.push({
                type: o,
            })
        } else if (o.includes("-")) {
            let temp = o.split("-")
            if (isNaN(temp[0])) {
                rule.push({
                    type: "forABC",
                    start: temp[0],
                    end: temp[1],

                })
            } else {
                rule.push({
                    type: "forNum",
                    start: Number(temp[0]),
                    end: Number(temp[1]),
                    stringlen: temp[1].length,
                    strinfill: temp[2] != undefined ? temp[2] : "0",
                    step: temp[3] ? Number(temp[3]) : 1,
                })
            }
        } else if (o.includes("\"")) {
            rule.push({
                type: "static",
                string: o.replaceAll("\"", "")
            })
        }
    })
    return rule
}
module.exports = {
    codeGen,
    rulesInfo,
    codeCheck,
    rulesParse
}
