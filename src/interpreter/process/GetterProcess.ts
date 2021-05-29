import CustomProcess from './CustomProcess'

export default class GetterProcess extends CustomProcess {
    constructor(private variable: string) {
        super(null, null, [], [{ label: variable }])
    }

    compute() {
        return true // this.process.scope.get(this.getter)
    }

    string() {
        return this.variable
    }
}