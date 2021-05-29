import Graph from '@/Graph'
import CustomProcess from '@/interpreter/process/CustomProcess'
import DefaultRouter from '@/interpreter/router/DefaultRouter'
import { ComponentParams } from './interfaces'
import Node from './Node'

export default class FunctionNode extends Node {
    constructor(graph: Graph, args: ComponentParams) {
        const { process, ...nodeAttributes } = args
        const { compute, string, params, result } = process
        super(new CustomProcess(compute, string, params, [result]), new DefaultRouter(), graph, nodeAttributes)
    }
}