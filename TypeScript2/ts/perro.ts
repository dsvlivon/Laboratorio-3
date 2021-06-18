class Perro extends Animal{
    
    constructor(cantidad:number)
    {
        super(cantidad);//en vez de ponerle :base, directamente va super(x) p/setear un atributo de clase padre
    }


    public queSoy()//aca ya estas sobreescribiendo un metodo d la clase padre "animal"
    {
        console.log("Soy un Perrichi!");
    }
}