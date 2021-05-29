import Graph from '@/Graph'
import SetterProcess from '@/interpreter/process/SetterProcess'
import DefaultRouter from '@/interpreter/router/DefaultRouter'
import { NodeParams } from '@/node/interfaces'
import Node from './Node'

export default class SetterNode extends Node {
    constructor(graph: Graph, args: NodeParams) { //? ???
        super(new SetterProcess('c'), new DefaultRouter(), graph, args) //? "c"
    }
}