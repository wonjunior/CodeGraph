'use strict'

class OperatorNode extends Node {

  constructor(args) {

    const { process, ...nodeAttributes } = args;
    const { func, stringFunc, params, result } = process;

    super(new CustomProcess(func, stringFunc, params, [result]), null, nodeAttributes);

  }

}