'use strict'

class Selection {

    constructor(objects) {

        if (Array.isArray(objects)) { // for later use...

            Selection.objects.push(...objects);
            this.objects.forEach(object => object.highlighted = true);

        } else {

            if (objects.toggleHighlight()) {

                Selection.objects.push(objects);

            } else {

                const index = Selection.objects.indexOf(objects);
                Selection.objects.splice(index, 1);

            }

        }

    };

};

Object.assign(Selection, {

    objects: []

});
