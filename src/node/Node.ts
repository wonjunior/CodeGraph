import Dock from '@/dock/Dock'
import Graph from '@/Graph'
import GraphObject from '@/GraphObject'
import Process from '@/interpreter/process/Process'
import NullRouter from '@/interpreter/router/NullRouter'
import Router from '@/interpreter/router/Router'
import NodeElement from '@/view/NodeElement'
import { NodeParams } from './interfaces'

/**
 * Node is the model of a graph node. It uses by default to represent itself visually.
 * Node's view class (by default NodeElement) should meet implement the #update and #remove methods.
 */
export default class Node extends GraphObject {
    public graph: Graph
    public process: Process
    public router: Router
    public element: NodeElement
    public docks: Set<Dock>

    constructor(process: Process, router: Router = new NullRouter(), graph: Graph, params: NodeParams) { //? types
        //? can you pass the process to the router's constructor?
        super()

        this.graph = graph
        this.process = process
        this.router = router
        this.router.process = this.process

        this.bindDocks()

        const dockElements = [...this.docks].map(({element}) => element)
        this.element = new NodeElement(dockElements, graph.canvas, params)
        this.graph.store.bind(this.element.header, this)
    }

    bindDocks() {
        this.docks = new Set([...this.process.docks, ...this.router.docks])
        this.docks.forEach(dock => this.graph.store.bind(<HTMLElement>dock.element.snap, dock))
        this.docks.forEach(dock => dock.node = this)

        // this.process.docks.forEach(dock => dock.process = this.process)
        // this.router.docks.forEach(dock => dock.router = this.router)
    }

    /**
     * This method updates all links connected to the node.
     */
    update() {
        this.docks.forEach(dock => dock.update())
    }

    destroy() {
        this.docks.forEach(dock => dock.destroy())
        this.graph.unregister(this)
        this.element.remove()
    }

    toString() {
        return this.element.labelText
    }
}