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


class Camioneta extends Vehiculo{
    public cuatroXcuatro:boolean;

    constructor(id:number, marca:string, modelo:string, precio:number, cuatroXcuatro:boolean){
        super(id, marca, modelo, precio);
        this.cuatroXcuatro = cuatroXcuatro;
    }
}