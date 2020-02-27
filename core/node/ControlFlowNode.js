'use strict'

class ControlFlowNode extends Node {

  constructor(args) {

    const { type, ...nodeAttributes } = args;

    super(new ControlFlowProcess[type](), new ControlFlowRouter[type](), nodeAttributes);

  }

}