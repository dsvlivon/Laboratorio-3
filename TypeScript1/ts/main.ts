class Main implements EventListenerObject{

    nombre:string;
    mascota: Animal;
    manenjoClick:ManejoClick = new ManejoClick();

    constructor(nombre:string)
    {
        this.nombre = nombre;
        this.mascota = new Animal(0);
    }
     
    //para usar un evento en ts, conviene implementar la interfaz EventListenerObject
    public handleEvent(ev:Event):void
    {
        let event:HTMLElement = <HTMLElement>ev.target;//para q 2 o mas listener ejecuten dif cosas, puedo evaluar el ev q lo genero
     
        console.log(ev.type);//t devuelve un string del type del ev
     
        if(event.id=="btn")
        {
            //console.log(event.textContent);//no le funco...

            let num = <HTMLInputElement>document.getElementById("inputNum"); // ojo q ahi se castea a "HTMLInputElement"... es un elemento mas especifico c otros atributos. simil polimorfismo
            let numerica:number = Number(num.value);//los valores html devueltos siempre van a ser string xq provienen d texto plano
            //apa! el casteo va a la clase Number y no al tipo d dato!!!
            this.mascota.setCantidadPatas(numerica);
        }
        else if(event.id == "btnAnimal")
        {
            this.Mostar();
        }      
        else
        {
            alert("explota!");
        }

    }

    public saludar():void
    {
        alert("hola MundoZ!");
        //console.log(this); ojo c usar this d js vs this d ts
    }

    public Mostar()//al implementarla interfaz estos no los ve
    {
       alert("la mascota tiene: " + this.mascota.getCantidadPatas());
    }

}


window.addEventListener("load",()=>{
    //let main: Main = new Main();//al aplicar la interfaz, manejo una instancia del main, entonces puedo por "polimorfismo" instanciarlo como Eventlistener
    let main: EventListenerObject = new Main("Daniel");

    let btn = <HTMLElement> document.getElementById("btn");
    btn.addEventListener("click", main);//si le pongo los parentesis estaria como ejecutando la func.
    //main.saludar();
    
    let btnMostrar = <HTMLElement> document.getElementById("btnAnimal");
    btnMostrar.addEventListener("click", main);
    //esta ref del main q estoy pasando, como el tipo es EventListener
    //cuando la use, solamente va a ver el metodo handleEvent x la propia polimorfia


    
})