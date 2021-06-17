import { GraphObject, GraphObjectItem } from '@/GraphObject'
import Router from '@/interpreter/router/Router'
import DockElement from '@/view/DockElement'
import { DockSide, FlowType } from './interfaces'

/**
 * This class is part of the connection-layer for docks
 */
export default abstract class Dock extends GraphObject {
    // public abstract getDependencies(): Object //?
    // public abstract getValue(): Object //?

    public node: string
    public element: DockElement
    public router: Router

    // isFull() {
    //     return !(this instanceof OutDataDock) && this.links.size > 0
    // }

    public abstract update(): void

    public get binds(): Array<GraphObjectItem> {
        return [[<HTMLElement> this.element.snap, this]] //# make snap HTMLElement rather?
    }

    constructor(public type: FlowType, public side: DockSide, public label: string, location: string) {
        super()
        this.element = new DockElement(type, side, label, location)
    }

    isCompatible(other: Dock): boolean {
        return this.router !== other.router && this.side != other.side && this.type == other.type
    }
}