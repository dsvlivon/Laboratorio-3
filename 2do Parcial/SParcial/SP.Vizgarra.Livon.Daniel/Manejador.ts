namespace general{

  class Manejador implements EventListenerObject{
  
    public localStorage: Storage;
    public lista: Array<Vehiculo>;

    //public tools: Tools;

    constructor(){
        this.localStorage = window.localStorage;
        this.lista = new Array<Vehiculo>();
        //this.tools = new Tools();
    }
  
    //1.MANEJADOR DE LOS EVENTOS
    public handleEvent(event:Event){
        event.preventDefault();

        let node: Element = <Element>event.target;

        switch(node.id){
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
          // case "Filtrar":
          //   this.FiltrarPorSexo_promesa();
          //   break;
          case "btnPromedio":
            this.CalcularPromedio();
            break;
          //CHECKBOX
          case "chbId":
            this.AgregarATabla(this.lista);
            break;
          case "chbMarca":
            this.AgregarATabla(this.lista);
            break;
          case "chbModelo":
            this.AgregarATabla(this.lista);
            break;
          case "chbPrecio":
            this.AgregarATabla(this.lista);
            break;
          default:
            break;
        }  
    }
    //2.TABLA
    public AgregarATabla(lista: Array<Vehiculo>) :void {
      //2.1-Declaro las variables del obj a guardar     
      var marca: string = '';
      var modelo: string = '';
      var precio: any;
      var id: any;
      var caracteristica: any;
      var tipoVehiculo: string = '';
      //2.2-Recupero los elementos d la tabla
      var tbody: HTMLTableElement = <HTMLTableElement>_gid("tbody");
      var trhead: HTMLTableElement = <HTMLTableElement>_gid("trhead");
      //2.3-Recupero los checkbox
      let chbId = <HTMLInputElement>_gid("chbId");
      let chbMarca = <HTMLInputElement>_gid("chbMarca");
      let chbModelo = <HTMLInputElement>_gid("chbModelo");
      let chbPrecio = <HTMLInputElement>_gid("chbPrecio");
      //2.4-Siempre Limpiar la Lista p q no queden Restos!!!!
      this.LimpiarTabla();
      //2.5-Verifico los "Chb" p ver q "th" crear
      if(chbId.checked) {
        let th1: HTMLTableDataCellElement = <HTMLTableDataCellElement>_cel("th");
        th1.innerText = "Id";
        trhead.appendChild(th1);
      }
      if(chbMarca.checked) {
        let th2: HTMLTableDataCellElement = <HTMLTableDataCellElement>_cel("th");
        th2.innerText = "Marca";
        trhead.appendChild(th2);
      }
      if(chbModelo.checked) {
        let th3: HTMLTableDataCellElement = <HTMLTableDataCellElement>_cel("th");
        th3.innerText = "Modelo";
        trhead.appendChild(th3);
      }
      if(chbPrecio.checked) {
        let th4: HTMLTableDataCellElement = <HTMLTableDataCellElement>_cel("th");
        th4.innerText = "Precio";
        trhead.appendChild(th4);
      }
      //2.6-Estos no pide esconderlos
      let th5: HTMLTableDataCellElement = <HTMLTableDataCellElement>_cel("th");
      th5.innerText = "Sexo";
      trhead.appendChild(th5);

      let th6: HTMLTableDataCellElement = <HTMLTableDataCellElement>_cel("th");
      th6.innerText = "Accion";
      trhead.appendChild(th6);
      //2.7-Iterar la lista y por cada uno
      for (let obj of lista) {
        //2.8-Guardar los datos
        id = obj.id;
        marca: obj.marca;
        modelo=obj.modelo;
        precio=obj.precio;


        if (obj instanceof Auto) {
          tipoVehiculo = "Auto";
          caracteristica = obj.cantidadPuertas;

        }else if (obj instanceof Camioneta) {
          tipoVehiculo = "Camioneta";
          if (!obj.cuatroXcuatro) {
            caracteristica = "No es un 4x4";
          }else {
            caracteristica = "Es 4x4";
          }
        }
        //2.9-Creo los botones d accion necesarios
        let btnEliminar = <HTMLInputElement>_cel('input');
        btnEliminar.type = 'button';
        btnEliminar.className = 'btnEliminar';
        btnEliminar.value = "Eliminar";            
        btnEliminar.onclick = () =>{this.EliminarElemento(lista.indexOf(obj))
        };
        //2.10-Creo el "tr"
        let tr: HTMLTableRowElement = <HTMLTableRowElement>_cel("tr");
        //tr.onclick = () =>{this.CargarForm(lista.indexOf(obj))};
        //2.11-Y ahora creo cada "td" c la info del obj (dependiendo de los "chb")
        if(chbId.checked) {
          let td1: HTMLTableDataCellElement = <HTMLTableDataCellElement>_cel("td");
          let node1 = _txt(id);
          td1.appendChild(node1);
          tr.appendChild(td1);
        }
        if(chbMarca.checked) {
          let td2: HTMLTableDataCellElement = <HTMLTableDataCellElement>_cel("td");
          let node2 = _txt(marca);
          td2.appendChild(node2);
          tr.appendChild(td2);        
        }
        if(chbModelo.checked) {
          let td3: HTMLTableDataCellElement = <HTMLTableDataCellElement>_cel("td");
          let node3 = _txt(modelo);
          td3.appendChild(node3);
          tr.appendChild(td3);
        }
        if(chbPrecio.checked) {
          let td4: HTMLTableDataCellElement = <HTMLTableDataCellElement>_cel("td");
          let node4 = _txt(precio);
          td4.appendChild(node4);
          tr.appendChild(td4);
        }
        //2.12-Estos no pide esconderlos
        let td5: HTMLTableDataCellElement = <HTMLTableDataCellElement>_cel("td");
        let node5 = _txt(tipoVehiculo);
        td5.appendChild(node5);
        tr.appendChild(td5);

        let td7: HTMLTableDataCellElement = <HTMLTableDataCellElement>_cel("td");
        let node7 = _txt(caracteristica);
        td7.appendChild(node7);
        tr.appendChild(td7);


        let td6: HTMLTableDataCellElement = <HTMLTableDataCellElement>_cel("td");
        td6.appendChild(btnEliminar);
        tr.appendChild(td6);

        tbody.appendChild(tr);      
      }
    }
    public LimpiarTabla () {
      var tbody: HTMLTableElement = <HTMLTableElement>_gid("tbody");
      var trhead: HTMLTableElement = <HTMLTableElement>_gid("trhead");

      while (trhead.lastChild) {
        trhead.removeChild(trhead.lastChild);
      }
      while (tbody.lastChild) {
        tbody.removeChild(tbody.lastChild);
      }
    }
    //3.LISTA
    public AgregarElemento() {
      let id = 1; 
      if(this.lista.length != 0)
      {
          let obj = this.lista;
          id = obj.reduce(function (last, i){
              if(i.id >= last) {
                  return i.id + 1;
              }
              return last;
          }, 0);

          if(id == 0){
              id + 1;
          }
      }
      this.PushearElemento(id);
      this.AgregarATabla(this.lista);
      this.displayForm(false);
    }
    public PushearElemento(id:number) {      
      var marca = (<HTMLInputElement>document.getElementById("inputMarca")).value;
      var modelo = (<HTMLInputElement>document.getElementById("inputModelo")).value;
      var precio = (<HTMLInputElement>document.getElementById("inputPrecio")).value;
      var tipoVehiculo = (<HTMLInputElement>document.getElementById("selectTipo")).value;
      var tipoCamioneta = (<HTMLInputElement>document.getElementById("tipoCamioneta")).value;
      var cantPuertas = (<HTMLInputElement>document.getElementById("inputPuertas")).value;

      if (tipoVehiculo === "Auto") {
          let auto: Auto = new Auto(id, marca, modelo, parseInt(precio), parseInt(cantPuertas));
          this.lista.push(auto);
      } else if (tipoVehiculo === "Camioneta") {
          if (tipoCamioneta == "4X4") {
              var camioneta: Camioneta = new Camioneta(id, marca, modelo, parseInt(precio), true);
              this.lista.push(camioneta);
          }
          else {
              var camioneta: Camioneta = new Camioneta(id, marca, modelo, parseInt(precio), false);
              this.lista.push(camioneta);
          }
      }      
    }   
    public EliminarElemento(id:number) {
      this.lista.splice(id , 1);
      this.AgregarATabla(this.lista);
    }
    //FORM 
    public CargarForm(id:number) {
      this.lista[id];
      (<HTMLInputElement>_gid("inputMarca")).value = this.lista[id].marca;
      (<HTMLInputElement>_gid("inputModelo")).value = this.lista[id].modelo;
      (<HTMLInputElement>_gid("inputPrecio")).value = String(this.lista[id].precio);
      
      if(this.lista[id] instanceof Auto) {
        (<HTMLInputElement>_gid("selectTipo")).value = "Auto";
      }
      else {
        (<HTMLInputElement>_gid("selectTipo")).value = "Camioneta";
      }
      this.displayForm(true);
    }
    public displayForm(display:boolean) :void {
        if(display){
          (<HTMLInputElement>_gid("formContainer")).hidden = false;
        }else{
          (<HTMLInputElement>_gid("formContainer")).hidden = true;
        }
    }
    //LOCALSTORAGE
    public LimpiarLocalStorage(){
      this.localStorage.clear();
      this.lista = new Array<Vehiculo>();
      this.LimpiarTabla();
      let promedio = <HTMLInputElement>_gid("promedio");
      promedio.value = ""; 
    }      
    //4.FILTROS
    public FiltrarPorTipo() :void {
      let tipo = (<HTMLInputElement>_gid("Filtrar")).value;
  
      if (tipo == 'Auto') {
          let listaFiltrada = this.lista.filter(vehiculo => vehiculo instanceof Auto);
          this.AgregarATabla(listaFiltrada);
      } else {   
          var listaFiltrada = this.lista.filter(vehiculo => vehiculo instanceof Camioneta);
          this.AgregarATabla(listaFiltrada);
      }
    }
    // public FiltrarPorSexo_promesa() :void {
    //   let tipo = (<HTMLInputElement>_gid("Filtrar")).value;

    //   let promesa = new Promise((resolve:any, reject:any) => {
    //     if (tipo != 'Todos') { resolve() } 
    //     else { reject () }
    //   });
      
    //     promesa.then(() => {
    //       if (tipo == 'Mujer') {
    //         let listaFiltrada = this.lista.filter(obj => obj.sexo == Sexo.Mujer);
    //         this.AgregarATabla(listaFiltrada);
    //       } else if (tipo == 'Hombre') {
    //         let listaFiltrada = this.lista.filter(obj => obj.sexo == Sexo.Hombre);
    //         this.AgregarATabla(listaFiltrada);
    //         }
    //     }).catch(() => {
    //       var listaFiltrada = this.lista;
    //       this.AgregarATabla(listaFiltrada);
    //     });
    // }
    
    public CalcularPromedio() :void {
      let array = new Array();
      let inputPromedio = <HTMLInputElement>_gid("promedio");

      for (let obj of this.lista){
        array.push(obj.precio);
      }

      if(array.length !== 0){
        let auxArray = array,
        promedio = auxArray.reduce(function (sum, value) {
            return sum + value;}, 0) / auxArray.length;
        inputPromedio.value = promedio.toString();

      } else{
        let promedio = 0;
        inputPromedio.value = promedio.toString();
      }
    }  
  //   public CalcularPromedio_promesa() :void {
  //     let array = new Array();
  //     let inputPromedio = <HTMLInputElement>_gid("promedio");
  
  //     for (let obj of this.lista){
  //       array.push(obj.edad);
  //     }
  
  //     let promesa = new Promise((resolve:any, reject:any) => {
  //       if (array.length !== 0) { resolve() }
  //       else { reject () }
  //     });
  
  //     promesa.then(() => {
  //       let auxArray = array, promedio = auxArray.reduce(function (sum, value) {
  //           return sum + value;}, 0) / auxArray.length;
  //       inputPromedio.value = promedio.toString();
  //     }).catch(() => {
  //       let promedio = 0;
  //       inputPromedio.value = promedio.toString();
  //     })
  //   }
  }
  //0.EVENTLISTENER
  window.addEventListener("load", (event) => {
      event.preventDefault();
      //HANDLER
      let handler = new Manejador();
      //BUTTONS      
      let btnAlta = <HTMLElement>_gid("btnAlta");
      btnAlta.addEventListener("click", (event) => handler.handleEvent(event));
      let btnLimpiar = <HTMLElement>_gid("btnLimpiar");
      btnLimpiar.addEventListener("click", (event) => handler.handleEvent(event));
      let btnCerrar = <HTMLElement>_gid("btnCerrar");
      btnCerrar.addEventListener("click", (event) => handler.handleEvent(event));
      let btnAgregar = <HTMLElement>_gid("btnAgregar");
      btnAgregar.addEventListener("click", (event) => handler.handleEvent(event));
      let btnPromedio = <HTMLElement>_gid("btnPromedio");
      btnPromedio.addEventListener("click", (event) => handler.handleEvent(event));
      //FILTER
      let Filtrar = <HTMLElement>_gid("Filtrar");
      Filtrar.addEventListener("change", (event) => handler.handleEvent(event));
      //CHECKBOX
      let chbId = <HTMLElement>_gid("chbId");
      chbId.addEventListener("change", (event) => handler.handleEvent(event));
      let chbMarca = <HTMLElement>_gid("chbMarca");
      chbMarca.addEventListener("change", (event) => handler.handleEvent(event));
      let chbModelo = <HTMLElement>_gid("chbModelo");
      chbModelo.addEventListener("change", (event) => handler.handleEvent(event));
      let chbPrecio = <HTMLElement>_gid("chbPrecio");
      chbPrecio.addEventListener("change", (event) => handler.handleEvent(event));
  });

  function _gid(x:string){
    return document.getElementById(x);
  }    
  function _cel(x:string){
      return document.createElement(x);
  }
  function _txt(x:string){
      return document.createTextNode(x);
  }
  function _gen(x:string){
      return document.getElementsByName(x);
  }
}
  