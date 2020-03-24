'use strict'

class SetterNode extends Node {

  constructor(graph, args) {

    super(new SetterProcess('c'), new DefaultRouter(), graph, args); // <?! "c"

  }

}