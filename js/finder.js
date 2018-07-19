/*
** Finder class handles the finder modal
*/
class Finder {

    constructor() {}

    getItems() {
        return $('#search-table').find('tr')
    }

    filter(item) {
        return (item.children('td').text().toLowerCase().indexOf(finder.saved) > -1) ? true : false
    }

    search() {
        let input = arguments[0].toLowerCase()

        // handle exceptions
        if (isEmpty(input)) { finder.saved = undefined; finder.hide(); return; }
        if (input == finder.saved) { return } else { finder.saved = input }

        // filter items
        let items = finder.getItems();
        for(let i = 0; i < items.length; i++) {

            let item = items.eq(i)
            if(finder.filter(item)) {
                finder.show(item)
            } else {
                finder.hide(item)
            }

        }

        if(finder.noResult()) {
            finder.hide()
        } else {
            finder.last = finder.indexOfLast()
            finder.hovered = undefined
        }

    }

    hide() {
        if(arguments.length == 1) { $(arguments[0]).hide() } else { $('#search-wrap:visible').hide() }
    }

    show(item) {
        item.show();
        $('#search-wrap:hidden').show();
    }

    noResult() {
        return $('tr:visible').length == 0;
    }

    indexOfLast() {
        return $('tr:visible').length-1;
    }

} let finder = new Finder();


$('body').bind('keydown', function(e) {


    // prevent the scroll when space bar is pressed
    if(e.keyCode == 32 && e.target == document.body) {

        e.preventDefault();

    }

    // space bar and escape key triggers
    if(e.keyCode == 32 && !ui.searching) {

        ui.showSearch();

    } else if(e.keyCode == 27 && ui.searching) {

        $('tr[class=hovered]').attr('class', 'not-hovered');
        ui.hideSearch();

    }

    // navigate finder: down arrow
    if(e.keyCode == 40) {

        if(finder.hovered) {
            let index = finder.hovered.index('tr[node-type]:visible');

            if(index != finder.last) {

                $('tr[class=hovered]').attr('class', 'not-hovered');
                finder.hovered = finder.hovered.nextAll(':visible').eq(0);

                if(index > 3) {
                    $('#search-wrap').animate({
                        scrollTop: 45.6 * (index-1)
                    }, 100);
                } else {
                    $('#search-wrap').animate({
                        scrollTop: 0
                    }, 100);
                }

            }

        } else if(!finder.hovered) {

            finder.hovered = $('tr[node-type]:visible:first')

        }

        finder.hovered.attr('class', 'hovered');
    }

    // navigate finder: up arrow
    if(e.keyCode == 38 && finder.hovered) {

        let index = finder.hovered.index('tr[node-type]:visible');

        if(index != 0) {

            $('tr[class=hovered]').attr('class', 'not-hovered');
            finder.hovered = finder.hovered.prevAll(':visible').eq(0);

            if(index < finder.last - 3) {

                $('#search-wrap').animate({
                    scrollTop: 45.6 * (index-3)
                }, 100);

            }

        }

        finder.hovered.attr('class', 'hovered');

    }

    // prevent the carret to move sideways when arrow up/down
    if(e.keyCode === 38 || e.keyCode === 40) {
        return false;
    }

});


$('tr[node-type]').mouseenter(function() {

    $('tr[class=hovered]').attr('class', 'not-hovered');
    finder.hovered = $(this);
    finder.hovered.attr('class', 'hovered');

});

$('tr[node-type]').click(function() {

    nodeType = $(this).attr('node-type');

    let nodeData = lib[nodeType];
    nodeData.position = [event.pageX-20,event.pageY-10];

    let newNode = new Node(nodeData);
    newNode.select();

    ui.hideSearch();

    mh.stick(newNode.id);

});
