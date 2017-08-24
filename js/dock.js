class Dock {

    linkedTo(id) {

	    return $('.'+id).attr('class').split(' ')[0].split('-');

    }

    getIndex(dock) {

    	return dock.split('_')[1];

    }

    getConst() {

    }


} let dock = new Dock();
