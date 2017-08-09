class Queue extends Object {

    add(other) {

        return Object.assign(this, other);

    }

}

class GraphInterpreter {

    calculate(nodes) {

        var verts = new Queue();

        for(var nodeId in nodes) {

            var nd = node[nodeId];
            if(nd.isCalculable()) { verts.add(nd.function()) }

        } return verts;

    }

    analyse(vertices) {

        let newVerts = new Queue();

        for (var id in vertices) {

            if(path.exist(id)) {

                let verts = this.getTargets(id);

                for (var i in verts) {

                    let value = vertices[id];

                    let [nd,dk] = verts[i].split('-');

                    nd = this.saveParameter(nd, dk, value);

                    newVerts[nd] = node[nd];
                }

            }

        } return newVerts

    }

    getTargets(vertex) {

        let paths = $('path[class*='+vertex+']');
        let targets = [];

        for (var i = 0; i < paths.length; i++) {

            targets.push(paths[i].getAttribute('class').split(' ')[1])

        } return targets;

    }

    saveParameter(nd, dk, value) {

        let dockNb = dk.split('_')[1] - 1;

        node[nd].argument[dockNb] = value;
        node[nd].nbEntries += 1;

        return nd;
    }

}

gi = new GraphInterpreter();


let vertices = node;
wait(function() {

    while (Object.keys(vertices).length != 0) {

        values = gi.calculate(vertices);
        vertices = gi.analyse(values);

    }


});
