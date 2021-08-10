window.addEventListener("load",function() {
    //alert("reach Control 1");
    var btn = Gid("btnAgregar");
    btn.addEventListener("click",CargarDatos)//cuando pasas una func aca va sin "()"
    PeticionGET();
})

function PeticionGET() {
    var peticionHttp = new XMLHttpRequest();//esto va siempre q trabajemos c la request

    peticionHttp.onreadystatechange = function()
    {
        if(peticionHttp.readyState == 4){//este readyState la ejecuta 4 veces y va cambiando de estados: 1,2,3,4 cuando llega a 4 significa q cargo todo bien
            if(peticionHttp.status == 200){//entra y de minimia el resultado ahi sera un status 200 q pudo cargar todo
                let array = JSON.parse(peticionHttp.responseText);//si esta todo OK
                //en el response t da lo q hay en personas. el metodo JSON.parse carga un array de jsons
                crearTabla(array);
            }}}
            peticionHttp.open("GET","http://localhost:3000/personas");//seteas el tipo d peticion y a donde!
            //aca hay q tener corriendo el "node index.js" q mando el profe
            peticionHttp.send();//esto es como el execute
}
        
function crearTabla(array) {//alert("reach Control 2");
    
    var div = Gid("divTabla");//recuper el div dnd voy a poner mi tabla... podria ser cualquier otro
    var tabla = Create("table");
    div.appendChild(tabla); //ATECION c las relaciones!!! div=padre / tabla = hijo
    
    let arrayKey = Object.keys(array[0]);
    arrayKey= arrayKey.slice(1);//desde el primero
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
    {//esta no m la sabia!
        //console.log(element.apellido);//son los campos de cada json en el array de json, puede ser nombre o lo q sea
        var td1 = Create("td");
        td1.appendChild(Text(element.nombre));
        
        var td2 = Create("td");
        td2.appendChild(Text(element.apellido));

        var td3 = Create("td");
        td3.appendChild(Text(element.fecha));

        var td4 = Create("td");
        td4.appendChild(Text(element.sexo));
        //TD = columna / TR = fila
        
        var tr = Create("tr");
        tr.addEventListener("click",capturarFila);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        tabla.appendChild(tr);// div=padre / tabla = hijo / tr = nieto / td1,2,3,4 = bisnieto
        tabla.id="MiTabla";
    });
}

function capturarFila(e)//al momento d crear la tabla, cada fila tiene un eventlistener q invoca a este...
{//alert("reach Control 4");
    var tr = e.target.parentNode;

    var nlabel = Create('label');
    nlabel.innerHTML = "Nombre: ";
    var nom = Create("input");
    nom.id = "nInput";
    nom.value = tr.childNodes[0].innerHTML;
   
    var alabel = Create('label');
    alabel.innerHTML = "Apellido: ";
    var ape = Create("input");
    ape.value = tr.childNodes[1].innerHTML;
    ape.id = "aInput";

    var flabel = Create('label');
    flabel.innerHTML = "Fecha: ";
    var fec = Create("input");
    fec.id = "fInput";
    fec.value = tr.childNodes[2].innerHTML;

    var slabel = Create('label');
    slabel.innerHTML = "Sexo: ";
    var sex = Create("input");
    sex.id = "sInput";
    sex.value = tr.childNodes[3].innerHTML;
    
    //TD = columna / TR = fila
    var btn = Create("input");
    btn.setAttribute("type", "button");
    btn.value = "MODIFICAR";
    btn.id = "btnModificar";
    btn.setAttribute("i", tr.rowIndex);//este es el index d este "array" o "numero de fila "
    btn.addEventListener("click", Modificar);//cuadno clickeas invoco al metodo Modif

    var btn2 = Create("input");
    btn2.setAttribute("type", "button");
    btn2.value = "BORRAR";
    btn2.id = "btnBaja";
    btn2.setAttribute("i", tr.rowIndex);
    btn2.addEventListener("click", Borrar);

    var div = Gid("datos");
    div.appendChild(nlabel);
    div.appendChild(nom);
    div.appendChild(alabel);
    div.appendChild(ape);
    div.appendChild(flabel);
    div.appendChild(fec);
    div.appendChild(slabel);
    div.appendChild(sex);
    div.appendChild(btn);
    div.appendChild(btn2);
}   

function Borrar(e) 
{
    var nTd;
    var aTd;
    var fTd;
    var sTd;
    var id;
    var btn = e.target;//recupero dsd el btn
    var i = btn.attributes.i.value;//seria Modificar
    
    var tabla = Gid("MiTabla");

    tabla.childNodes.forEach(tr => {
        if(tr.rowIndex == i){
            nTd = tr.childNodes[0];
            aTd = tr.childNodes[1];   
            fTd = tr.childNodes[2];
            sTd = tr.childNodes[3];
            id = i;
        }});

    let obj = {'id': id,'nombre': nTd,'apellido': aTd ,'fecha': fTd ,'sexo':sTd };
    POSTdeleteObjeto(obj);
}

