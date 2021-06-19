import { Deps, TriggerArgs, Data } from '@/interpreter/interfaces'
import Process from '@/interpreter/process/Process'
// import DockElement from '@/view/DockElement'
import { DockParams, DockSide, FlowType } from './interfaces'
import MultipleSocket from './MultipleSocket'

export default class OutDataDock extends MultipleSocket {
    private process: Process

    /**
     * OutDataDock#value is null if the value is not available on that dock
     */
    public value = {} as Data<number> | null

    constructor(params: DockParams) {
        super(FlowType.DATA, DockSide.RIGHT, params)
    }

    getDependencies(): Deps { //? is this a good idea?
        this.process.dependencies.parents.add(this.router)
        return this.process.dependencies
    }

    getValue(): [number, string] | null {
        return this.value ? [ this.value.computed, this.value.string ] as [number, string] : null
    }

    setValue(value?: Data<number>) {
        this.value = value ? value : null
    }

    propagate(payload: TriggerArgs) {
        this.links.forEach(link => link.trigger(payload))
    }
}
