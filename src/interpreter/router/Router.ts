import InExeDock from '@/dock/InExeDock'
import OutExeDock from '@/dock/OutExeDock'
import ExecutionTree from '../ExecutionTree'
import { TriggerArgs } from '../interfaces'
import Process from '../process/Process'

export default class Router {
    public in: Array<InExeDock>
    public out: Array<OutExeDock>
    public executionTree?: ExecutionTree
    public process: Process

    get docks() {
        return new Set([...this.in, ...this.out])
    }

    public getRoot(): Router {
        return this.in[0].ancestor ? this.in[0].ancestor.router.getRoot() : this
    }

    trigger({ accessor, origin = this, updateET = true }: TriggerArgs) { //? type
        // $.Execution.log(`└──> [R-${this.constructor.name}] #trigger`)
        // $.Execution.indent()

        if (!updateET) {
            // $.Execution.log('└──  update blocked, exiting')
            // $.Execution.unindent()
            return
        }

        // $.Execution.log(`├── (1) root ${this.root === this ? 'is' : 'is not'} self`)
        // $.Execution.log(`├── (2) get the execution tree ${this.root === this ? 'from self' : 'from root'}`)

        const root = this.getRoot()
        root.executionTree = ExecutionTree.get(root)

        // $.Execution.log(`└── (3) executing the execution tree ${this.root.executionTree}`)
        // $.Execution.indent()
        root.executionTree.update(accessor, origin)
        // $.Execution.unindent()
        // $.Execution.unindent()
    }

    execute(payload: TriggerArgs) { //?
        // $.Execution.log(`└──> [R-${this.constructor.name}] #execute`)
        // $.Execution.indent()
        // this.process.execute(payload)
        // $.Execution.unindent()
    }

    // header() {}
}