function Modificar(e)
{//alert("reach Control 4");
    var nTd;
    var aTd;   
    var fTd;
    var sTd;
    var id;
    var btn = e.target;//recupero dsd el btn
    var i = btn.attributes.i.value;//seria Modificar
    
    var tabla = Gid("MiTabla");

    tabla.childNodes.forEach(tr => {
        if(tr.rowIndex == i){
            nTd = tr.childNodes[0];
            aTd = tr.childNodes[1];   
            fTd = tr.childNodes[2];
            sTd = tr.childNodes[3];
            id = i;            
            nTd.innerHTML = Gid("nInput").value;
            aTd.innerHTML = Gid("aInput").value;
            fTd.innerHTML = Gid("fInput").value;
            sTd.innerHTML = Gid("sInput").value;
            return;
        }});

    var div = Gid("datos");//El padre es el div, los otros 4 tr son sus hermanos
    var body = div.parentNode;
    body.removeChild(div);
     
    var divNew = Create("div");
    divNew.id = "datos";
    body.appendChild(divNew);

    let obj = {'id': id, 'nombre': nTd.innerHTML,'apellido': aTd.innerHTML ,'fecha': fTd.innerHTML ,'sexo':sTd.innerHTML};
    POSTeditarObjeto(obj);
}

function CargarDatos() 
{   //alert("reach Control 3");

    var nlabel = Create('label');
    nlabel.innerHTML = "Nombre: ";
    var nom = Create("input");
    nom.id = "nInput";

    var alabel = Create('label');
    alabel.innerHTML = "Apellido: ";
    var ape = Create("input");
    ape.id = "aInput";

    var flabel = Create('label');
    flabel.innerHTML = "Fecha: ";
    var fec = Create("input");  
    fec.id = "fInput";

    var slabel = Create('label');
    slabel.innerHTML = "Sexo: ";
    var sex = Create("input");
    sex.id = "sInput";

    var btn = Create("input");
    btn.setAttribute("type", "button");
    btn.value = "OK";
    btn.id = "btnOK";
    btn.addEventListener("click", Alta);//cuadno clickeas invoco al metodo Modif

    var div = Gid("datos");
    div.appendChild(nlabel);    
    div.appendChild(nom);    
    div.appendChild(alabel);
    div.appendChild(ape);
    div.appendChild(flabel);
    div.appendChild(fec);
    div.appendChild(slabel);
    div.appendChild(sex);
    div.appendChild(btn);    
}

function Alta(e) 
{//alert("reach control 5")
    var div = Gid("datos");
    var tabla = Gid("MiTabla");
    
    var tr = Create("tr");

    var td1 = Create("td");
    td1.innerText = Gid("nInput").value; 

    var td2 = Create("td");
    td2.innerText = Gid("aInput").value;
    
    var td3 = Create("td");
    td3.innerText = Gid("fInput").value;

    var td4 = Create("td");
    td4.innerText = Gid("sInput").value;

    //NO PODES AGREGAR EL DIV IMBECIL... AGREGALE EL TR
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tabla.appendChild(tr); 
    
    var body = div.parentNode;
    body.removeChild(div);
     
    var divNew = Create("div");
    divNew.id = "datos";
    body.appendChild(divNew);
    
    let obj = {'nombre': td1.innerText,'apellido': td2.innerText ,'fecha':td3.innerText ,'sexo':td4.innerText};
    POSTaddObjeto(obj);
}

function POSTaddObjeto(obj) {
    
    var peticionHttp = new XMLHttpRequest();

    peticionHttp.onreadystatechange = function(){
        if(peticionHttp.readyState == 4){
            if(peticionHttp.status == 200){  
                console.log(JSON.parse(peticionHttp.responseText));
            }
        }        
    }
    peticionHttp.open("POST","http://localhost:3000/nueva");
    peticionHttp.setRequestHeader("content-type", "application/json");
    peticionHttp.send(JSON.stringify(obj));
}

function POSTdeleteObjeto(obj) {
    
    var peticionHttp = new XMLHttpRequest();

    peticionHttp.onreadystatechange = function(){
        if(peticionHttp.readyState == 4){
            if(peticionHttp.status == 200){  
                console.log(JSON.parse(peticionHttp.responseText));
            }
        }        
    }
    peticionHttp.open("POST","http://localhost:3000/eliminar");
    // peticionHttp.setRequestHeader("content-type", "application/json");
    peticionHttp.send(JSON.stringify(obj));
}

function POSTeditarObjeto(obj) {
    
    var peticionHttp = new XMLHttpRequest();

    peticionHttp.onreadystatechange = function(){
        if(peticionHttp.readyState == 4){
            if(peticionHttp.status == 200){  
                console.log(JSON.parse(peticionHttp.responseText));
            }
        }        
    }
    peticionHttp.open("POST","http://localhost:3000/editar");
    peticionHttp.setRequestHeader("content-type", "application/json");
    peticionHttp.send(JSON.stringify(obj));
}

function Altax() 
{//alert("reach Control 4");
    var persona = {'nombre':'daniel','apellido':'livon','fecha':'10/03/1988','sexo':'no mucho'};
    var tabla = Gid("MiTabla");

    var tr = Create("tr");
    
        var td1 = Create("td");//columna
        td1.appendChild(Text(persona.nombre));

        var td2 = Create("td");//columna
        td2.appendChild(Text(persona.apellido));

        var td3 = Create("td");//columna
        td3.appendChild(Text(persona.fecha));

        var td4 = Create("td");//columna
        td4.appendChild(Text(persona.sexo));

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);

    tabla.appendChild(tr);// div=padre / tabla = hijo / tr = nieto / td1,2,3,4 = bisnieto
    
}

function Gid(x) {
    return document.getElementById(x);
}

function Create(x) {//creo un elemento del tipo q paso... los tipos son html
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