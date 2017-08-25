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
        return [
            '<div class="data '+prefix+'dock_'+i+ ' ' +side+'">',
                '<div class="snapDock" state=""></div>',
                '<div class="dock"></div>',
                '<div class="paramContainer">',
                    (side == 'left') ? '<input required="required" type="text" value="'+label+'"></input>' : '<div class="paramName">'+label+'</div>',
                '</div>',
            '</div>'
        ].join('');
    }

    formatExeDock(type) {
        if (type == 'none') {
            return '';
        } else if (type == 'both') {
            return '<div class="execute"><div class="exe Edock_0 left"><div class="pin"></div><div class="snapDock" state=""></div></div><div class="exe Edock_1 right"><div class="pin"></div><div class="snapDock" state=""></div></div></div>';
        } else {
            return '<div class="execute"><div class="exe Edock_1 right"><div class="pin"></div><div class="snapDock" state=""></div></div></div>';
        }
    }

    formatHeader(pos, id, name) {
        return '<div '+pos+'class="container '+id+'"><div class="header"><div class="headerTitle">'+name+'</div></div><div class="body">'
    }

    getNodeHTML(node) {
        var html = this.formatHeader(this.formatPos(node.position), node.id, node.name);

        html += this.formatExeDock(node.dock.execution);

        html += '<div class="leftblock">'

        for (let i in node.dock.input) {

            html += this.formatDock('left', String(i), node.dock.input[i]);

        } html += '</div><div class="rightblock">';

        for (let i in node.dock.output) {

            html += this.formatDock('right', String(i), node.dock.output[i]);

        } html += '</div></div></div>';

        return html;

    }

    update() {

        updateInteraction()

    }

    draw(node) {

        var nodeHTML = this.getNodeHTML(node);

        $('.nodes').prepend(nodeHTML);

        ui.update();

    }

    showSearch() {

        this.searching = true;
        $('.finder').show();
        wait(() => $('#search-input').focus());

    }

    hideSearch() {

        this.searching = false;
        $('#search-input').val('');
        $('#search-wrap').hide();
        $('.finder').hide();

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
