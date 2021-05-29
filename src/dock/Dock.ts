import GraphObject from '@/GraphObject'
import Link from '@/Link'
import Node from '@/node/Node'
import DockElement from '@/view/DockElement'
import { DockSide, FlowType } from './interfaces'

/**
 * This class is part of the connection-layer for docks
 */
export default abstract class Dock extends GraphObject {
    // public abstract getDependencies(): Object //?
    // public abstract getValue(): Object //?

    //? Actual dock information
    public node: Node
    public element: DockElement
    // public router: Router

    // isFull() {
    //     return !(this instanceof OutDataDock) && this.links.size > 0
    // }

    constructor(public type: FlowType, public side: DockSide, public label: string, location: string) {
        super()
        this.element = new DockElement(type, side, label, location)
    }

    isCompatible(other: Dock): boolean {
        return this.node != other.node && this.side != other.side && this.type == other.type
    }
}