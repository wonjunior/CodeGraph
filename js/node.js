class Node {

    static createId() {
        let currentCount = Object.keys(node).length;
        return 'node_' + String(currentCount+1);
    };

    constructor(obj) {

        if (obj.initializer) {
            //new Stream(this.id);
        } else if (obj.dock.input.length == 0) {
            this.isConstant = true;
        }

        Object.assign(this, {

            id:  Node.createId(),
            label: obj.label,
            position: obj.position,
            function: obj.function,

        }); [this.$, this.header, this.exe, this.left, this.right] = this.create(this);

        this.docks = {in: {}, out: {}}

        // needs to be revisited to make it easier. Right now too much useless
        // data handling: avoid that with simpler DOM structure.
        // and by removing .in .out .exe making a single {}
        this.addDocks(obj.dock);

        node[this.id] = this;

        this.handler();
    }

    addDocks(data) {

        for (let i in data.input) {

            this.docks.in['Idock_'+i] = new Dock({
                index: i,
                prefix: 'I',
                isRight: false,
                nodeId: this.id,
                type: 'data',
                label: data.input[i],
                parent: this.left
            });
        }

        for (let i in data.output) {

            this.docks.out['Odock_'+i] = new Dock({
                index: i,
                prefix: 'O',
                isRight: true,
                nodeId: this.id,
                type: 'data',
                label: data.output[i],
                parent: this.right
            });
        }

        if (data.execution == 'right' || data.execution == 'both') {
            this.docks.exe = {};
            this.docks.exe['Edock_0'] = new Dock({
                index: 0,
                prefix: 'E',
                isRight: true,
                nodeId: this.id,
                type: 'exe',
                parent: this.exe
            });

            if (data.execution == 'both') {
                this.docks.exe['Edock_1'] = new Dock({
                    index: 1,
                    prefix: 'E',
                    isRight: false,
                    nodeId: this.id,
                    type: 'exe',
                    parent: this.exe
                });
            }
        }

    }

    create(node) {

        let main = $('<div style="left:'+node.position[0]+'px;top:'+node.position[1]+'px" class="container '+node.id+'"></div>').appendTo('.nodes')

        let background = (node.label == 'add') ? ' nodeAdd' : '';
        let body = $('<div class="body'+background+'"></div>').appendTo(main)

        return [
            main,
            $('<div class="header"><div class="headerTitle">'+node.label+'</div></div>').prependTo(main),
            $('<div class="execute"></div>').appendTo(main),
            $('<div class="leftblock"></div>').appendTo(body),
            $('<div class="rightblock"></div>').appendTo(body)
        ];
    }

    select() { UI.select(this.$) }

    getDocksRef() {
        return map(this.docks.in, (dock) => dock.ref);
    }

    handler() {

        let pointer;

        this.$.draggable({

            handle: this.header,

            start: (e) => pointer = drag.eventStart(e),

            drag: (e,ui) => [ui.position.left, ui.position.top] = drag.eventDrag(e, pointer),

        });

    }


} var node = {};
