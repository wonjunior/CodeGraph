import Graph from '@/Graph'
import { SetterParams } from '@/interpreter/interfaces'
import CustomProcess from '@/interpreter/process/CustomProcess'
import DefaultRouter from '@/interpreter/router/DefaultRouter'
import { ComponentParams } from '@/node/interfaces'
import Node from './Node'

export default class SetterNode extends Node {
    constructor(graph: Graph, { process, ...nargs }: ComponentParams) {
        const { compute, string, params } = process as SetterParams
        super(new CustomProcess(compute, string, params, []), new DefaultRouter(true, false), graph, nargs)
    }
}