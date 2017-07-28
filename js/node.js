var Nodes =  {

    nodeCount: 0,
    all: {},


    get: function(nodeId) {
        return this.all[nodeId];
    },

    connect: function(nodeId,dockId,snapNodeId,snapDockId,pos) {
        this.all[nodeId].docks[dockId].links[nodeId+'-'+dockId+'-'+snapNodeId+'-'+snapDockId] = [snapNodeId, snapDockId, pos];
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
            }

        var nodeHTML = '<div class="container '+nodeId+'"><div class="header"><div class="headerTitle">Multiply</div></div><div class="body"><div class="parameter dock_'+String(1)+' left"><div class="snapDock" state=""></div><div id="test" class="dock aa"></div><div class="paramName">int</div></div><div class="parameter dock_'+String(2)+' right"><div class="snapDock" state=""></div><div class="dock bb"></div><div class="paramName">int</div></div><div class="parameter dock_'+String(3)+' left"><div class="snapDock" state=""></div><div class="dock cc"></div><div class="paramName">int</div></div></div></div>';

        $('body').prepend(nodeHTML);
        updateInteraction();
        $('.'+nodeId).css('left',pos[0]);
        $('.'+nodeId).css('top',pos[1]);
        return this.get[nodeId];
    },

}

Nodes.add('WON',[100, 50])
Nodes.add('SERGE', [450,50])
Nodes.add('POP',[450, 300])
