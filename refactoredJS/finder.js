'use strict'

class Finder {

    get visible() {

        return this.finderElement.style.display != 'none';

    };

    set visible(state) {

        this.finderElement.style.display = !!state;

    };

    constructor(container) {

        this.container = container;

        createFinder();

        _(this);

    };

    createFinder() {

        let template = document.querySelector('template#finder');
        template = document.importNode(template.content, true);

        this.finderElement = template.querySelector('.finder');
        this.wrapperElement = template.querySelector('.searchWrap');
        this.tableElement = template.querySelector('.searchTable');
        this.inputElement = template.querySelector('input');

    };

};

const nodeFinder = new Finder(Canvas.element);
