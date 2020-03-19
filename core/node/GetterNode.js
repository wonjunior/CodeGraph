'use strict'

class GetterNode extends Node {

  constructor(args) {

    const { canvas, ...nodeAttributes } = args;

    super(new GetterProcess('a'), null, canvas, nodeAttributes);

  }

}