import CustomProcess from './CustomProcess'

class Conditional extends CustomProcess {
    constructor() {
        super(null, null, [{ label: 'cond1' }, { label: 'cond2' }], [])
    }

    // string(condition: boolean) { return condition }
    // compute(condition: boolean) { return Boolean(condition) }
}

class ForLoop extends CustomProcess {
    constructor() {
        super(null, null, [{ label: 'first'}, { label: 'last'}], [{ label: 'index'}, { label: 'array'}])
    }

    // string(a: number, b: number) { return a + b }
    // compute(a: number, b: number) { return a + b }
}

export default { Conditional, ForLoop }