"use strict";
var Animal = /** @class */ (function () {
    function Animal(cantidadPatas) {
        this.cantidadPatas = cantidadPatas;
    }
    Animal.prototype.queSoy = function () {
        console.log("Soy un chobi!!!");
    };
    return Animal;
}());
