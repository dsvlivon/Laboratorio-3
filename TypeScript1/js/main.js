"use strict";
var Main = /** @class */ (function () {
    function Main(nombre) {
        this.manenjoClick = new ManejoClick();
        this.nombre = nombre;
        this.mascota = new Animal(0);
    }
    //para usar un evento en ts, conviene implementar la interfaz EventListenerObject
    Main.prototype.handleEvent = function (ev) {
        var event = ev.target; //para q 2 o mas listener ejecuten dif cosas, puedo evaluar el ev q lo genero
        console.log(ev.type); //t devuelve un string del type del ev
        if (event.id == "btn") {
            //console.log(event.textContent);//no le funco...
            var num = document.getElementById("inputNum"); // ojo q ahi se castea a "HTMLInputElement"... es un elemento mas especifico c otros atributos. simil polimorfismo
            var numerica = Number(num.value); //los valores html devueltos siempre van a ser string xq provienen d texto plano
            //apa! el casteo va a la clase Number y no al tipo d dato!!!
            this.mascota.setCantidadPatas(numerica);
        }
        else if (event.id == "btnAnimal") {
            this.Mostar();
        }
        else {
            alert("explota!");
        }
    };
    Main.prototype.saludar = function () {
        alert("hola MundoZ!");
        //console.log(this); ojo c usar this d js vs this d ts
    };
    Main.prototype.Mostar = function () {
        alert("la mascota tiene: " + this.mascota.getCantidadPatas());
    };
    return Main;
}());
window.addEventListener("load", function () {
    //let main: Main = new Main();//al aplicar la interfaz, manejo una instancia del main, entonces puedo por "polimorfismo" instanciarlo como Eventlistener
    var main = new Main("Daniel");
    var btn = document.getElementById("btn");
    btn.addEventListener("click", main); //si le pongo los parentesis estaria como ejecutando la func.
    //main.saludar();
    var btnMostrar = document.getElementById("btnAnimal");
    btnMostrar.addEventListener("click", main);
    //esta ref del main q estoy pasando, como el tipo es EventListener
    //cuando la use, solamente va a ver el metodo handleEvent x la propia polimorfia
});
