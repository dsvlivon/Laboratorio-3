window.addEventListener("load",function(){
   
    var btn = Gid("btnAgregar");
    btn.addEventListener("click",cargarDatos)
    
    PeticionGET();
})

function PeticionGET() 
{
    var peticionHttp = new XMLHttpRequest();

    peticionHttp.onreadystatechange = function()
    {
        if(peticionHttp.readyState == 4){
            if(peticionHttp.status == 200){
                //alert("reach Control 1");
                let array = JSON.parse(peticionHttp.responseText);
                crearTabla(array);
            }}}
            peticionHttp.open("GET","http://localhost:3000/materias");
            peticionHttp.send();
}
        
function crearTabla(array) 
{//alert("reach Control 2");
    
    var div = Gid("divTabla");
    var tabla = Create("table");
    div.appendChild(tabla);
    
    let arrayKey = Object.keys(array[0]);
    arrayKey= arrayKey.slice(1);
    let thead = Create("thead");
    
    let tr = Create("tr");
    thead.appendChild(tr);
    tabla.appendChild(thead);
    
    arrayKey.forEach(element => 
    {
        let th = Create("th");
        th.innerHTML = element;
        tr.appendChild(th);
    });
    array.forEach(element => 
    {
        var td1 = Create("td");
        td1.appendChild(Text(element.nombre));
        
        var td2 = Create("td");
        td2.appendChild(Text(element.cuatrimestre));

        var td3 = Create("td");
        td3.appendChild(Text(element.fechaFinal));

        var td4 = Create("td");
        td4.appendChild(Text(element.turno));

        var tr = Create("tr");
        tr.addEventListener("dblclick",capturarFila);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        tabla.appendChild(tr);
        tabla.id = "MiTabla";
    });
}

function capturarFila(e)
{//alert("reach Control 3");
    var tr = e.target.parentNode;
    
    form = Gid("form");
    form.hidden = false;
    let btn = Gid("btnOk");
    btn.hidden = true;    
    
    Gid("txtId").value = tr.rowIndex;
    
    Gid("txtNombre").value = tr.childNodes[0].innerHTML;
   
    let cuatrimestre = tr.childNodes[1].innerHTML;
    switch (cuatrimestre) 
    {
        case "1":
            Gid("txtCuatrimestre").options[0].selected = true;
            Gid("txtCuatrimestre").options[0].disabled=true;           
            break;
        case "2":
            Gid("txtCuatrimestre").options[1].selected=true;
            Gid("txtCuatrimestre").options[1].disabled=true;        
            break;
        case "3":
            Gid("txtCuatrimestre").options[2].selected=true;
            Gid("txtCuatrimestre").options[2].disabled=true;
            break;
        case "4":
            Gid("txtCuatrimestre").options[3].selected=true;
            Gid("txtCuatrimestre").options[3].disabled=true;
            break;
        default:
            break;
    }
    Gid("txtCuatrimestre").disabled=true;
    
    let fecha = tr.childNodes[2].innerHTML;
    let array = fecha.split("/");
    Gid("dteFecha").value = array[2] + "-" + array[1] + "-" + array[0];

    let turno = tr.childNodes[3].innerHTML;
    if(turno == "Noche"){
        Gid("tn").checked=true;
    }
    else{
        Gid("tm").checked=true;
    }

    let btnModificar = Gid("btnModificar");
    btnModificar.addEventListener("click", Modificar);
    btnModificar.hidden = false;

    let btnBaja = Gid("btnBaja");
    btnBaja.addEventListener("click", Baja);
    btnBaja.hidden = false;
}   

function Modificar(e)
{//alert("reach Control 4");
    var tr = e.target;//x ahora no lo uso

    let id = Gid("txtId").value;
    let nombre = validarNombre(Gid("txtNombre").value);
    let cuatrimestre = Gid("txtCuatrimestre").value;
    let turno = validarTurno();
    let fecha = validarFecha(Gid("dteFecha").value);
    
    if(fecha != false && nombre != false)
    {
        let obj = {'id': id, 'nombre': nombre,'cuatrimestre': cuatrimestre ,'fechaFinal': fecha ,'turno':turno};
        POSTeditObjeto(obj);  
    } 
    else
    {
        Cerrar();
    }
}

function Baja(e) 
{//alert("reach Control 4");
    var tr = e.target;//x ahora no lo uso

    let id = Gid("txtId").value;
    let nombre = Gid("txtNombre").value;
    let cuatrimestre = Gid("txtCuatrimestre").value;
    let turno = validarTurno();
    let fecha = Gid("dteFecha").value;
    
    let obj = {'id': id, 'nombre': nombre,'cuatrimestre': cuatrimestre ,'fechaFinal': fecha ,'turno':turno};
    POSTdeleteObjeto(obj);  
}

function cargarDatos(e) 
{//alert("reach control 4");
    let form = Gid("form");
    form.hidden = false;    

    let btnModificar = Gid("btnModificar");
    btnModificar.hidden = true;
    
    let btnBaja = Gid("btnBaja");
    btnBaja.hidden = true;

    Gid("txtId").value = "";
    Gid("txtNombre").value = "";
    Gid("txtCuatrimestre").options[0].disabled=true;
    Gid("txtCuatrimestre").options[1].disabled=true;
    Gid("txtCuatrimestre").options[2].disabled=true;    
    Gid("txtCuatrimestre").options[3].disabled=true;
    Gid("tn").checked = false;
    Gid("tm").checked = false;
    Gid("dteFecha").value = "";
    
    let btnOk = Gid("btnOk");
    btnOk.hidden = false;
    btnOk.addEventListener("click", Alta);
}

