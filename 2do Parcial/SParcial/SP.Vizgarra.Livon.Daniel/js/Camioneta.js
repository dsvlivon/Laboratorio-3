"use strict";
// enum Sexo {
//     Mujer, 
//     Hombre
// }
// class Cliente extends Persona{
//     public edad:number;
//     public sexo:Sexo;
//     constructor(id:number, nombre:string, apellido:string, edad:number, sexo:Sexo){
//         super(id, nombre, apellido);
//         this.edad = edad;
//         this.sexo = sexo;
//     }
// }
class Camioneta extends Vehiculo {
    constructor(id, marca, modelo, precio, cuatroXcuatro) {
        super(id, marca, modelo, precio);
        this.cuatroXcuatro = cuatroXcuatro;
    }
}
//# sourceMappingURL=Camioneta.js.map