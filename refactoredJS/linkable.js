'use strict'

class Linkable {

    constructor(event, startDock) {

        this.startDock = startDock;
        this.snapped = false;

        this.startLinking(event);

    }

    startLinking(event) {

        Linkable.event = event => this.linking(event) ;
        document.addEventListener('mousemove', Linkable.event);
        document.addEventListener('mouseup', this.endLink, { once: true });

    }

    linking(e) {

        _(event);

    }

    endLink() {

        document.removeEventListener('mousemove', Linkable.event);

    }




}
