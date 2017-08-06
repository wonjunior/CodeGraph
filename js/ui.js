class UserInterface {

    deselect() {

        $('.container#selected').removeAttr('id');

    }

    select(node) {

        this.deselect()
        node.attr('id', 'selected')

    }

    formatPos(pos) {

        return 'style="left:' + pos[0] + 'px;top:' + pos[1] + 'px"';

    }

    getNodeHTML(node) {

        var html;

        node.nbEntries = 0;

        var pos = this.formatPos(node.position);

        var html = '<div '+pos+'class="container '+node.id+'"><div class="header"><div class="headerTitle">'+node.label+'</div></div><div class="body"><div class="leftblock">';

        var dock = 0;

        // add node's parameters
        for(var i = 0; i < node.input.length; i++) {


            html += '<div class="parameter dock_'+String(++dock)+' left"><div class="snapDock" state=""></div><div class="dock"></div><div class="paramName">'+node.input[i]+'</div></div>';


        }
        node.totalNbEntries = dock;

        // input node
        if(node.input.length == 0) {
            node.nbEntries = node.argument.length;
            node.totalNbEntries = node.argument.length;
        }

        html += '</div><div class="rightblock">';

        // add node's output
        for(var i = 0; i < node.output.length; i++) {

            var dockId = 'dock_'+String(++dock);

            node.return.push(node.id+'-'+dockId);

            html += '<div class="parameter '+dockId+' right"><div class="snapDock" state=""></div><div class="dock"></div><div class="paramName">'+node.output[i]+'</div></div>';

        }

        html += '</div></div></div>';

        return html;

    }

    update() {

        updateInteraction()

    }

    draw(node) {

        var nodeHTML = this.getNodeHTML(node);

        $('body').prepend(nodeHTML);

        ui.update();

    }

}

ui = new UserInterface()
