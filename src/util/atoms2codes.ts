function pre(atoms: Array<string | Array<string>>): Array<Array<string>> {
    return atoms.map(atom => {
        if (Array.isArray(atom)) {
            return atom;
        } else {
            return [atom];
        }
    });
}
function cartesian(atoms: Array<Array<string>>): Array<string> {
    if (atoms.length < 2) return atoms[0] || [];
    return atoms.reduce(function (col, set) {
        let res: string[] = [];
        col.forEach(c => {
            set.forEach(s => {
                res.push(c + s);
            })
        });
        return res;
    });
}

module.exports = function (atoms: Array<string | Array<string>>): Array<string> { return cartesian(pre(atoms)) };