class UserInterface {

    constructor() {

        this.searching = false;

    }

    deselect() {

        $('.container#selected').removeAttr('id');

    }

    select(node) {

        this.deselect()
        node.attr('id', 'selected')

    }

    // NEED A CLASS FOR FORMATTING RELATED STUFF!
    formatPos(pos) {
        return 'style="left:' + pos[0] + 'px;top:' + pos[1] + 'px"';
    }

    formatDock(side, i, label) {
        let prefix = (side == 'right') ? 'O' : 'I';
        return '<div class="data '+prefix+'dock_'+i+ ' ' +side+'"><div class="snapDock" state=""></div><div class="dock"></div><div class="paramName">'+label+'</div></div>';
    }

    formatExeDock() {
        return '<div class="execute"><div class="exe Edock_0 left"><div class="pin"></div><div class="snapDock" state=""></div></div><div class="exe Edock_1 right"><div class="pin"></div><div class="snapDock" state=""></div></div></div>';
    }

    formatHeader(pos, id, name) {
        return '<div '+pos+'class="container '+id+'"><div class="header"><div class="headerTitle">'+name+'</div></div><div class="body">'
    }

    getNodeHTML(node) {

        var html = this.formatHeader(this.formatPos(node.position), node.id, node.name);

        if (node.execution) {

            html += this.formatExeDock();

        } html += '<div class="leftblock">'


        for (let i in node.label.input) {

            html += this.formatDock('left', String(i), node.label.input[i]);

        } html += '</div><div class="rightblock">';

        for (let i in node.label.output) {

            html += this.formatDock('right', String(i), node.label.input[i]);

        } html += '</div></div></div>';

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

    showSearch() {

        this.searching = true;
        $('.search-modal').show();
        wait(() => $('#search-input').focus());

    }

    hideSearch() {

        this.searching = false;
        $('#search-input').val('');
        $('#search-wrap').hide();
        $('.search-modal').hide();

    }


}

ui = new UserInterface()

ui.cursor = {
    drop: function() {
        $('body').css('cursor', 'copy')
        $('.header').css('cursor', 'copy')
        $('.snapDock').css('cursor', 'copy')
    },
    default: function() {
        $('body').css('cursor', 'default')
        $('.header').css('cursor', 'move')
        $('.snapDock').css('cursor', 'pointer')
    }
}
