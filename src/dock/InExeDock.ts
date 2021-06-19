import { TriggerArgs } from '@/interpreter/interfaces'
// import Router from '@/interpreter/router/Router'
import EmptyDock from './EmptyDock'
import { DockParams, DockSide, FlowType } from './interfaces'
import OutExeDock from './OutExeDock'
import UniqueSocket from './UniqueSocket'

export default class InExeDock extends UniqueSocket {
    // private router: Router

    get ancestor(): OutExeDock {
        return <OutExeDock>{}
        // return (this.link ? this.link.origin : EmptyDock) as OutExeDock //? Link<ExeDock> would make is easier
    }

    constructor(params: DockParams) {
        super(FlowType.EXE, DockSide.LEFT, params)
    }

    trigger(payload: TriggerArgs | void) {
        // this.node.router.trigger(payload) //? what about this.router.?

        // $.Execution.log(`├──> exe propagation to ${this.node}`)

        // $.Execution.pipe()
        // this.node.router.trigger({accessor: this, ...payload })
        // $.Execution.unindent()
        // $.Execution.log('└──/ data propagation ended')
    }
}
