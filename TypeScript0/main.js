"use strict";
var Main = /** @class */ (function () {
    function Main() {
    }
    Main.prototype.handleEvent = function (ev) {
        var input = document.getElementById("btnX");
        var num = Number(input.value); //este casteo es x tipo d clase. "Number" es una clase tipada  dsd TS para js
        this.animal.setCantidadPatas(num);
        this.mostrar();
    };
    Main.prototype.mostrar = function () {
        console.log(1 + 2);
    };
    Main.prototype.saludar = function () {
        console.log("HOlax");
    };
    return Main;
}());
//aca abajo estoy en el main.ks
window.addEventListener("load", function () {
    var main = new Main(); //let p variables locales y var para globales
    main.saludar();
    var btn = document.getElementById("btn");
    btn.addEventListener("click", main.saludar);
    //alert("hola mundo!");
});
