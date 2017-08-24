class Node {

    static count() {

        return Object.keys(node).length;

    }

    static get(el) {

        const nodeId = $(el).attr('class').split(' ')[1];
        return node[nodeId];

    }

    constructor(obj) {

        this.id = this.createId();
        if (obj.initializer) {
            new Stream(this.id);
        } else if (obj.dock.input.length == 0) {
            this.isConstant = true;
        }

        this.name = obj.name;
        this.position = obj.position;
        this.dock = obj.dock;
        this.arguments = obj.arguments;
        this.function = obj.function;

        node[this.id] = this;
        ui.draw(this);
        this.$ = $('.'+this.id);
    }

    createId() {
        return 'node_' + String(Node.count()+1);
    }

    select() {
        ui.select(this.$)
    }

    getDocksRef() {
    	return this.$.find('.data.left').get()
            .map((el) => this.id+'-'+$(el).attr('class').split(' ')[1]);
    }


} var node = {};
