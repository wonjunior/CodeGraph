'use strict'

class FunctionNode extends Node {

  constructor(graph, args) {

    const { process, ...nodeAttributes } = args;
    const { compute, string, params, result } = process;

    super(new CustomProcess(compute, string, params, [result]), new DefaultRouter(), graph, nodeAttributes);

  }

}