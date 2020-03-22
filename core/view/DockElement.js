'use strict'

class DockElement extends Element {

  static parameters = {
    InExeDock:  { offset: 10  }, OutExeDock:  { offset: 10  },
    InDataDock: { offset: 7   }, OutDataDock: { offset: 7   }
  }

  get position() {

    const [ nodePosX, nodePosY ] = this.node.position;
    const [ offsetX, offsetY ] = this.offset;

    return [ nodePosX + offsetX, nodePosY + offsetY ];  // <?! zip it boi

  }

  get labelText() {

    return this.label.textContent;

  }

  set labelText(label) {

    this.label.textContent = label;

  }

  constructor(dockType, location, flowType, side, label) {

    super({ flowType, side });

    this.type = dockType;
    this.location = location;
    this.side = side;
    this.labelText = label;

  }

  /**
   *
   * @param {NodeElement} node
   * @param {CanvaZoom} zoom
   */
  render(node, zoom) {

    super.render(node.getBodyPart(this.location, this.side));

    this.node = node;

    wait(() => this.initRelativePosition(zoom));

  }

  create({ flowType, side }) {

    const $ = Template.dock();

    Object.assign(this, {
      container: $('.dock-container'),
      pin: $('.dock'),
      snap: $('.snap-dock'),
      param: $('.param-container'),
      label: $('.param-label'),
    });

    this.container.classList.add(side, flowType);

    // this.snap.ref = dock.id;
    // this.container.id = dock.id;

  }

  /**
   *
   * @param {CanvasZoom} zoom
   */
  initRelativePosition(zoom) {

    const nodePos = this.node.container.getBoundingClientRect();
    const dockPos = this.pin.getBoundingClientRect();
    const offset = DockElement.parameters[this.type].offset;

    this.offset = [
      (dockPos.x - nodePos.x) / zoom.level + offset,
      (dockPos.y - nodePos.y) / zoom.level + offset
    ];

  }

}