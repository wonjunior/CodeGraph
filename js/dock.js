class Dock {

    static getSide(el) {

        return $(el).parent().attr('class').split(' ')[2];

    }

    static getNodeId(el) {

        return $(el).parents('.container').attr('class').split(' ')[1];

    }

    static getId(el) {

        return $(el).parents('.parameter').attr('class').split(' ')[1]

    }

}
