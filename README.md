# code-generator-js

A JavaScript string library that generates batch generated code strings by template rules.

`"No. 1:10" -> ["No.01", "No.02", ..., "No.10"]`

## Usage

### import

```typescript
const CG = require("code-generator-js");
```

### initialize

```typescript
new CG(RULES: string | Array<string|Array<string>>)

new CG("No. 1:10") //short rules
new CG(["No.", ["01", "02", ...,"10"]]) //atoms rules
```

#### short rule docs:

```
Fixed: e.g."No.",":","ABC"

Number traversal:
    "start:end[:step=1[:fill='0'[:len=MAX_LEN(start,end)]]]"
e.g.
    "1:10" -> ["01", "02", ..., "10"]
    "1:10:2" -> ["01", "03", ..., "09"]
    "1:10:1:" -> ["1", "3", ..., "9"]
    "1:10:2:X" -> ["X1", "X3", ..., "X9"]
    "1:10:2:X:5" -> ["XXXX1", "XXXX3", ..., "XXXX9"]

Letter traversal:
    "start:end"
e.g.
    "a:z" -> ["a", "b", ..., "z"]
    "A:Z" -> ["A", "B", ..., "Z"]

String List:
e.g.
    ":xyz" -> ["x", "y", "z"]
    ":xyz:ABC" -> ["xyz", "ABC"]

Template function:
    "::tName=args" -> tFn[tName](args)
e.g.
    let tFn={
        YYYY:(o)=>"hello"+o
    }
    cg.addtFn(tFn)
    "::YYYY=2022" -> ["hello2022"]
```

### generate

```typescript
let cg = new CG("No. 1:10");
cg.toGen(); //["No.1", "No.2", ..., "No.10"]]
```

### check

```typescript
cg.check("test2022:1"); //true
cg.check("sdfsdf"); //false
```

### iterator

```typescript
let it = cg.iterator();
it.next(); //{value: "No.1", index: 0}
it.next(); //{value: "No.2", index: 1}
```

## 