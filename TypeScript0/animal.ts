class Animal{

    private cantidadPatas:number;

    constructor(cantidadPatas: number)
    {
        this.cantidadPatas = cantidadPatas;
    }

    public queSoy(){
        console.log("soy un animal");

    }

    public setCantidadPatas(cant:number):void{
        this.cantidadPatas = this.cantidadPatas;
    }


    public set asdcantidadPatas(qty: number)
    {
        this.cantidadPatas = qty;
    }

    public get cantidadPataxs()
    {
        return this.cantidadPatas;
    }
}