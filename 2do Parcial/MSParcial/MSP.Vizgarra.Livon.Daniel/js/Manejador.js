"use strict";
var general;
(function (general) {
    var Manejador = /** @class */ (function () {
        //public tools: Tools;
        function Manejador() {
            this.localStorage = window.localStorage;
            this.lista = new Array();
            //this.tools = new Tools();
        }
        //1.MANEJADOR DE LOS EVENTOS
        Manejador.prototype.handleEvent = function (event) {
            event.preventDefault();
            var node = event.target;
            switch (node.id) {
                case "btnAlta":
                    this.displayForm(true);
                    break;
                case "btnLimpiar":
                    this.LimpiarLocalStorage();
                    break;
                case "btnCerrar":
                    this.displayForm(false);
                    break;
                case "btnAgregar":
                    this.AgregarElemento();
                    break;
                //FILTROS
                case "Filtrar":
                    this.FiltrarPorSexo();
                    break;
                case "FiltrarPais":
                    this.FiltrarPorPais();
                    break;
                case "btnPromedio":
                    this.CalcularPromedio();
                    break;
                case "btnPromedioSexo":
                    this.CalcularPromedioPorSexo();
                    break;
                case "filtroEdad":
                    this.FiltrarPorEdadYSexo();
                //CHECKBOX
                // case "chbId":
                //   this.AgregarATabla(this.lista);
                //   break;
                case "chbNombre":
                    this.AgregarATabla(this.lista);
                    break;
                case "chbApellido":
                    this.AgregarATabla(this.lista);
                    break;
                case "chbEdad":
                    this.AgregarATabla(this.lista);
                    break;
                default:
                    break;
            }
        };
        //2.TABLA
        Manejador.prototype.AgregarATabla = function (lista) {
            var _this = this;
            //2.1-Declaro las variables del obj a guardar
            var nombre = '';
            var apellido = '';
            var pais = '';
            var edad;
            var dni;
            var sexo = '';
            //2.2-Recupero los elementos d la tabla
            var tbody = _gid("tbody");
            var trhead = _gid("trhead");
            //2.3-Recupero los checkbox
            //let chbId = <HTMLInputElement>_gid("chbId");
            var chbNombre = _gid("chbNombre");
            var chbApellido = _gid("chbApellido");
            var chbEdad = _gid("chbEdad");
            //2.4-Siempre Limpiar la Lista p q no queden Restos!!!!
            this.LimpiarTabla();
            //2.5-Verifico los "Chb" p ver q "th" crear
            // if(chbId.checked) {
            //   let th1: HTMLTableDataCellElement = <HTMLTableDataCellElement>_cel("th");
            //   th1.innerText = "Id";
            //   trhead.appendChild(th1);
            // }
            if (chbNombre.checked) {
                var th2 = _cel("th");
                th2.innerText = "Nombre";
                trhead.appendChild(th2);
            }
            if (chbApellido.checked) {
                var th3 = _cel("th");
                th3.innerText = "Apellido";
                trhead.appendChild(th3);
            }
            if (chbEdad.checked) {
                var th4 = _cel("th");
                th4.innerText = "Edad";
                trhead.appendChild(th4);
            }
            //2.6-Estos no pide esconderlos
            var th7 = _cel("th");
            th7.innerText = "Dni";
            trhead.appendChild(th7);
            var th8 = _cel("th");
            th8.innerText = "Pais";
            trhead.appendChild(th8);
            var th5 = _cel("th");
            th5.innerText = "Sexo";
            trhead.appendChild(th5);
            var thA = _cel("th");
            thA.innerText = "Accion";
            trhead.appendChild(thA);
            var _loop_1 = function (obj) {
                //2.8-Guardar los datos
                edad = obj.edad;
                nombre = obj.nombre;
                apellido = obj.apellido;
                pais = obj.pais;
                sexo = obj.sexo;
                dni = obj.dni;
                //2.9-Creo los botones d accion necesarios
                var btnEliminar = _cel('input');
                btnEliminar.type = 'button';
                btnEliminar.className = 'btnRojo';
                btnEliminar.value = "Eliminar";
                btnEliminar.onclick = function () { _this.EliminarElemento(lista.indexOf(obj)); };
                var btnModificar = _cel('input');
                btnModificar.type = 'button';
                btnModificar.className = 'btnAzul';
                btnModificar.value = "Modificar";
                btnModificar.onclick = function () { _this.CargarForm(lista.indexOf(obj)); };
                //2.10-Creo el "tr"
                var tr = _cel("tr");
                //tr.onclick = () =>{this.CargarForm(lista.indexOf(obj))}; //ESTE SERIA EL MODIFICAR
                //2.11-Y ahora creo cada "td" c la info del obj (dependiendo de los "chb")
                // if(chbId.checked) {
                //   let td1: HTMLTableDataCellElement = <HTMLTableDataCellElement>_cel("td");
                //   let node1 = _txt(id);
                //   td1.appendChild(node1);
                //   tr.appendChild(td1);
                // }
                if (chbNombre.checked) {
                    var td2 = _cel("td");
                    var node2 = _txt(nombre);
                    td2.appendChild(node2);
                    tr.appendChild(td2);
                }
                if (chbApellido.checked) {
                    var td3 = _cel("td");
                    var node3 = _txt(apellido);
                    td3.appendChild(node3);
                    tr.appendChild(td3);
                }
                if (chbEdad.checked) {
                    var td4 = _cel("td");
                    var node4 = _txt(edad);
                    td4.appendChild(node4);
                    tr.appendChild(td4);
                }
                //2.12-Estos no pide esconderlos
                var td6 = _cel("td");
                var node6 = _txt(dni);
                td6.appendChild(node6);
                tr.appendChild(td6);
                var td7 = _cel("td");
                var node7 = _txt(pais);
                td7.appendChild(node7);
                tr.appendChild(td7);
                var td5 = _cel("td");
                var node5 = _txt(sexo);
                td5.appendChild(node5);
                tr.appendChild(td5);
                var tdA = _cel("td");
                tdA.appendChild(btnEliminar);
                tdA.appendChild(btnModificar);
                tr.appendChild(tdA);
                tbody.appendChild(tr);
            };
            //2.7-Iterar la lista y por cada uno
            for (var _i = 0, lista_1 = lista; _i < lista_1.length; _i++) {
                var obj = lista_1[_i];
                _loop_1(obj);
            }
        };
        Manejador.prototype.LimpiarTabla = function () {
            var tbody = _gid("tbody");
            var trhead = _gid("trhead");
            while (trhead.lastChild) {
                trhead.removeChild(trhead.lastChild);
            }
            while (tbody.lastChild) {
                tbody.removeChild(tbody.lastChild);
            }
        };
        //3.LISTA
        Manejador.prototype.AgregarElemento = function () {
            var id = 1;
            if (this.lista.length != 0) {
                var obj = this.lista;
                id = obj.reduce(function (last, i) {
                    if (i.id >= last) {
                        return i.id + 1;
                    }
                    return last;
                }, 0);
                if (id == 0) {
                    id + 1;
                }
            }
            this.PushearElemento(id);
            this.AgregarATabla(this.lista);
            this.MostrarFiltroEdad(true);
            this.displayForm(false);
        };
        Manejador.prototype.PushearElemento = function (id) {
            var nombre = _gid("inputNombre").value;
            var apellido = _gid("inputApellido").value;
            var edad = _gid("inputEdad").value;
            var dni = _gid("inputDni").value;
            var pais = _gid("inputPais").value;
            var sexo = "";
            var sexos = _gen("sexo");
            for (var index = 0; index < sexos.length; index++) {
                if (sexo == "") {
                    var check = sexos[index].checked;
                    if (check) {
                        sexo = sexos[index].value;
                        break;
                    } //asi es escalable y cerrado (solid)
                }
            }
            //constructor(nombre:string, apellido:string, edad:number, dni:number, pais:string, sexo:string){
            var obj = new Ciudadano(nombre, apellido, parseInt(edad), parseInt(dni), pais, sexo);
            this.lista.push(obj);
            console.log(this.lista);
        };
        Manejador.prototype.EliminarElemento = function (id) {
            this.lista.splice(id, 1);
            this.AgregarATabla(this.lista);
        };
        Manejador.prototype.MostrarFiltroEdad = function (display) {
            var select = _gid("filtroEdad");
            if (display) {
                select.disabled = false;
                while (select.lastChild) {
                    select.removeChild(select.lastChild);
                }
                for (var _i = 0, _a = this.lista; _i < _a.length; _i++) {
                    var obj = _a[_i];
                    var op = _cel("option");
                    op.innerText = (obj.edad).toString();
                    select.appendChild(op);
                }
            }
            else {
                select.disabled = true;
            }
        };
        //FORM 
        Manejador.prototype.CargarForm = function (id) {
            this.lista[id];
            _gid("inputNombre").value = this.lista[id].nombre;
            _gid("inputApellido").value = this.lista[id].apellido;
            _gid("inputEdad").value = String(this.lista[id].edad);
            _gid("inputDni").value = String(this.lista[id].dni);
            _gid("inputPais").value = this.lista[id].pais;
            var pais = _gid("inputPais");
            var hombre = _gid("rdbHombre");
            var mujer = _gid("rdbMujer");
            this.displayForm(true);
        };
        Manejador.prototype.displayForm = function (display) {
            if (display) {
                _gid("formContainer").hidden = false;
            }
            else {
                _gid("formContainer").hidden = true;
            }
        };
        //LOCALSTORAGE
        Manejador.prototype.LimpiarLocalStorage = function () {
            this.localStorage.clear();
            this.lista = new Array();
            this.LimpiarTabla();
            var promedio = _gid("promedio");
            promedio.value = "";
        };
        //4.FILTROS
        Manejador.prototype.FiltrarPorPais = function () {
            var pais = _gid("FiltrarPais").value; //alert(pais);
            if (pais == "Todos") {
                this.AgregarATabla(this.lista);
            }
            else {
                var listaFiltrada = this.lista.filter(function (obj) { return obj.pais == pais; });
                this.AgregarATabla(listaFiltrada);
            }
        };
        Manejador.prototype.FiltrarPorSexo = function () {
            var tipo = _gid("Filtrar").value;
            if (tipo == "Mujer") {
                var listaFiltrada_1 = this.lista.filter(function (obj) { return obj.sexo == "Mujer"; });
                this.AgregarATabla(listaFiltrada_1);
            }
            else if (tipo == "Hombre") {
                var listaFiltrada = this.lista.filter(function (obj) { return obj.sexo == "Hombre"; });
                this.AgregarATabla(listaFiltrada);
            }
            else {
                var listaFiltrada = this.lista;
                this.AgregarATabla(listaFiltrada);
            }
        };
        Manejador.prototype.FiltrarPorSexo_promesa = function () {
            var _this = this;
            var tipo = _gid("Filtrar").value;
            var promesa = new Promise(function (resolve, reject) {
                if (tipo != 'Todos') {
                    resolve();
                }
                else {
                    reject();
                }
            });
            promesa.then(function () {
                if (tipo == 'Mujer') {
                    var listaFiltrada = _this.lista.filter(function (obj) { return obj.sexo == "Mujer"; });
                    _this.AgregarATabla(listaFiltrada);
                }
                else if (tipo == 'Hombre') {
                    var listaFiltrada = _this.lista.filter(function (obj) { return obj.sexo == "Hombre"; });
                    _this.AgregarATabla(listaFiltrada);
                }
            }).catch(function () {
                var listaFiltrada = _this.lista;
                _this.AgregarATabla(listaFiltrada);
            });
        };
        Manejador.prototype.FiltrarPorEdadYSexo = function () {
            var sexo = _gid("Filtrar").value;
            var edad = _gid("filtroEdad").value;
            var listaFiltrada;
            if (sexo == "Mujer") {
                listaFiltrada = this.lista.filter(function (obj) { return obj.sexo == "Mujer"; });
            }
            else if (sexo == "Hombre") { //alert("entro");
                listaFiltrada = this.lista.filter(function (obj) { return obj.sexo == "Hombre"; });
            }
            else {
                listaFiltrada = this.lista;
            }
            listaFiltrada = this.lista.filter(function (obj) { return obj.edad == parseInt(edad); });
            this.AgregarATabla(listaFiltrada);
        };
        Manejador.prototype.CalcularPromedioPorSexo = function () {
            var tipo = _gid("Filtrar").value;
            var listaFiltrada;
            if (tipo == "Mujer") {
                listaFiltrada = this.lista.filter(function (obj) { return obj.sexo == "Mujer"; });
                this.AgregarATabla(listaFiltrada);
            }
            else if (tipo == "Hombre") {
                listaFiltrada = this.lista.filter(function (obj) { return obj.sexo == "Hombre"; });
                this.AgregarATabla(listaFiltrada);
            }
            else {
                listaFiltrada = this.lista;
                this.AgregarATabla(listaFiltrada);
            }
            /////////////////////////////////////////////////////////
            var array = new Array();
            var inputPromedio = _gid("promedioSexo");
            for (var _i = 0, listaFiltrada_2 = listaFiltrada; _i < listaFiltrada_2.length; _i++) {
                var obj = listaFiltrada_2[_i];
                array.push(obj.edad);
            }
            if (array.length !== 0) {
                var auxArray = array, promedio = auxArray.reduce(function (sum, value) {
                    return sum + value;
                }, 0) / auxArray.length;
                inputPromedio.value = promedio.toString();
            }
            else {
                var promedio = 0;
                inputPromedio.value = promedio.toString();
            }
        };
        Manejador.prototype.CalcularPromedio = function () {
            var array = new Array();
            var inputPromedio = _gid("promedio");
            for (var _i = 0, _a = this.lista; _i < _a.length; _i++) {
                var obj = _a[_i];
                array.push(obj.edad);
            }
            if (array.length !== 0) {
                var auxArray = array, promedio = auxArray.reduce(function (sum, value) {
                    return sum + value;
                }, 0) / auxArray.length;
                inputPromedio.value = promedio.toString();
            }
            else {
                var promedio = 0;
                inputPromedio.value = promedio.toString();
            }
        };
        Manejador.prototype.CalcularPromedio_promesa = function () {
            var array = new Array();
            var inputPromedio = _gid("promedio");
            for (var _i = 0, _a = this.lista; _i < _a.length; _i++) {
                var obj = _a[_i];
                array.push(obj.edad);
            }
            var promesa = new Promise(function (resolve, reject) {
                if (array.length !== 0) {
                    resolve();
                }
                else {
                    reject();
                }
            });
            promesa.then(function () {
                var auxArray = array, promedio = auxArray.reduce(function (sum, value) {
                    return sum + value;
                }, 0) / auxArray.length;
                inputPromedio.value = promedio.toString();
            }).catch(function () {
                var promedio = 0;
                inputPromedio.value = promedio.toString();
            });
        };
        return Manejador;
    }());
    //0.EVENTLISTENER
    window.addEventListener("load", function (event) {
        event.preventDefault();
        //HANDLER
        var handler = new Manejador();
        //BUTTONS      
        var btnAlta = _gid("btnAlta");
        btnAlta.addEventListener("click", function (event) { return handler.handleEvent(event); });
        var btnLimpiar = _gid("btnLimpiar");
        btnLimpiar.addEventListener("click", function (event) { return handler.handleEvent(event); });
        var btnCerrar = _gid("btnCerrar");
        btnCerrar.addEventListener("click", function (event) { return handler.handleEvent(event); });
        var btnAgregar = _gid("btnAgregar");
        btnAgregar.addEventListener("click", function (event) { return handler.handleEvent(event); });
        var btnPromedio = _gid("btnPromedio");
        btnPromedio.addEventListener("click", function (event) { return handler.handleEvent(event); });
        var btnPromedioSexo = _gid("btnPromedioSexo");
        btnPromedioSexo.addEventListener("click", function (event) { return handler.handleEvent(event); });
        //FILTER
        var Filtrar = _gid("Filtrar");
        Filtrar.addEventListener("change", function (event) { return handler.handleEvent(event); });
        var FiltrarPais = _gid("FiltrarPais");
        FiltrarPais.addEventListener("change", function (event) { return handler.handleEvent(event); });
        var filtroEdad = _gid("filtroEdad");
        filtroEdad.addEventListener("change", function (event) { return handler.handleEvent(event); });
        //CHECKBOX
        var chbNombre = _gid("chbNombre");
        chbNombre.addEventListener("change", function (event) { return handler.handleEvent(event); });
        var chbApellido = _gid("chbApellido");
        chbApellido.addEventListener("change", function (event) { return handler.handleEvent(event); });
        var chbEdad = _gid("chbEdad");
        chbEdad.addEventListener("change", function (event) { return handler.handleEvent(event); });
        // let chbId = <HTMLElement>_gid("chbId");
        // chbId.addEventListener("change", (event) => handler.handleEvent(event));
    });
    function _gid(x) {
        return document.getElementById(x);
    }
    function _cel(x) {
        return document.createElement(x);
    }
    function _txt(x) {
        return document.createTextNode(x);
    }
    function _gen(x) {
        return document.getElementsByName(x);
    }
})(general || (general = {}));
//# sourceMappingURL=Manejador.js.map