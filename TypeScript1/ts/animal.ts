class Animal
{
    //#region atributos
    private _cantidadPatas:number;
    //#endregion
     

    constructor(cantidadPatas:number)
    {
        this._cantidadPatas = cantidadPatas;
    }
    //#region Get-Set

    //ESTA ES LA FORMA TS PARA FORMAR GETTERS Y SETTERS 
    // public set cantidadPatas(cant:number)
    // {
    //     this._cantidadPatas = cant;
    // }
    // public get cantidadPatas()
    // {
    //     return this._cantidadPatas;
    // }



    //ESTA ES LA FORMA JAVA DE ARMAR METODOS GETTERS Y SETTERS 
    public setCantidadPatas(cant:number):void
    {
        this._cantidadPatas = cant;
    }

    public getCantidadPatas():number
    {
        return this._cantidadPatas;
    }
    
    //#endregion


    //#region Metodos
    public queSoy()
    {
        console.log("Soy un chobi!!!");
    }
    //#endregion


}