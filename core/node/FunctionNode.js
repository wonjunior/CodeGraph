'use strict'

class FunctionNode extends Node {

  constructor(args) {

    const { canvas, process, ...nodeAttributes } = args;
    const { func, stringFunc, params, result } = process;

    super(new CustomProcess(func, stringFunc, params, [result]), new DefaultRouter(), canvas, nodeAttributes);

  }

}