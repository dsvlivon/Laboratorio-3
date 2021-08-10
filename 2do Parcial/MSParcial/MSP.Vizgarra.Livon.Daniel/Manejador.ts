namespace general{

  class Manejador implements EventListenerObject{
  
    public localStorage: Storage;
    public lista: Array<Ciudadano>;
    //public tools: Tools;

    constructor(){
        this.localStorage = window.localStorage;
        this.lista = new Array<Ciudadano>();
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
    }
    //2.TABLA
    public AgregarATabla(lista: Array<Ciudadano>) :void {
      //2.1-Declaro las variables del obj a guardar
      var nombre: string = '';
      var apellido: string = '';
      var pais: string = '';
      var edad: any;
      var dni: any;
      var sexo: string = '';
      //2.2-Recupero los elementos d la tabla
      var tbody: HTMLTableElement = <HTMLTableElement>_gid("tbody");
      var trhead: HTMLTableElement = <HTMLTableElement>_gid("trhead");
      //2.3-Recupero los checkbox
      //let chbId = <HTMLInputElement>_gid("chbId");
      let chbNombre = <HTMLInputElement>_gid("chbNombre");
      let chbApellido = <HTMLInputElement>_gid("chbApellido");
      let chbEdad = <HTMLInputElement>_gid("chbEdad");

      
      //2.4-Siempre Limpiar la Lista p q no queden Restos!!!!
      this.LimpiarTabla();
      //2.5-Verifico los "Chb" p ver q "th" crear
      
      // if(chbId.checked) {
      //   let th1: HTMLTableDataCellElement = <HTMLTableDataCellElement>_cel("th");
      //   th1.innerText = "Id";
      //   trhead.appendChild(th1);
      // }
      if(chbNombre.checked) {
        let th2: HTMLTableDataCellElement = <HTMLTableDataCellElement>_cel("th");
        th2.innerText = "Nombre";
        trhead.appendChild(th2);
      }
      if(chbApellido.checked) {
        let th3: HTMLTableDataCellElement = <HTMLTableDataCellElement>_cel("th");
        th3.innerText = "Apellido";
        trhead.appendChild(th3);
      }
      if(chbEdad.checked) {
        let th4: HTMLTableDataCellElement = <HTMLTableDataCellElement>_cel("th");
        th4.innerText = "Edad";
        trhead.appendChild(th4);
      }      
      //2.6-Estos no pide esconderlos
      let th7: HTMLTableDataCellElement = <HTMLTableDataCellElement>_cel("th");
      th7.innerText = "Dni";
      trhead.appendChild(th7);

      let th8: HTMLTableDataCellElement = <HTMLTableDataCellElement>_cel("th");
      th8.innerText = "Pais";
      trhead.appendChild(th8);

      let th5: HTMLTableDataCellElement = <HTMLTableDataCellElement>_cel("th");
      th5.innerText = "Sexo";
      trhead.appendChild(th5);      
      
      let thA: HTMLTableDataCellElement = <HTMLTableDataCellElement>_cel("th");
      thA.innerText = "Accion";
      trhead.appendChild(thA);
      //2.7-Iterar la lista y por cada uno
      for (let obj of lista) {
        //2.8-Guardar los datos
        edad = obj.edad;
        nombre = obj.nombre;
        apellido = obj.apellido;
        pais = obj.pais;
        sexo = obj.sexo;
        dni = obj.dni;
        //si no se instancai el id, lo cargo aca
        obj.id = lista.indexOf(obj);
        //2.9-Creo los botones d accion necesarios
        let btnEliminar = <HTMLInputElement>_cel('input');
        btnEliminar.type = 'button';
        btnEliminar.className = 'btnRojo';
        btnEliminar.value = "Eliminar";            
        btnEliminar.onclick = () =>{this.EliminarElemento(lista.indexOf(obj))};

        let btnModificar = <HTMLInputElement>_cel('input');
        btnModificar.type = 'button';
        btnModificar.className = 'btnAzul';
        btnModificar.value = "Modificar";            
        btnModificar.onclick = () =>{this.ModiicarElemento(obj.id)};

        //2.10-Creo el "tr"
        let tr: HTMLTableRowElement = <HTMLTableRowElement>_cel("tr");
        //tr.onclick = () =>{this.CargarForm(lista.indexOf(obj))}; //ESTE SERIA EL MODIFICAR

        //2.11-Y ahora creo cada "td" c la info del obj (dependiendo de los "chb")
        // if(chbId.checked) {
        //   let td1: HTMLTableDataCellElement = <HTMLTableDataCellElement>_cel("td");
        //   let node1 = _txt(id);
        //   td1.appendChild(node1);
        //   tr.appendChild(td1);
        // }
        if(chbNombre.checked) {
          let td2: HTMLTableDataCellElement = <HTMLTableDataCellElement>_cel("td");
          let node2 = _txt(nombre);
          td2.appendChild(node2);
          tr.appendChild(td2);        
        }
        if(chbApellido.checked) {
          let td3: HTMLTableDataCellElement = <HTMLTableDataCellElement>_cel("td");
          let node3 = _txt(apellido);
          td3.appendChild(node3);
          tr.appendChild(td3);
        }
        if(chbEdad.checked) {
          let td4: HTMLTableDataCellElement = <HTMLTableDataCellElement>_cel("td");
          let node4 = _txt(edad);
          td4.appendChild(node4);
          tr.appendChild(td4);
        }
        //2.12-Estos no pide esconderlos
        let td6: HTMLTableDataCellElement = <HTMLTableDataCellElement>_cel("td");
        let node6 = _txt(dni);
        td6.appendChild(node6);
        tr.appendChild(td6);

        let td7: HTMLTableDataCellElement = <HTMLTableDataCellElement>_cel("td");
        let node7 = _txt(pais);
        td7.appendChild(node7);
        tr.appendChild(td7);

        let td5: HTMLTableDataCellElement = <HTMLTableDataCellElement>_cel("td");
        let node5 = _txt(sexo);
        td5.appendChild(node5);
        tr.appendChild(td5);
        
        let tdA: HTMLTableDataCellElement = <HTMLTableDataCellElement>_cel("td");
        tdA.appendChild(btnEliminar);
        tdA.appendChild(btnModificar);
        tr.appendChild(tdA);

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
      this.MostrarFiltroEdad(true);
      this.displayForm(false);
    }
    public PushearElemento(id:number) { //alert("Pushear");
      var nombre = (<HTMLInputElement>_gid("inputNombre")).value;
      var apellido = (<HTMLInputElement>_gid("inputApellido")).value;
      var edad = (<HTMLInputElement>_gid("inputEdad")).value;
      var dni = (<HTMLInputElement>_gid("inputDni")).value;
      var pais = (<HTMLInputElement>_gid("inputPais")).value;
      var sexo = "";

      const sexos = <NodeListOf<HTMLInputElement>>_gen("sexo")
      for (let index = 0; index < sexos.length; index++) {
          if(sexo == ""){
              let check = sexos[index].checked;
              if(check){
                  sexo = sexos[index].value;
                  break;
              } //asi es escalable y cerrado (solid)
          }
      }
      //constructor(nombre:string, apellido:string, edad:number, dni:number, pais:string, sexo:string){
      let obj: Ciudadano = new Ciudadano(nombre, apellido, parseInt(edad), parseInt(dni), pais, sexo);
      this.lista.push(obj);
      console.log(this.lista);        
    }   
    public EliminarElemento(id:number) {
      this.lista.splice(id , 1);
      this.AgregarATabla(this.lista);
    }
    public MostrarFiltroEdad(display:boolean) :void {
      let select = (<HTMLInputElement>_gid("filtroEdad"));
      if(display){
        select.disabled = false;

        while (select.lastChild) {
          select.removeChild(select.lastChild);
        }  
        
        for(let obj of this.lista){
          let op = <HTMLInputElement>_cel("option");
          op.innerText = (obj.edad).toString();
          select.appendChild(op);
        }
      }else{
        select.disabled = true;
      }
    }
    //FORM 
    public AltaForm(){
      (<HTMLInputElement>_gid("inputNombre")).value = "";
      (<HTMLInputElement>_gid("inputApellido")).value = "";
      (<HTMLInputElement>_gid("inputEdad")).value = "";
      (<HTMLInputElement>_gid("inputDni")).value = "";
      (<HTMLInputElement>_gid("inputPais")).value = "Todos";
      (<HTMLInputElement>_gid("rdbHombre")).checked = false;
      (<HTMLInputElement>_gid("rdbMujer")).checked = false;

      (<HTMLInputElement>_gid("btnAgregar")).hidden = false;
      (<HTMLInputElement>_gid("btnGuardar")).hidden = true;

      this.displayForm(true);
    }
    public CargarForm(id:number) {
      this.lista[id];
      (<HTMLInputElement>_gid("inputNombre")).value = this.lista[id].nombre;
      (<HTMLInputElement>_gid("inputApellido")).value = this.lista[id].apellido;
      (<HTMLInputElement>_gid("inputEdad")).value = String(this.lista[id].edad);
      
      (<HTMLInputElement>_gid("inputDni")).value = String(this.lista[id].dni);
      (<HTMLInputElement>_gid("inputPais")).value = this.lista[id].pais;

      let pais = <HTMLInputElement>_gid("inputPais");
      let hombre = <HTMLInputElement>_gid("rdbHombre");
      let mujer = <HTMLInputElement>_gid("rdbMujer");

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
      this.lista = new Array<Ciudadano>();
      this.LimpiarTabla();
      let promedio = <HTMLInputElement>_gid("promedio");
      promedio.value = ""; 
    }      
    //4.FILTROS
    public FiltrarPorPais():void{//alert("filtrarPais");
      let pais = (<HTMLInputElement>_gid("FiltrarPais")).value; //alert(pais);

      if(pais == "Todos"){
        this.AgregarATabla(this.lista);
      } else{
        var listaFiltrada = this.lista.filter(obj => {return obj.pais == pais;})
        this.AgregarATabla(listaFiltrada);
      }
    }

    public FiltrarPorSexo() :void {
      let tipo = (<HTMLInputElement>_gid("Filtrar")).value;

      if (tipo == "Mujer") {
          let listaFiltrada = this.lista.filter(obj => obj.sexo == "Mujer");
          this.AgregarATabla(listaFiltrada);
      } else if (tipo == "Hombre") {   
          var listaFiltrada = this.lista.filter(obj => obj.sexo == "Hombre");
          this.AgregarATabla(listaFiltrada);
      } else {
        var listaFiltrada = this.lista;
        this.AgregarATabla(listaFiltrada);
      }
    }
    public FiltrarPorSexo_promesa() :void {
      let tipo = (<HTMLInputElement>_gid("Filtrar")).value;

      let promesa = new Promise((resolve:any, reject:any) => {
        if (tipo != 'Todos') { resolve() } 
        else { reject () }
      });
      
        promesa.then(() => {
          if (tipo == 'Mujer') {
            let listaFiltrada = this.lista.filter(obj => obj.sexo == "Mujer");
            this.AgregarATabla(listaFiltrada);
          } else if (tipo == 'Hombre') {
            let listaFiltrada = this.lista.filter(obj => obj.sexo == "Hombre");
            this.AgregarATabla(listaFiltrada);
            }
        }).catch(() => {
          var listaFiltrada = this.lista;
          this.AgregarATabla(listaFiltrada);
        });
    }
    
    public FiltrarPorEdadYSexo() :void { //alert("FiltrarPorEdadYSexo");
      let sexo = (<HTMLInputElement>_gid("Filtrar")).value; 
      let edad = (<HTMLInputElement>_gid("filtroEdad")).value; 
      let listaFiltrada:Array<Ciudadano>;
      
      if (sexo == "Mujer") {
        listaFiltrada = this.lista.filter(obj => obj.sexo == "Mujer");
      } else if (sexo == "Hombre") { //alert("entro");
        listaFiltrada = this.lista.filter(obj => obj.sexo == "Hombre");
      } else {
        listaFiltrada = this.lista;
      }
        listaFiltrada = this.lista.filter(obj => obj.edad == parseInt(edad));
        this.AgregarATabla(listaFiltrada);
    }

    public CalcularPromedioPorSexo() :void { //alert("CalcularPromedioPorSexo");
      let tipo = (<HTMLInputElement>_gid("Filtrar")).value;
      let listaFiltrada:Array<Ciudadano>;

      if (tipo == "Mujer") {
          listaFiltrada = this.lista.filter(obj => obj.sexo == "Mujer");
          this.AgregarATabla(listaFiltrada);
      } else if (tipo == "Hombre") {   
          listaFiltrada = this.lista.filter(obj => obj.sexo == "Hombre");
          this.AgregarATabla(listaFiltrada);
      } else {
        listaFiltrada = this.lista;
        this.AgregarATabla(listaFiltrada);
      }
      /////////////////////////////////////////////////////////
      let array = new Array();
      let inputPromedio = <HTMLInputElement>_gid("promedioSexo");

      for (let obj of listaFiltrada){
        array.push(obj.edad);
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

    public CalcularPromedio() :void {
      let array = new Array();
      let inputPromedio = <HTMLInputElement>_gid("promedio");

      for (let obj of this.lista){
        array.push(obj.edad);
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
    public CalcularPromedio_promesa() :void {
      let array = new Array();
      let inputPromedio = <HTMLInputElement>_gid("promedio");
  
      for (let obj of this.lista){
        array.push(obj.edad);
      }
  
      let promesa = new Promise((resolve:any, reject:any) => {
        if (array.length !== 0) { resolve() }
        else { reject () }
      });
  
      promesa.then(() => {
        let auxArray = array, promedio = auxArray.reduce(function (sum, value) {
            return sum + value;}, 0) / auxArray.length;
        inputPromedio.value = promedio.toString();
      }).catch(() => {
        let promedio = 0;
        inputPromedio.value = promedio.toString();
      })
    }
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
      let btnPromedioSexo = <HTMLElement>_gid("btnPromedioSexo");
      btnPromedioSexo.addEventListener("click", (event) => handler.handleEvent(event));
      //FILTER
      let Filtrar = <HTMLElement>_gid("Filtrar");
      Filtrar.addEventListener("change", (event) => handler.handleEvent(event));
      let FiltrarPais = <HTMLElement>_gid("FiltrarPais");
      FiltrarPais.addEventListener("change", (event) => handler.handleEvent(event));
      let filtroEdad = <HTMLInputElement>_gid("filtroEdad");
      filtroEdad.addEventListener("change",(event) => handler.handleEvent(event));
      //CHECKBOX
      let chbNombre = <HTMLElement>_gid("chbNombre");
      chbNombre.addEventListener("change", (event) => handler.handleEvent(event));
      let chbApellido = <HTMLElement>_gid("chbApellido");
      chbApellido.addEventListener("change", (event) => handler.handleEvent(event));
      let chbEdad = <HTMLElement>_gid("chbEdad");
      chbEdad.addEventListener("change", (event) => handler.handleEvent(event));
      // let chbId = <HTMLElement>_gid("chbId");
      // chbId.addEventListener("change", (event) => handler.handleEvent(event));
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
  