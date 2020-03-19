'use strict'

class OperatorNode extends Node {

  constructor(args) {

    const { canvas, process, ...nodeAttributes } = args;
    const { func, stringFunc, params, result } = process;

    super(new CustomProcess(func, stringFunc, params, [result]), null, canvas, nodeAttributes);

  }

}