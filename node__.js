var node =  {

    nodeCount: 0,
    all: {},

    get: function(nodeId) {
        return this.all[nodeId];
    },

    connect: function(nodeId,dockId,snapNodeId,snapDockId,pos) {
        /*this.all[nodeId].docks[dockId].links[nodeId+'-'+dockId+'-'+snapNodeId+'-'+snapDockId] = [snapNodeId, snapDockId, pos];*/
    },

    add: function(name, pos) {
        this.nodeCount += 1;
        nodeId = 'node_' + String(this.nodeCount);
        this.all[nodeId] =
            {
                nodeId: nodeId,
                type: 'multiply',
                name: name,
                pos: pos,
                docks: {
                    dock_1: {
                        type: 'int',
                        side: 'left',
                        // coordinates of dock(s) to which this dock is connected
                        links: {}
                    },
                    dock_2: {
                        type: 'int',
                        side: 'left',
                        links: {}
                    },
                    dock_3: {
                        type: 'int',
                        side: 'right',
                        links: {}
                    }
                }
            };

        var nodeHTML = '<div class="container '+nodeId+'"> <div class="header"> <div class="headerTitle">Multiply</div></div><div class="body"> <div class="leftblock"> <div class="parameter dock_'+String(1)+' left"> <div class="snapDock" state=""></div><div id="test" class="dock aa"></div><div class="paramName">int</div></div><div class="paramSpace"></div><div class="parameter dock_'+String(3)+' left"> <div class="snapDock" state=""></div><div class="dock cc"></div><div class="paramName">int</div></div></div><div class="rightblock"> <div class="parameter dock_'+String(2)+' right"> <div class="snapDock" state=""></div><div class="dock bb"></div><div class="paramName">int</div></div></div></div></div>';

        $('body').prepend(nodeHTML);
        updateInteraction();
        $('.'+nodeId).css('left',pos[0]);
        $('.'+nodeId).css('top',pos[1]);
        return this.get[nodeId];
    },

    /****************************************/

    countTotalParams: function(nodeId) {

        return this.all[nodeId].totalNbEntries;

    },

    countParams: function(nodeId) {

        return this.all[nodeId].nbEntries;

    },

    vertices: {},

    getCalculable: function(nodes) {

        var vertices = {};

        var that = this;
        var isCalculable = function(nodeId) {

            return (that.countTotalParams(nodeId) == that.countParams(nodeId))

        }

        for(var nodeId in nodes) {

            var node = nodes[nodeId];

            if(isCalculable(nodeId)) {

                vertices = Object.assign(vertices,this.all[nodeId].function())

            }

        }

        return vertices;

    },

    create: function(obj) {

        this.nodeCount += 1;
        nodeId = 'node_' + String(this.nodeCount);

        obj.nbEntries = 0;

        var position = (typeof obj.position === 'undefined') ? '' : 'style="left:'+obj.position[0]+'px;top:'+obj.position[1]+'px"';

        var nodeHTML = '<div '+position+'class="container '+nodeId+'"><div class="header"><div class="headerTitle">'+obj.label+'</div></div><div class="body"><div class="leftblock">';

        var dock = 0;

        // add node's parameters
        for (var key in obj.input) {


            nodeHTML += '<div class="parameter dock_'+String(++dock)+' left"><div class="snapDock" state=""></div><div class="dock"></div><div class="paramName">'+obj.input[key]+'</div></div>';

        }

        obj.totalNbEntries = dock;

        // input node
        if(obj.input.length == 0) {
            obj.nbEntries = obj.argument.length;
            obj.totalNbEntries = obj.argument.length;
        }

        nodeHTML += '</div><div class="rightblock">';

        // add node's output
        for (var key in obj.output) {

            var dockId = 'dock_'+String(++dock);

            obj.return.push(nodeId+'-'+dockId);

            nodeHTML += '<div class="parameter '+dockId+' right"><div class="snapDock" state=""></div><div class="dock"></div><div class="paramName">'+obj.output[key]+'</div></div>';

        }

        nodeHTML += '</div></div></div>';

        // add node to control object
        this.all[nodeId] = obj;

        $('body').prepend(nodeHTML);
        updateInteraction();

    },

    // return an array of socketId where the links go
    getTargets: function(vertex) {

        var paths = $('path[class*='+vertex+']');

        var targets = [];

        for (var i = 0; i < paths.length; i++) {

            targets.push(paths[i].getAttribute('class').split(' ')[1])

        }

        return targets;

    },

    // return if a given vertexId exists
    pathExists: function(vertex) {

        return !!$('path[class*='+vertex+']').length;

    },

    // save the parameter
    saveParameter: function(nodeId, dockId, argValue) {

        dockNb = dockId.split('_')[1] - 1;
        this.all[nodeId].argument[dockNb] = argValue;

        this.all[nodeId].nbEntries += 1;

    },

    findParameters: function(vertices) {

        for (vertId in vertices) {

            if(node.pathExists(vertId)) {

                var verts = this.getTargets(vertId);
                $$(vertId + '  targets are:')
                $$(verts)
                $$('-')

                for (var i in verts) {

                    var argValue = vertices[vertId];
                    [nodeId,dockId] = verts[i].split('-');
                    node.saveParameter(nodeId, dockId, argValue);
                }


            }

        }

    }

};
