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
class Auto extends Vehiculo {
    constructor(id, marca, modelo, precio, cantidadPuertas) {
        super(id, marca, modelo, precio);
        this.cantidadPuertas = cantidadPuertas;
    }
}
//# sourceMappingURL=Auto%20copy.js.map