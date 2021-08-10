"use strict";
var Persona = /** @class */ (function () {
    function Persona(/*id:number, */ nombre, apellido, edad) {
        this.edad = edad;
        this.nombre = nombre;
        this.apellido = apellido;
        this.id = 0;
    }
    Persona.prototype.PersonaToString = function () {
        return "nombre:" + this.nombre + "," + "apellido:" + this.apellido + "," + "edad:" + this.edad;
    };
    return Persona;
}());
//# sourceMappingURL=Persona.js.map