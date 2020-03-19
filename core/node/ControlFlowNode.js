'use strict'

class ControlFlowNode extends Node {

  constructor(args) {

    const { canvas, type, ...nodeAttributes } = args;

    super(new ControlFlowProcess[type](), new ControlFlowRouter[type](), canvas, nodeAttributes);

  }

}