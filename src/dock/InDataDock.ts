import { Data, Deps, TriggerArgs } from '@/interpreter/interfaces'
import Process from '@/interpreter/process/Process'
// import EmptyDock from './EmptyDock'
import { DockSide, FlowType } from './interfaces'
import OutDataDock from './OutDataDock'
import UniqueSocket from './UniqueSocket'

export default class InDataDock extends UniqueSocket {
    public get ancestor(): OutDataDock {
        return <OutDataDock>{}
        // return this.link ? this.link.origin : EmptyDock.singleton
    }

    constructor(label: string, location: string) {
        super(FlowType.DATA, DockSide.LEFT, label, location)
    }


    getDependencies(): Deps {
        return this.ancestor.getDependencies()
    }

    getValue(): [number, string] | null { //?
        return this.ancestor.getValue()
    }

    trigger(payload: TriggerArgs | void) { //? type of payload (on all #trigger)
        // $.Execution.log(`├──> data propagation to ${this.node}`)
        // $.Execution.pipe()
        this.router.trigger({ accessor: this, ...payload }) // do you want "accessor" to potentially be overwriten by "payload"'s content.accesor?
        // $.Execution.unindent()
        // $.Execution.log('└──/ data propagation ended')
    }
}
