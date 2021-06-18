class Gato extends Animal
{
    public vidas:number;
    
    constructor(cantidad:number, vidas:number)
    {
        super(cantidad);
        this.vidas = vidas;
    }

    public queSoy()//aca ya estas sobreescribiendo un metodo d la clase padre "animal"
    {
        console.log("Soy un Gatienzo!");
    }

    getVidas()
    {
        return 7;
    }
}