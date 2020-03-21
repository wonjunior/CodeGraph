'use strict'

class GetterNode extends Node {

  constructor(graph, args) {

    super(new GetterProcess('a'), null, graph, args); // <?! wait wait wait how do you it's "a"?

  }

}