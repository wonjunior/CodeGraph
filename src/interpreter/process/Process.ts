import InDataDock from '@/dock/InDataDock'
import OutDataDock from '@/dock/OutDataDock'
import { zip } from '@/utils'
import { Deps } from '../interfaces'
import Router from '../router/Router'

export default class Process { //? abstract?
	public inputs: Array<InDataDock>
	public outputs: Array<OutDataDock>
    public dependencies: Deps = { parents: new Set(), getters: new Set() }
    public arguments = [] as string[]
    public result = null

    get docks() {
        return new Set([...this.inputs, ...this.outputs])
    }

    execute(origin: Router, allowPropagation = false) {
        // $.Execution.log(`└──> [P-${this.constructor.name}] #execute`)
        // $.Execution.indent()

        // this.mergeDependencies()

        this.mergeArguments()
        // $.Execution.log(`├── (1) merged arguments`, this.arguments)

        this.updateResult()
        // $.Execution.log(`├── (2) updating the result`, this.result)

        this.routeData()
        // $.Execution.log(`├── (3) routing data inside node`)

        // $.Execution.log(`└──> (4) propagating data`)
        // $.Execution.indent()
        // this.propagate(origin, allowPropagation)
        // $.Execution.unindent()

        // $.Execution.unindent()
    }

    mergeDependencies(self?: Router) {
        this.dependencies = { parents: new Set(), getters: new Set() }

        this.inputs.forEach(input => {
            const { parents, getters } = input.getDependencies()

            parents.forEach(p => this.dependencies.parents.add(p))
            getters.forEach(g => this.dependencies.getters.add(g))
        })

        if (self) this.dependencies.parents.add(self)
    }

    mergeArguments() {
        // this.arguments = this.inputs.map(i => i.getValue())
    }

    calculate() {
        const params = zip(...this.arguments)
        const [ computedParams, stringParams ] = params.length ? params : [[], []]

        // return [ this.compute(...computedParams), this.string(...stringParams) ]
    }

    readyToCalculate() {
        return !this.arguments.some(arg => arg == null)
    }

    updateResult() {
        // this.result = this.readyToCalculate() ? this.calculate() : null
    }

    routeData() {
        // this.outputs.forEach(output => output.setValue(this.result))
    }

    // propagate(payload: Object, allowPropagation: boolean) { //? not used!
        // this.outputs.forEach(output => output.propagate(payload))
    // }

    compute() {
        throw `compute() not set on Process ${this}`
    }

    string(_?: string): string {
        throw `string() not set on Process ${this}`
    }
}