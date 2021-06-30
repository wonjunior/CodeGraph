import Graph from '@/Graph'
import { FunctionParams } from '@/interpreter/interfaces'
import CustomProcess from '@/interpreter/process/CustomProcess'
import { ComponentParams } from '@/node/interfaces'
import Node from '@/node/Node'

export default class OperatorNode extends Node {
    constructor(graph: Graph, { process, ...nargs }: ComponentParams) {
        const { compute, string, params, result } = process as FunctionParams
        super(new CustomProcess(compute, string, params, result), null, graph, nargs)
    }
}