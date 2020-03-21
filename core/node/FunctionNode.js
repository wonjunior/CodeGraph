'use strict'

class FunctionNode extends Node {

  constructor(graph, args) {

    const { process, ...nodeAttributes } = args;
    const { func, stringFunc, params, result } = process;

    super(new CustomProcess(func, stringFunc, params, [result]), new DefaultRouter(), graph, nodeAttributes);

  }

}