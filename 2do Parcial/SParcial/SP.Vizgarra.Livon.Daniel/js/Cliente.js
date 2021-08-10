"use strict";
var Sexo;
(function (Sexo) {
    Sexo[Sexo["Mujer"] = 0] = "Mujer";
    Sexo[Sexo["Hombre"] = 1] = "Hombre";
})(Sexo || (Sexo = {}));
class Cliente extends Persona {
    constructor(id, nombre, apellido, edad, sexo) {
        super(id, nombre, apellido);
        this.edad = edad;
        this.sexo = sexo;
    }
}
//# sourceMappingURL=Cliente.js.map