import Graph from '@/Graph'
import { FunctionParams } from '@/interpreter/interfaces'
import CustomProcess from '@/interpreter/process/CustomProcess'
import DefaultRouter from '@/interpreter/router/DefaultRouter'
import { ComponentParams } from './interfaces'
import Node from './Node'

export default class FunctionNode extends Node {
    constructor(graph: Graph, { process, ...nargs }: ComponentParams) {
        const { compute, string, params, result } = process as FunctionParams
        super(new CustomProcess(compute, string, params, result), new DefaultRouter(), graph, nargs)
    }
}