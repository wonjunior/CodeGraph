'use strict'

class SetterNode extends Node {

  constructor(args) {

    const { ...nodeAttributes } = args;

    super(new SetterProcess('c'), new DefaultRouter(), nodeAttributes);

  }

}