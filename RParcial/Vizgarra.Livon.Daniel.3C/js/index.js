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
            peticionHttp.open("GET","http://localhost:3000/autos");
            peticionHttp.send();
}
        
function crearTabla(array) 
{//alert("reach Control 2");
    let i;
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
        td1.appendChild(Text(element.make));
        
        var td2 = Create("td");
        td2.appendChild(Text(element.model));

        var td3 = Create("td");
        td3.appendChild(Text(element.year));
        var select = Create("select");
        
        // var o;
        // var cbo;
        // for(i=2000;i<2021;i++)
        // {
        //     var op = Create("option");
        //     op.innerText = i;
            
        //     if(parseInt(Text(element.year)) == i)
        //     {
        //         op.selected = true;
        //     }
        //     select.appendChild(op);
        // }       
        // if(parseInt(Text(element.year) <2000))
        // {
        //     var op = Create("option");
        //     op.innerText = Text(element.year);
        //     op.selected = true;
        //     select.appendChild(opcion);
        // }
               
        var tr = Create("tr");
        tr.addEventListener("dblclick",capturarFila);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);       

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
    Gid("txtMarca").value = tr.childNodes[0].innerHTML;
    Gid("txtModelo").value = tr.childNodes[1].innerHTML;
    Gid("txtModelo").hidden = true;
    Gid("txtMarca").hidden=true;
    Gid("lbl1").hidden=true;
    Gid("lbl2").hidden=true;
    let cuatrimestre = tr.childNodes[2].innerHTML;
    
    var select = Gid("txtAño");
    if(cuatrimestre<2000 || cuatrimestre >2020)
    {
        var op = Create("option");
        op.innerHTML = cuatrimestre;
        op.id = "op";
        select.appendChild(op);    
    }
    
    select.value = cuatrimestre;

    select.onchange = Modificar;

    let btnOk = Gid("btnOk");
    btnOk.hidden = true;
}   

function Modificar(e)
{//alert("reach Control 4");
    var tr = e.target;//x ahora no lo uso
    
    select = Gid("txtAño");
    
    let año = Gid("txtAño").value;   
    let id = Gid("txtId").value;
    let marca = Gid("txtMarca").value;
   
    let modelo = Gid("txtModelo").value;
   
    let obj = {'id':id, 'make': marca,'model': modelo ,'year': año};
    POSTeditObjeto(obj);  
}

function cargarDatos(e) 
{//alert("reach control 4");
    Gid("txtModelo").hidden = false;
    Gid("txtMarca").hidden=false;
    Gid("lbl1").hidden=false;
    Gid("lbl2").hidden=false;
    
    let form = Gid("form");
    form.hidden = false;    

    let marca = Gid("txtMarca");
    marca.value ="";
    let año = Gid("txtAño");
    año.value ="";
    
    let modelo = Gid("txtModelo");
    modelo.value="";
    
    let btnOk = Gid("btnOk");
    btnOk.hidden = false;
    btnOk.addEventListener("click", Alta);
}

function Alta(e) 
{//alert("reach control 4");
    let form = Gid("form");
    form.hidden = false;
    
    let id = Gid("txtId").value;
    let marca = validarNombre(Gid("txtMarca").value);
    let modelo = validarNombre(Gid("txtModelo").value);
    let año = Gid("txtAño").value;
    
    if(marca != false && modelo != false)
    {
        let obj = {'make': marca,'model': modelo ,'year': año};
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
                td1.appendChild(Text(obj.make));
                
                var td2 = Create("td");
                td2.appendChild(Text(obj.model));

                var td3 = Create("td");
                td3.appendChild(Text(obj.year));
                                
                var tr = Create("tr");
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                
                tabla.appendChild(tr);
                tabla.id="MiTabla";
                Gid("spinner").hidden = true;
                Gid("form").hidden = true;
            }
        }
    }     
    peticionHttp.open("POST","http://localhost:3000/nuevoAuto");
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
                        tr.childNodes[0].innerHTML = obj.make;
                        tr.childNodes[1].innerHTML = obj.model;
                        tr.childNodes[2].innerText = obj.year;
                        
                        Gid("spinner").hidden = true;
                        Gid("form").hidden = true;
                        return;
                    }
                })
            }
        }
    }
    peticionHttp.open("POST","http://localhost:3000/editarYear");
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
    if(x.length > 3)
    {
        return x;
    }
    alert("Nombre no cumple el minimo d 3");
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
