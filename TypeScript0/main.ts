class Main implements EventListenerObject
{
    public handleEvent(ev:Event):void{
        
        let input = <HTMLInputElement>document.getElementById("btnX");
        let num:number = Number(input.value);//este casteo es x tipo d clase. "Number" es una clase tipada  dsd TS para js
        this.animal.setCantidadPatas(num);


    


        this.mostrar();
    }
    public mostrar()
    {
        console.log(1+2);
    }
    
    public saludar()
    {
        console.log("HOlax");
    }
}

//aca abajo estoy en el main.ks
window.addEventListener("load",()=>{
    let main: Main = new Main();//let p variables locales y var para globales
    main.saludar();
    

    let btn = <HTMLElement>document.getElementById("btn");
    btn.addEventListener("click",main.saludar);
    //alert("hola mundo!");
})


