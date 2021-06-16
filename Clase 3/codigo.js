

function ValidarNumero(x)
{
    if(x != null)
    {
        var num = parseInt(x);            
        if(!isNaN(num)) 
        {
            if(num>0)
            {
                return num;            
            }
            else
            {
                alert("Solo se admiten numeros positivos!");
                return false;
            }
        }
        else
        {
            alert ("Solo se admite caracteres numéricos!");
            return false;
        }
    }
}

function Limpiar()
{
    //document.getElementById("btnEnviar").style.background="#bbb";
    document.getElementById("valor1").value = ""; 
    document.getElementById("valor1").style.borderColor="rgb(0, 0, 0)";
    document.getElementById("valor1").style.color="rgb(0,0,0)";
    
    document.getElementById("valor2").value = "";
    document.getElementById("valor2").style.borderColor="rgb(0, 0, 0)";
    document.getElementById("valor2").style.color="rgb(0,0,0)";
    
    document.getElementById("btnEnviar").style.background="rgb(32,178,170)";
    document.getElementById("operador").options.value = document.getElementById("operador").options[0]; 
    //PARA LIMPIAR UN DROPDOWN HAY ACCEDER A LA LISTA DE ELEMENTOS        
    document.getElementById("resultado").value = "";
    alert("Limpiando...");
}

function Calcular(x)
{
    var resultado;
    var op = document.getElementById("operador");
    var operador = op.options[op.selectedIndex].value;
            
    var value1 = ValidarNumero(document.getElementById("valor1").value);    
    if(value1==false)
    {   //alert("value1 ..."+value1);
        document.getElementById("valor1").style.borderColor="rgb(255, 0, 0)";
        document.getElementById("valor1").style.color="rgb(255,0,0)";
    }

    var value2 = ValidarNumero(document.getElementById("valor2").value);
    if(value2==false)
    {   //alert("value2..."+value2);
        document.getElementById("valor2").style.borderColor="rgb(255, 0, 0)";
        document.getElementById("valor2").style.color="rgb(255,0,0)";
    }

    if(value1!=false && value2!=false)
    {
       switch(operador)
        {
            case "+":
                resultado = value1+value2;
                break;
            case "-":
                resultado = value1-value2;
                break;
            case "/":
                if(value2!=0)
                {
                    resultado = value1/value2;
                }
                else 
                {
                    resultado = "ERROR DIV/0";
                }
                break;
            case "*":
                    resultado= value1*value2;
                break;
            default:
                alert("Faltan datos!");
                Limpiar();
                break;                            
        }
    }
    else{
        resultado="ERROR";
    }

    document.getElementById("resultado").value = resultado;
    CambiarColor(x);            
}

function Idea(x)
{
    var arrayDatos;

    arrayDatos.push(x);

    var msg ="<table> border ='1'</table>"+
    "<thead><th> VALOR 1 </th><th> VALOR 2 </th><th> RESULTADO </th></thead>"+
    "<tbody><td>"+x[0]+"</td><tr>"+x[1]+"</tr><t>"+x[2]+"</tr></tbody>";
}

function CambiarColor(x)
{
    if(x.style.background=="rgb(210,0,0)")
    {
        x.style.background="rgb(0,0,0)";
    }
    else
    {
        x.style.background="rgb(210,0,0)";
    }
    return false;
}