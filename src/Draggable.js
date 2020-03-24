'use strict'

class Draggable {

  constructor({ type, event, element, object, canvasZoom, callback }) { // <? just setter position

    $.Draggable.log(`┌── Starting dragging`, element);

    this.element = element;
    this.object = object;
    this.callback = callback || (() => {});
    this.canvasZoom = canvasZoom;

    (type == 'stick') ? this.startStick(event, callback) : this.startDrag(event, callback);

  };

  startStick(e) {

    const parentProp = this.element.parentElement.getBoundingClientRect();
    this.offset = [ parentProp.x + 50, parentProp.y + 10 ];

    this.dragging(e);
    document.addEventListener('mousemove', this.dragging);
    document.addEventListener('mousedown', this.endDrag, { once: true });

  };

  startDrag({clientX, clientY}) {

    const selfPos = this.element.getBoundingClientRect();
    const parentPos = this.element.parentElement.getBoundingClientRect();
    this.offset = [ clientX - selfPos.x + parentPos.x, clientY - selfPos.y + parentPos.y ];

    document.addEventListener('mousemove', this.dragging);
    document.addEventListener('mouseup', this.endDrag, { once: true });

  };

  dragging = e => {

    const [ offsetX, offsetY ] = this.offset;

    $.Draggable.log(`├──> client=[${e.clientX}, ${e.clientY}], offset=${this.offset}`);
    let targetPosition = [ (e.clientX - offsetX) / this.canvasZoom.level, (e.clientY - offsetY) / this.canvasZoom.level ];

    $.Draggable.pipe();
    $.Draggable.log(`└──> new position = [${targetPosition}]`);
    $.Draggable.indent();
    this.object.position = targetPosition;
    $.Draggable.unindent();
    $.Draggable.unindent();

    this.callback();

  };

  endDrag = () => {

    $.Draggable.log('└──/ dragging ended');
    document.removeEventListener('mousemove', this.dragging);

  };

};
