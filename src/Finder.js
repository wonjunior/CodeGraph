'use strict'

class Finder {

  get visible() {

    return this.finderElement.style.display != 'none';

  };

  set visible(state) {

    if (state) this.hideResultBox();

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
    this.results = {};
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
      template.querySelector('td').id = ref;

      const element = template.querySelector('tr');

      this.tableElement.appendChild(element);

      this.results[ ref ] = { element: element, obj } ;

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

    this.results[ ref ].element.classList.remove('hidden');

  };

  hideResult(ref) {

    this.results[ ref ].element.classList.add('hidden');

  };

  show() {

    this.visible = true;

    this.inputElement.focus();

    State.change(Finder.state);

  };

  hide() {

    this.visible = false;

    this.inputElement.value = "";

    State.change(Editor.state.default);

  };

  select(event) {

    this.hide();

    return new Node(
      this.results[ event.target.id ].obj
    );

    };

    down() {



    };

    up() {



    };

};

// <? could support more than one finder!
// name: 'nodeFinder',
// key: spacebar

// const nodeFinder = new Finder({
//   data: Library.node,
//   container: Canvas.window,
//   placeholder: 'search node...',
// });