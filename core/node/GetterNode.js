'use strict'

class GetterNode extends Node {

  constructor(args) {

    const { ...nodeAttributes } = args;

    super(
      new GetterProcess('a'),
      new NullRouter(),
      nodeAttributes
    );
    
  }

}