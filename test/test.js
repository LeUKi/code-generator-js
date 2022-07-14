const cG = require('../dist/bundle-cjs.js');
let cg = new cG("test ::YYYY : 1:3")
let l = {
    YYYY: () => 2022,
}
console.log(cg.addtFn(l).toAtoms());
let it = cg.iterator()
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());

console.log(cg.check("test2022:1"));