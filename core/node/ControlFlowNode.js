'use strict'

class ControlFlowNode extends Node {

  constructor(graph, args) {

    const { type, ...nodeAttributes } = args;

    super(new ControlFlowProcess[type](), new ControlFlowRouter[type](), graph, nodeAttributes);

  }

}