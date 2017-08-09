/*
** GraphInterpreter class (GI) class interprets and runs the code. It's a linear, direct interpreter
** it runs by steps: every step the GI processes an array, when the array is empty it stops
** more information can be found in interpreter.md and algorithm.md on how it runs
** an instance is created when the interpreter is run
*/
class GraphInterpreter {

    /*
    ** takes a {} of nodes, loops through it and calculates only the calculable nodes
    ** i.e. nodes that have found all their argument
    ** it returns a Queue of the vertices that have been calculated and their values
    ** exemple: {'node_1-dock_5': 52, 'node_3-dock_3': 100}
    */
    calculate(nodes) {

        var verts = new Queue();

        for(var nodeId in nodes) {

            var nd = node[nodeId];
            if(nd.isCalculable()) { verts.add(nd.function()) }

        } return verts;

    }

    /*
    ** takes a {} of vertices, usually returned from calculate(), finds out to which sockets
    ** each vertex is connected and then save their values to those sockets
    ** the method returns an array of affected nodes for the next interpretation step
    */
    analyse(vertices) {

        let newVerts = new Queue();

        for (var id in vertices) {

            if(path.exist(id)) {

                let verts = this.getTargets(id);

                for (var i in verts) {

                    let value = vertices[id];

                    let [nd, dk] = verts[i].split('-');

                    nd = this.saveParameter(nd, dk, value);

                    newVerts[nd] = node[nd];
                }

            }

        } return newVerts

    }

    /*
    ** takes a string corresponding to the id of a vertex
    ** the method returns an array of dockIds to which the vertex is connected
    */
    getTargets(vertex) {

        let paths = $('path[class*='+vertex+']');
        let targets = [];

        for (var i = 0; i < paths.length; i++) {

            targets.push(paths[i].getAttribute('class').split(' ')[1])

        } return targets;

    }

    /*
    ** takes a nodeId, a dockId and a value
    ** adds the value in the node object
    */
    saveParameter(nd, dk, value) {

        let dockNb = dk.split('_')[1] - 1;

        node[nd].argument[dockNb] = value;
        node[nd].nbEntries += 1;

        return nd;
    }

}

gi = new GraphInterpreter();

// testing the interpreter
let vertices = node;
wait(function() {

    while (Object.keys(vertices).length != 0) {

        values = gi.calculate(vertices);
        vertices = gi.analyse(values);

    }


});
