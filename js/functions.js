var _ = function(a) {
    console.log(a);
}

var exist = function(id) {

    return $(id).length;

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
