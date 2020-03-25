'use strict'

class OperatorNode extends Node {

  constructor(graph, args) {

    const { process, ...nodeAttributes } = args;
    const { compute, string, params, result } = process;

    super(new CustomProcess(compute, string, params, [result]), null, graph, nodeAttributes);

  }

}