'use strict'

class Linkable {

    constructor(event, startDock) {

        // determine if a link needs to be updated or a new one has to be created
        if (startDock.occupied && ( !startDock.isRight || (startDock.isRight && !startDock.isData)) ) {

            this.link = startDock.links[0].edit();

        } else {

            this.link = new Link(startDock);

        }

        this.snapped = false;

        this.startLinking(event);

    };

    startLinking(event) {

        Linkable.mousemove = event => this.linking(event);
        document.addEventListener('mousemove', Linkable.mousemove);

        Linkable.mouseup = event => this.endLink(event);
        document.addEventListener('mouseup', Linkable.mouseup, { once: true });

    };

    linking(e) {

        // mousemove on .endDock
        if (e.target.classList.contains('snapDock')) {

            // mouseenter .endDock
            if (!this.snapped) {

                const endDock = docks[ e.target.ref ];

                // snapping can occur
                if (this.link.startDock.isCompatible(endDock)) {

                    this.snap(endDock);

                // snapping cannot occur
                } else {

                    this.link.update(View.mousePosition(e));

                }

            // already snapped
            } else {

                // this.link.update(this.endDock.position);

            }

        // mousemove out of .endDock
        } else {

            // mouseleave .endDock
            if (this.snapped) {

                this.snapped = false;

            }

            this.link.update(View.mousePosition(e));

        }

    };

    snap(endDock) {

        this.snapped = true;
        this.link.endDock = endDock;
        this.link.update(endDock.position);

    };

    endLink() {

        if (this.snapped) { // <? make sure endDock.link.length == 0 otherwise pop the other one

            const endDock = this.link.endDock;

            if (endDock.occupied && !(endDock.isData && endDock.isRight)) {

                const linkToPop = endDock.links[0];
                linkToPop.remove();

                delete links[ linkToPop.id ]

            }

            this.link.set();

        } else {

            this.link.remove();

        }

        document.removeEventListener('mousemove', Linkable.mousemove);

    };

}
