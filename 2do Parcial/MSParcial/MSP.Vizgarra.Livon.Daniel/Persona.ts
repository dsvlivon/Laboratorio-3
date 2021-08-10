
class Persona{
    public id:number;
    public nombre:string;
    public apellido:string;
    public edad:number;   

    constructor(/*id:number, */nombre:string, apellido:string, edad:number){
        this.edad = edad;
        this.nombre = nombre;
        this.apellido = apellido;
        this.id=0;
    }

    PersonaToString():string{
        return "nombre:"+this.nombre+","+"apellido:"+this.apellido+","+"edad:"+this.edad;
    }
}