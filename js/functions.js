var _ = function(a) {
    console.log(a);
}

var exist = function(id) {
    return $(id).length;
}

var isEmpty = function(str) {
    return !str.replace(/\s/g, '').length;
}

class Obj extends Array {

}
Obj.prototype.bind = function(arr2) {
    obj = {};

    this[0].forEach(function(value, index) {

       obj[value] = arr2[index];

    });

    return obj
};

var isset = function() {

  for(i in arguments) {

     if(typeof arguments[i] === 'undefined') { return false; }

  } return true;

}

var wait = function(fn) {
    setTimeout(function() { fn() }, 0)
}


/*
** Queue class is an extension of Object
** it adds some useful methods to manipulate objects
** an Object type can become a Queue type with `new Queue(object)`
** however Queue objects are usually empty on instantiation
*/

class Queue extends Object {


    /*
    ** self.add(other) takes an Object type as parameter
    ** merges the two objects together and return an Object type
    ** .add() is the same as .assign (from Object) with the exception that it affects the object
    ** directly, no assignment needed. Therefore the syntax is more suitable
    */
    add(other) {

        return Object.assign(this, other);

    }

}

function count(obj) {
    return Object.keys(obj).length;
}
