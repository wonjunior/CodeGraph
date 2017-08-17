class Node {

    static count() {

        return Object.keys(node).length;

    }

    static get(el) {

        const nodeId = $(el).attr('class').split(' ')[1];
        return node[nodeId];

    }

    createId() {
        return 'node_' + String(Node.count()+1);
    }

    constructor(obj) {


        this.id = this.createId();
        this.name = obj.name;
        this.position = obj.position;
        this.execution = obj.execution;
        this.label = obj.label;
        this.arguments = obj.arguments;
        this.function = obj.function;

        node[this.id] = this;
        ui.draw(this);
        this.$ = $('.'+this.id);
    }


    select() {

        ui.select(this.$)

    }

    isCalculable() {

        return this.totalNbEntries == this.nbEntries;

    }


}

var node = {}
