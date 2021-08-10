class Main implements ResponseGet{

    nombre:string;
    mascota: Animal;
    consultasAjax: Consultas;
    //manenjoClick:ManejoClick = new ManejoClick();

    constructor(nombre:string)
    {
        this.nombre = nombre;
        this.mascota = new Animal(0);
        //this.manejoClick = new ManejoClick(this);//eso no lo entendi
        this.consultasAjax = new Consultas();
    }
     
    //para usar un evento en ts, conviene implementar la interfaz EventListenerObject
    public handleEvent(ev:Event):void
    {
        //teniendo el "consultasAjax armado m permite lanzar una consulta"
        this.consultasAjax.ejecutarGet("http://localhost...",this);//te va a pedir un response  
        //es la misma logica c la q funca el handleEvent. genero mi propia interfaz "responseGet",q m da la estructua p generar la funcion
        //entonces cuando llamo al "ejecutarGet" m va a pedir un objeto q cumpla la condicion d q implemente la interfaz. entonces le paso ese "this"
        //q es 1 instancia d esta clase, tons cuando se ejecute el get, lo q vamos a obtener es q se ejecuta el metodo Response q tengo en mi clase
        //main. Entonces en ese caso manejamos la misma estructura 
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
    public response(status:number,response:string)
    {
        if(status==200)
        {
            console.log(response);
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