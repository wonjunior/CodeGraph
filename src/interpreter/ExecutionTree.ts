import InDataDock from '@/dock/InDataDock'
import { assert } from '@/utils'
import Router from './router/Router'

export default class ExecutionTree {
    public root: Router
    public current: Router
    public scope = new Map()
    public accessBuffer = new Map<Router, Set<InDataDock>>()

    //? please unpack this {}
    public active = { origin: null, accessors: new Set<InDataDock>() } as { origin: Router | null, accessors: Set<InDataDock> }

    static get(root: Router): ExecutionTree {
        return root.executionTree || new ExecutionTree(root)
    }

    constructor(root: Router) {
        this.root = root
    }

    update(accessor: InDataDock, origin: Router) {
        // $.Execution.log(`└──> [ET] ${this.constructor.name}#update()`)
        // $.Execution.indent()
        // $.Execution.log(`├── (1) validating access`)

        const dependencies = accessor.getDependencies()
        this.fillAccessBuffer(dependencies.parents, accessor)

        const validated = accessor.node.router == origin || this.validateAccess(accessor, origin)

        if (!validated) {
            // $.Execution.log('└──/ access not validated, exiting.')
            // $.Execution.unindent()
            return //? nothing?
        }

        // $.Execution.log('├── (2) updated the access buffer', this.accessBuffer)
        // $.Execution.log(`├── (3) executing tree nodes`)
        // $.Execution.pipe()
        // $.Execution.indent()
        this.current = this.root

        this.execute(origin)


        // $.Execution.unindent()
        // $.Execution.unindent()
        // $.Execution.log('└──/ tree execution ended')
        // $.Execution.unindent()

        // while(this.next()) {
        //     this.current = this.current.execute()
        //     break // safety first
        // }
    }

    fillAccessBuffer(dependencies: Set<Router>, accessor: InDataDock) {
        dependencies.forEach(dep => {
            this.accessBuffer.set(dep, (this.accessBuffer.get(dep) || new Set()).add(accessor))
        })
    }

    validateAccess(accessor: InDataDock, origin: Router) {
        // print('this.accessBuffer', this.accessBuffer, 'origin', origin)
        // print('1st cond.:', !this.active.origin)
        if (!this.active.origin) {
            this.active.origin = origin
            assert(this.accessBuffer.has(origin))
            this.active.accessors = <Set<InDataDock>>this.accessBuffer.get(origin)
        }

        // print('2nd cond.:', this.active.origin == origin)
        if (this.active.origin == origin) {
            this.active.accessors.delete(accessor)
            this.active.origin = this.active.accessors.size ? this.active.origin : null
            return !this.active.origin
        }
    }

    merge(other: ExecutionTree) {
        if (other == null) return;
        this.accessBuffer =  [...this.accessBuffer, ...other.accessBuffer].reduce((buffer, [ origin, accesses ]) => {
            return buffer.set(origin, new Set([...buffer.get(origin) || [], ...accesses]))
        }, new Map())
    }

    execute(origin: Router) {
        // this.current.execute({ origin, updateET: false })
    }

    next() {
        return this.current
    }

    toString() {
        return `ExecutionTree (scope=Map[${[...this.scope.keys()]}])`
    }
}