'use strict'

class SetterNode extends Node {

  constructor(args) {

    const { canvas, ...nodeAttributes } = args;

    super(new SetterProcess('c'), new DefaultRouter(), canvas, nodeAttributes);

  }

}