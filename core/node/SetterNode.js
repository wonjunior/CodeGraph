'use strict'

class SetterNode extends Node {

  constructor(args) {

    const { ...nodeAttributes } = args;

    super(
      new SetterProcess('a'),
      new DefaultRouter(),
      nodeAttributes
    );
    
  }

}