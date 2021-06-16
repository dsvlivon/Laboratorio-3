class Main implements EventListenerObject{

    nombre:string;

    constructor(nombre:string)
    {
        this.nombre = nombre;
    }
     
    //para usar un evento en ts, conviene implementar la interfaz EventListenerObject
    public handleEvent(ev:Event):void
    {
        let list:Array<Animal> = new Array;
        let animal1: Animal = new Animal(4);
        let animal2: Perro = new Perro(3);
        let animal3: Gato = new Gato(4,9);

        list.push(animal1);
        list.push(animal2);
        list.push(animal3);

        for(let pet of list)
        {
            console.log(pet.queSoy(), pet.cantidadPatas);
        }
    }

    public saludar():void
    {
        alert("hola MundoZ!");
        //console.log(this); ojo c usar this d js vs this d ts
    }

    public contar()//al implementarla interfaz estos no los ve
    {
        console.log(1+2);
    }

}


window.addEventListener("load",()=>{
    //let main: Main = new Main();//al aplicar la interfaz, manejo una instancia del main, entonces puedo por "polimorfismo" instanciarlo como Eventlistener
    let main: EventListenerObject = new Main("Daniel");
    let btn = <HTMLElement> document.getElementById("btn");
    btn.addEventListener("click", main);//si le pongo los parentesis estaria como ejecutando la func.
    //main.saludar();
    
    let btnAnimal = <HTMLElement> document.getElementById("btnAnimal");
    btnAnimal.addEventListener("click", main);
    //esta ref del main q estoy pasando, como el tipo es EventListener
    //cuando la use, solamente va a ver el metodo handleEvent x la propia polimorfia


    
})