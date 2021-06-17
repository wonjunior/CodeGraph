import Dock from '@/dock/Dock'
import Graph from '@/Graph'
import { GraphObject, GraphObjectItem } from '@/GraphObject'
import Process from '@/interpreter/process/Process'
import NullRouter from '@/interpreter/router/NullRouter'
import Router from '@/interpreter/router/Router'
import { id } from '@/utils'
import DockElement from '@/view/DockElement'
import NodeElement from '@/view/NodeElement'
import { NodeParams } from './interfaces'

class Docks extends Array<Dock> {
    constructor(...docks: Set<Dock>[]) {
        super(...docks.map(d => Array.from(d)).flat())
    }

    public get elements(): Array<DockElement> {
        return this.map(({ element }) => element)
    }

    public get binds(): Array<GraphObjectItem> {
        return this.map(d => d.binds[0])
    }

    public attachTo(router: Router): Docks {
        this.forEach(d => d.router = router)
        return this
    }

    public update(): void {
        this.forEach(d => d.update())
    }
}

/**
 * Node is the model of a graph node. It uses by default to represent itself visually.
 * Node's view class (by default NodeElement) should meet implement the #update and #remove methods.
 */
export default class Node extends GraphObject {
    private id: symbol
    public graph: Graph
    public router: Router
    public element: NodeElement
    public docks: Docks

    public get binds(): Array<GraphObjectItem> {
        const binds = this.docks.binds
        binds.push([this.element.header, this], [this.element.container, this])
        return binds
    }

    constructor(process: Process, router: Router | null, graph: Graph, params: NodeParams) {
        //? can you pass the process to the router's constructor?
        super()

        this.id = id()
        this.graph = graph
        this.router = router || new NullRouter()
        this.router.process = process

        this.docks = new Docks(process.docks, this.router.docks).attachTo(this.router)
        this.element = new NodeElement(this.docks.elements, graph.canvas, params)
    }

    /**
     * This method updates all links connected to the node.
     */
    update(): void {
        this.docks.update()
    }

    destroy() {
        // this.docks.forEach(dock => dock.destroy())
        this.graph.unregister(this)
        this.element.remove()
    }

    toString() {
        return this.element.labelText
    }

    select() {
        return this.element.container.classList.toggle('selected')
    }
}