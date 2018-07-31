'use strict'

class Linkable {

    constructor(event, startDock) {

        // determine if a link needs to be updated or a new one has to be created
        if (startDock.occupied && ( !startDock.isRight || startDock.isRight && startDock.type == 'exe') ) {

            this.link = startDock.link[0].edit();

        } else {

            this.link = new Link(startDock);

        };

        this.snapped = false;

        this.startLinking(event);

    };

    startLinking(event) {

        Linkable.event = event => this.linking(event) ;
        document.addEventListener('mousemove', Linkable.event);
        document.addEventListener('mouseup', this.endLink, { once: true });

    };

    linking(e) {

        if (e.target.classList.contains('snapDock')) {

            if (!this.snapped) {

                const targetObject = dock[ e.target.ref ];

                if (this.link.startDock.isCompatible(targetObject)) {

                    // this.snap();

                }

            } else {

                this.link.update(this.snappedDock.position);

            }

        } else {

            this.link.update([ e.clientX, e.clientY ]);

        }

    };

    endLink() {

        document.removeEventListener('mousemove', Linkable.event);

    };

}
