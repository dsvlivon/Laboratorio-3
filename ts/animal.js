"use strict";
var Animal = /** @class */ (function () {
    function Animal(cantidadPatas) {
        this.cantidadPatas = cantidadPatas;
    }
    Animal.prototype.queSoy = function () {
        console.log("soy un animal");
    };
    Animal.prototype.setCantidadPatas = function (cant) {
        this.cantidadPatas = this.cantidadPatas;
    };
    Object.defineProperty(Animal.prototype, "asdcantidadPatas", {
        set: function (qty) {
            this.cantidadPatas = qty;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Animal.prototype, "cantidadPataxs", {
        get: function () {
            return this.cantidadPatas;
        },
        enumerable: false,
        configurable: true
    });
    return Animal;
}());