function Alta(e) 
{alert("reach control 4");
    let form = Gid("form");
    form.hidden = false;
    
    let id = Gid("txtId").value;
    let nombre = validarNombre(Gid("txtNombre").value);
    let cuatrimestre = Gid("txtCuatrimestre").value;
    let turno = validarTurno();
    let fecha = validarFecha(Gid("dteFecha").value);
    
    if(fecha != false && nombre != false)
    {
        let obj = {'id': id, 'nombre': nombre,'cuatrimestre': cuatrimestre ,'fechaFinal': fecha ,'turno':turno};
        POSTaddObjeto(obj);  
    } 
    else
    {
        Cerrar();
    }
}

function POSTaddObjeto(obj) 
{//alert("reach Control 5");
    var peticionHttp = new XMLHttpRequest();
    Gid("spinner").hidden = false;
    peticionHttp.onreadystatechange = function(){
        if(peticionHttp.readyState == 4){
            if(peticionHttp.status == 200){  
                var tabla = Gid("MiTabla");  
                
                var td1 = Create("td");
                td1.appendChild(Text(obj.nombre));
                
                var td2 = Create("td");
                td2.appendChild(Text(obj.cuatrimestre));

                var td3 = Create("td");
                td3.appendChild(Text(obj.fechaFinal));
                
                var td4 = Create("td");
                td4.appendChild(Text(obj.turno));
                
                var tr = Create("tr");
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);

                tabla.appendChild(tr);
                tabla.id="MiTabla";
                Gid("spinner").hidden = true;
                Gid("form").hidden = true;
            }
        }
    }     
    peticionHttp.open("POST","http://localhost:3000/nueva");
    peticionHttp.setRequestHeader("content-type", "application/json");
    peticionHttp.send(JSON.stringify(obj));                
}

function POSTdeleteObjeto(obj) 
{//alert("reach Control 5");
    var peticionHttp = new XMLHttpRequest();
    Gid("spinner").hidden = false;
    console.log(obj.id,obj.nombre,obj.cuatrimestre,obj.fechaFinal);
    
    peticionHttp.onreadystatechange = function(){
        if(peticionHttp.readyState == 4){
            if(peticionHttp.status == 200){  
                var tabla = Gid("MiTabla");       
                tabla.childNodes.forEach(tr => 
                {
                    if(tr.rowIndex == parseInt(obj.id))
                    {
                        tabla.removeChild(tr);
                        Gid("spinner").hidden = true;
                        Gid("form").hidden = true;
                        return;
                    }
                })
            }
        }           
    }
    peticionHttp.open("POST","http://localhost:3000/eliminar");
    peticionHttp.setRequestHeader("content-type", "application/json");
    peticionHttp.send(JSON.stringify(obj));
}

function POSTeditObjeto(obj) 
{//alert("reach Control 5");    
    var peticionHttp = new XMLHttpRequest();
    Gid("spinner").hidden = false;

    peticionHttp.onreadystatechange = function(){
        if(peticionHttp.readyState == 4){
            if(peticionHttp.status == 200){  
                var tabla = Gid("MiTabla");                
                tabla.childNodes.forEach(tr => 
                {
                    if(tr.rowIndex == parseInt(obj.id))
                    {
                        tr.childNodes[0].innerHTML = obj.nombre;
                        tr.childNodes[1].innerHTML = obj.cuatrimestre;
                        tr.childNodes[2].innerText = obj.fechaFinal;
                        tr.childNodes[3].innerText = obj.turno;
                        Gid("spinner").hidden = true;
                        Gid("form").hidden = true;
                        return;
                    }
                })
            }
        }
    }
    peticionHttp.open("POST","http://localhost:3000/editar");
    peticionHttp.setRequestHeader("content-type", "application/json");
    peticionHttp.send(JSON.stringify(obj));

}

function Gid(x) {
    return document.getElementById(x);
}

function Create(x) {
    return document.createElement(x);
}

function Text(x) {
    return document.createTextNode(x);
}

function Delete(x){
    let y = x.target.parentNode;
    let z = y.parentNode;
    z.removeChild(y);
}

function validarTurno() {
    x = "Noche";
    if(Gid("tm").checked==true)
    {
        x = "Mañana";
        return x;
    }
    return x;
}

function validarNombre(x) {
    if(x.length > 6)
    {
        return x;
    }
    alert("Nombre no cumple el minimo d 6");
    return false
}

function validarFecha(x) {
    
    let hoy = Date.now();
    let today = new Date(hoy);//creo un obj DATE de HOY p operar
    
    let fechaType = Date.parse(x);
    let dateX = new Date(fechaType);//creo un obj DATE c la fecha X
    
    if(dateX.getTime() >= today.getTime())
    {
        let array = x.split("-");
        fecha = array[2] + "/" + array[1] + "/" + array[0];
        return fecha;
    }
    alert("Fecha fuera de rango");
    return false;
}

function Cerrar(){
    element=Gid("form");
    element.hidden=true;
}
