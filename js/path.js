class Path {

    search(id) {
        return $('.'+id);
    }

    removeOccupant() {
        let el = $('path[class*="'+lk.target.id+'"]');
        let oldPath = el.attr('class').split(' ');
        el.remove();
        return oldPath;
    }

    switchId(id, newId) {

        $('path[id='+id+']').attr('id',newId);

    }

    startDock(id) {
        const element = $('.'+id.split('-').slice(0,2).join(' .') + ' .snapDock');
        return [element[0], element];
    }

    orientAttr() {
        let a, b, c, d;

        if (lk.side == 'right') {
            a = lk.id; b = lk.target.id; c = lk.target.$; d = lk.$;
        } else {
            a = lk.target.id; b = lk.id; c = lk.$; d = lk.target.$;
        }

        return [[c, d], [a+'-'+b, a+' '+b]]

    }

    setAttr(current, attr) {
        $('#'+current).attr('id', attr[0]).attr('class', attr[1]);
    }

    chgAttr(dockId) {
        let targetDock = $('.'+dockId).attr('class').split(' ')[1];
        $('.'+dockId).attr('id', dockId).attr('class', '');
        _($('.'+dockId).attr('id', dockId))
        return targetDock;
    }

    linkedTo() {

        return $('path[class*='+lk.id+']').attr('id');

    }

    count(nodeId) {

        return $('path[class*='+nodeId+']').length

    }

    exist(vertex) {

        return !!$('path[id='+vertex+']').length;

    }

} let path = new Path();
