'use strict'

class Linkable {

    constructor(event, startDock) {

        // determine if a link needs to be updated or a new one has to be created
        if (startDock.occupied && ( !startDock.isRight || startDock.isRight && startDock.type == 'exe') ) {

            this.link = startDock.link[0].edit();

        } else {

            this.link = new Link({
                startDock,
                type: startDock.type,
                id: startDock.id
            });

            startDock.link.push(this.link); // <- add to startDock

            // right-sided data docks are never occupied
            startDock.occupied = !(startDock.isRight && startDock.type == 'data');

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

        // mousemove on .snapDock
        if (e.target.classList.contains('snapDock')) {

            // mouseenter .snapDock
            if (!this.snapped) {

                const snapDock = dock[ e.target.ref ];

                // snapping can occur
                if (this.link.startDock.isCompatible(snapDock)) {

                    this.snap(snapDock);

                // snapping cannot occur
                } else {

                    this.link.update(View.mousePosition(e));

                }

            // already snapped
            } else {

                // this.link.update(this.snapDock.position);

            }

        // mousemove out of .snapDock
        } else {

            // mouseleave .snapDock
            if (this.snapped) {

                this.snapped = false;

            }

            this.link.update(View.mousePosition(e));

        }

    };

    snap(snapDock) {

        this.snapped = true;
        this.link.snapDock = snapDock;
        this.link.update(snapDock.position);

    };

    endLink() {

        if (this.snapped) { // <? make sure snapDock.link.length == 0 otherwise pop the other one

            this.link.save();

        } else {

            this.link.remove();

        }

        document.removeEventListener('mousemove', Linkable.mousemove);

    };

}
