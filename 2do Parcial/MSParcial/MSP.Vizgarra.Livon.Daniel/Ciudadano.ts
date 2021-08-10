// enum Sexo {
//     Mujer, 
//     Hombre
// }
class Ciudadano extends Persona{
    
    //public edad:number;
    //public sexo:Sexo;
    public dni:number;
    public pais:string;
    public sexo:string;

    // constructor(id:number, nombre:string, apellido:string, edad:number, sexo:Sexo){
    //     super(id, nombre, apellido);
    //     this.edad = edad;
    //     this.sexo = sexo;
    // }
    constructor(nombre:string, apellido:string, edad:number, dni:number, pais:string, sexo:string){
        super(nombre, apellido, edad)
        this.dni = dni;
        this.pais = pais;
        this.sexo = sexo;
    }
    
    PersonaToString():string {
        
        return "x";    
    }
}