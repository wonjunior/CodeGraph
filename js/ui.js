class UserInterface {

    constructor() {

        this.searching = false;

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

} ui = new UserInterface()

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
