"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Gato = /** @class */ (function (_super) {
    __extends(Gato, _super);
    function Gato(cantidad, vidas) {
        var _this = _super.call(this, cantidad) || this;
        _this.vidas = vidas;
        return _this;
    }
    Gato.prototype.queSoy = function () {
        console.log("Soy un Gatienzo!");
    };
    Gato.prototype.getVidas = function () {
        return 7;
    };
    return Gato;
}(Animal));
