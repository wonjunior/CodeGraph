import CustomProcess from './CustomProcess'

export default class SetterProcess extends CustomProcess {
    constructor(private variable: string) {
        super(null, null, [{ label: variable }], [])
    }

    compute() {
        return null
    }

    string(value: string) {
        return `${this.variable} = ${value}`
    }
}