'use strict'

class Draggable {

  constructor({ type, event, element, object, canvas, callback }) { // <? just setter position

    $.Draggable.log(`┌── Starting dragging`, element);

    this.element = element;
    this.object = object;
    this.callback = callback || (() => {});
    this.canvas = canvas;

    (type == 'stick') ? this.startStick(event, callback) : this.startDrag(event, callback);

  };

  startStick(e) {

    const parentProp = this.element.parentElement.getBoundingClientRect();
    this.offset = [ parentProp.x + 50, parentProp.y + 10 ];

    const eventHandler = e => this.dragging(e);

    this.dragging(e);

    document.addEventListener('mousemove', eventHandler);
    document.addEventListener('mousedown', () => this.endDrag(eventHandler), { once: true });

  };

  startDrag({clientX, clientY}) {

    const selfPos = this.element.getBoundingClientRect();
    const parentPos = this.element.parentElement.getBoundingClientRect();
    this.offset = [ clientX - selfPos.x + parentPos.x, clientY - selfPos.y + parentPos.y ];

    $.Draggable.pipe();
    $.Draggable.log(`- initial parent->mouse offset is [${this.offset}]`);

    const eventHandler = e => this.dragging(e);

    document.addEventListener('mousemove', eventHandler);
    document.addEventListener('mouseup', () => this.endDrag(eventHandler), { once: true });

  };

  dragging(e) {

    const [ offsetX, offsetY ] = this.offset;

    // $.Draggable.log(`- target position [${targetPosition}]`);
    $.Draggable.log(`-> client=[${e.clientX}, ${e.clientY}], canvasZoomLevel=${this.offset}`);

    // let targetPosition = [ (e.clientX - offsetX) / this.canvas.element.zoomLevel, (e.clientY - offsetY) /  this.canvas.element.zoomLevel ];
    let targetPosition = [ (e.clientX - offsetX), (e.clientY - offsetY) ];

    $.Draggable.log(`${targetPosition}`)
    this.object.position = targetPosition;

    this.callback();

  };

  endDrag(fct) {

    $.Draggable.unindent();
    $.Draggable.log('└──/ dragging ended');
    document.removeEventListener('mousemove', fct);

  };

};
