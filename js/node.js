class Node {

    select() {

        ui.select(this.$)

    }

    constructor(obj) {

        nodeId = 'node_' + String(node.count()+1);

        this.id = nodeId;
        this.$ = $('.'+nodeId);
        this.label = obj.label;
        this.position = obj.position;
        this.input = obj.input;
        this.output = obj.output;
        this.argument = obj.argument;
        this.return = obj.return;
        this.function = obj.function;

        node[nodeId] = this;

        ui.draw(this);
        this.$ = $('.'+nodeId);
    }


}

var node = {}
node.count = function() { return Object.keys(node).length-2; }
