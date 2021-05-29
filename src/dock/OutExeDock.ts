import { DockSide, FlowType } from './interfaces'
import UniqueSocket from './UniqueSocket'

export default class OutExeDock extends UniqueSocket {
    // private router: Router

    constructor(label: string, location: string) {
        super(FlowType.EXE, DockSide.RIGHT, label, location)
    }

    propagate(updateET: boolean) {
        // this.links.forEach(({ endDock }) => endDock.trigger(updateET)) // this is obvious
        // if (this.link) this.link.end.trigger(updateET)
    }
}
