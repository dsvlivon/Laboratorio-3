"use strict";
var Animal = /** @class */ (function () {
    //#endregion
    function Animal(cantidadPatas) {
        this._cantidadPatas = cantidadPatas;
    }
    //#region Get-Set
    //ESTA ES LA FORMA TS PARA FORMAR GETTERS Y SETTERS 
    // public set cantidadPatas(cant:number)
    // {
    //     this._cantidadPatas = cant;
    // }
    // public get cantidadPatas()
    // {
    //     return this._cantidadPatas;
    // }
    //ESTA ES LA FORMA JAVA DE ARMAR METODOS GETTERS Y SETTERS 
    Animal.prototype.setCantidadPatas = function (cant) {
        this._cantidadPatas = cant;
    };
    Animal.prototype.getCantidadPatas = function () {
        return this._cantidadPatas;
    };
    //#endregion
    //#region Metodos
    Animal.prototype.queSoy = function () {
        console.log("Soy un chobi!!!");
    };
    return Animal;
}());
