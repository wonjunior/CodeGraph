'use strict'

class Finder {

    get visible() {

        return this.finderElement.style.display != 'none';

    };

    set visible(state) {

        const style = !!state ? 'block' : 'none';
        this.finderElement.style.display = style;

    };

    constructor({ name, data, container, placeholder }) {

        Object.assign(this, {

            // name,
            container,
            placeholder,
            // hovering: false

        });

        this.create();

        this.data = Object.entries(data).map(([ ref, obj ]) => ({ ref, obj })); // comes from the library
        this.resultElement = {};  // { ref: HTMLElement, ref: HTMLElement }
        this.populate();

    };

    create() {

        let template = document.querySelector('template#finder');
        template = document.importNode(template.content, true);

        this.finderElement = template.querySelector('.finder');
        this.wrapperElement = template.querySelector('.search-wrap');
        this.tableElement = template.querySelector('.search-table');
        this.inputElement = template.querySelector('input');

        this.inputElement.placeholder = this.placeholder;

        this.container.appendChild(this.finderElement);

    };

    populate() {

        this.data.forEach(({ ref, obj }) => {

            let template = document.querySelector('template#finderResult');
            template = document.importNode(template.content, true);

            template.querySelector('td').textContent = obj.label;

            this.element = template.querySelector('tr');

            this.tableElement.appendChild(this.element);

            this.resultElement[ ref ] = this.element;

        });

    };

    isIn(input, data) {

        return Boolean(~data.toLowerCase().indexOf(input.toLowerCase()));

    };

    filter(input, data) {

        return input == '*' || (input && this.isIn(input, data));

    };

    search(input) {

        let noResults = true;

        this.data.forEach(({ ref, obj } , i) => {

            if (this.filter(input, obj.meta)) {

                noResults = false;
                this.displayResult(ref);

            } else {

                this.hideResult(ref);

            }

        });

        if (noResults) {

            this.hideResultBox();

        } else {

            this.displayResultBox();

        }

    };

    displayResultBox() {

        this.wrapperElement.classList.remove('hidden'); // <? could use handleDisplay('add', HTMLelement)

    };

    hideResultBox() {

        this.wrapperElement.classList.add('hidden');

    };

    displayResult(ref) {

        this.resultElement[ ref ].classList.remove('hidden');

    };

    hideResult(ref) {

        this.resultElement[ ref ].classList.add('hidden');

    };

    show() {

        this.visible = true;

        this.inputElement.focus();

    };

    hide() {

        this.visible = false;

        this.inputElement.value = "";

    };

    down() {

        if(this.hovering) {

            _('already hovering')
            /*let index = finder.hovered.index('tr[node-type]:visible');

            if(index != finder.last) {

                $('tr[class=hovered]').attr('class', 'not-hovered');
                finder.hovered = finder.hovered.nextAll(':visible').eq(0);

                if(index > 3) {
                    $('#search-wrap').animate({
                        scrollTop: 45.6 * (index-1)
                    }, 100);
                } else {
                    $('#search-wrap').animate({
                        scrollTop: 0
                    }, 100);
                }

            }*/

        } else {

            /*finder.hovered = $('tr[node-type]:visible:first');*/

        }

        /*finder.hovered.attr('class', 'hovered');*/

    };

    up() {



    };

};

Finder.properties = {

    nodeFinder: {
        // name: 'nodeFinder',
        data: Library.node,
        container: Canvas.window,
        placeholder: 'search node...'
    }

};

const nodeFinder = new Finder(
    Finder.properties['nodeFinder']
);
