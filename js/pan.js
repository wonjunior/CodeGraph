class Drag {

    eventStart(e) {
        let x = (e.pageX - $('body').offset().left) / view.scale - parseInt($(e.target).css('left'));
        let y = (e.pageY - $('body').offset().top) / view.scale - parseInt($(e.target).css('top'));
        return {x, y};
    }

    eventDrag(e, pointer) {
        let setX = Math.round((e.pageX) / view.scale - pointer.x);
        let setY = Math.round((e.pageY) / view.scale - pointer.y);
        return [setX, setY];
    }

    saveOffset() {
        view.offset = $('.objects').offset();
    }
} let drag = new Drag();

class Pan extends Drag {

    handler() {

        let pointer;

        // Window['objects'] fixed?
        $('.objects').draggable({

            mouseButton: 3, // jquery plugin

            start: (e) => pointer = this.eventStart(e),

            drag: (e,ui) => [ui.position.left, ui.position.top] = this.eventDrag(e, pointer),

            stop: () => this.saveOffset()

        }).draggable('option', 'cancel', '.container');

    }

}; let pan = new Pan();
