'use strict'

class DockElement extends Element {

  static parameters = {
    InExeDock: { offset: 10 }, OutExeDock: { offset: 10 },
    InDataDock: { offset: 7 }, OutDataDock: { offset: 7 }
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

  constructor(dock, location, params) {

    super(dock);

    this.location = location;
    this.dock = dock;
    this.labelText = params.label;

  }

  render(node, canvasZoom) {

    super.render(node[this.location]);

    this.node = node;

    wait(() => this.initRelativePosition(canvasZoom));

  }

  create(dock) {

    const $ = Template.dock();

    Object.assign(this, {
      container: $('.dock-container'),
      pin: $('.dock'),
      snap: $('.snap-dock'),
      param: $('.param-container'),
      label: $('.param-label'),
    });

    this.container.classList.add(
      dock instanceof DataDock ? 'data' : 'exe',
      dock.isRight ? 'right' : 'left'
    );

    this.snap.ref = dock.id;
    this.container.id = dock.id;

  }

  initRelativePosition(canvasZoom) {

    const nodePos = this.node.container.getBoundingClientRect();
    const dockPos = this.pin.getBoundingClientRect();
    const offset = DockElement.parameters[this.dock.constructor.name].offset;

    this.offset = [
      (dockPos.x - nodePos.x) / canvasZoom.level + offset,
      (dockPos.y - nodePos.y) / canvasZoom.level + offset
    ];

  }

}