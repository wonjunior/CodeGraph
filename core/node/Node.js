'use strict'

// Node is the model of a graph node. It uses by default to represent itself visually.
// Node's View class (by default NodeElement) should meet implement the #update and #remove methods.
class Node extends CanvasObject {

  static all = {};

  static idOfLast = 1;
  static idPrefix = 'n';

  /**
   * Depending on the number of nodes already instanciated, the function will create a new node 
   * identifier.
   */
  static constructId() {

    return Node.idPrefix + Node.idOfLast++;

  }

  constructor(process, router, nodeAttributes) {

    super();

    this.id = Node.constructId();
    this.process = process;
    this.router = router;
    
    this.attachDocks();

    Node.register(this.id, this);

    this.element = new NodeElement(
      this, 
      [...this.docks].map(({element}) => element), 
      Canvas.nodeArea, 
      nodeAttributes
    );

  }

  attachDocks() {

    this.docks = new Set([...this.process.getDocks(), ...this.router.getDocks()]);

    this.docks.forEach(dock => dock.node = this);

  }

  /**
   * This method updates all links connected to the node.
   */
  update() { 

    this.docks.forEach(dock => dock.update());

  }

  /**
   * This method safely removes the node: destroy docks -> unregister node -> remove node element
   */
  destroy() {

    this.docks.forEach(dock => dock.destroy());

    Node.unregister(this);
  
    this.element.remove();

  }

  serialize() { }

}