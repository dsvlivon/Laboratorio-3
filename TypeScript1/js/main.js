"use strict";
var Main = /** @class */ (function () {
    function Main(nombre) {
        this.nombre = nombre;
    }
    //para usar un evento en ts, conviene implementar la interfaz EventListenerObject
    Main.prototype.handleEvent = function (ev) {
        var list = new Array;
        var animal1 = new Animal(4);
        var animal2 = new Perro(3);
        var animal3 = new Gato(4, 9);
        list.push(animal1);
        list.push(animal2);
        list.push(animal3);
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var pet = list_1[_i];
            console.log(pet.queSoy(), pet.cantidadPatas);
        }
    };
    Main.prototype.saludar = function () {
        alert("hola MundoZ!");
        //console.log(this); ojo c usar this d js vs this d ts
    };
    Main.prototype.contar = function () {
        console.log(1 + 2);
    };
    return Main;
}());
window.addEventListener("load", function () {
    //let main: Main = new Main();//al aplicar la interfaz, manejo una instancia del main, entonces puedo por "polimorfismo" instanciarlo como Eventlistener
    var main = new Main("Daniel");
    var btn = document.getElementById("btn");
    btn.addEventListener("click", main); //si le pongo los parentesis estaria como ejecutando la func.
    //main.saludar();
    var btnAnimal = document.getElementById("btnAnimal");
    btnAnimal.addEventListener("click", main);
    //esta ref del main q estoy pasando, como el tipo es EventListener
    //cuando la use, solamente va a ver el metodo handleEvent x la propia polimorfia
});
