"use strict";
function pre(atoms) {
    return atoms.map(function (atom) {
        if (Array.isArray(atom)) {
            return atom;
        }
        else {
            return [atom];
        }
    });
}
function cartesian(atoms) {
    if (atoms.length < 2)
        return atoms[0] || [];
    return atoms.reduce(function (col, set) {
        var res = [];
        col.forEach(function (c) {
            set.forEach(function (s) {
                res.push(c + s);
            });
        });
        return res;
    });
}
module.exports = function (atoms) { return cartesian(pre(atoms)); };
