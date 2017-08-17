class Path {

    removeOccupant() {
        $('path[class*="'+lk.target.id+'"]').remove();
    }

    switchId(id, newId) {

        $('path[id='+id+']').attr('id',newId);

    }

    startDock(id) {
        const element = $('.'+id.split('-').slice(0,2).join(' .') + ' .snapDock');
        return [element[0], element];
    }

    orientAttr() {
        let a, b, c;

        if (lk.side == 'right') {
            a = lk.id; b = lk.target.id; c = lk.target.$;
        } else {
            a = lk.target.id; b = lk.id; c = lk.$;
        }

        return [c, [a+'-'+b, a+' '+b]]

    }

    setAttr(current, attr) {
        $('#'+current).attr('id', attr[0]).attr('class', attr[1]);
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
