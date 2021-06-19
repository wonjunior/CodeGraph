import { DockParams, DockSide, FlowType } from './interfaces'
import UniqueSocket from './UniqueSocket'

export default class OutExeDock extends UniqueSocket {
    // private router: Router

    constructor(params: DockParams) {
        super(FlowType.EXE, DockSide.RIGHT, params)
    }

    propagate(updateET: boolean) {
        // this.links.forEach(({ endDock }) => endDock.trigger(updateET)) // this is obvious
        // if (this.link) this.link.end.trigger(updateET)
    }
}
