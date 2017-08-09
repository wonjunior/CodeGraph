class Path {

    exist(vertex) {

        return !!$('path[class*='+vertex+']').length;

    }
}

var path = new Path();

class Node {

    static count() {

        return Object.keys(node).length;

    }

    constructor(obj) {

        nodeId = 'node_' + String(Node.count()+1);

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


    select() {

        ui.select(this.$)

    }

    isCalculable() {

        return this.totalNbEntries == this.nbEntries;

    }


}

var node = {}
