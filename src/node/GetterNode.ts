import Graph from '@/Graph'
import { GetterParams } from '@/interpreter/interfaces'
import CustomProcess from '@/interpreter/process/CustomProcess'
import DefaultRouter from '@/interpreter/router/DefaultRouter'
import Node from '@/node/Node'
import { ComponentParams } from './interfaces'

export default class GetterNode extends Node {
    constructor(graph: Graph, { process, ...nargs }: ComponentParams) {
        const { compute, string, result } = process as GetterParams
        super(new CustomProcess(compute, string, [], result), new DefaultRouter(false, true), graph, nargs)
    }
}