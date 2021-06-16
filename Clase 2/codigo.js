function CambiarColor(x)
    {
        if(x.style.background=="rgb(247, 211, 88)")
        {
            x.style.background="#fff";
        }else{
            x.style.background="#F7D358";
        }
        return false;
    }
    //ACA SE PUEDEN CREAR Y LLAMAR FUNCIONES NORMALMENTE
    /*COMO NO HAY TIPOS, LA FUNCION RECIBE UN "X" Q PUEDE SER UNA VARIABLE O UN OBJETO.
    RECORDAR: Q son los objetos los q guardan info en su estado, por ejemplo el objeto 
    document.getElementById("x").value basicamente retorna el estado value del campo "x"
    atraves del metodo .getElemetById, del objeto document*/
    
    function Limpiar()
    {
        document.getElementById("btnEnviar").style.background="#fff";
        document.getElementById("valor1").value = ""; 
        document.getElementById("valor2").value = "";
        document.getElementById("operador").options.value = document.getElementById("operador").options[0]; 
        
        document.getElementById("resultado").value = "";
        alert("esto anda");
    }
    //PARA BLANQUEAR UN DROPDOWN HAY ACCEDER A LA LISTA DE ELEMENTOS

    function Calcular(x)
    {
        var op = document.getElementById("operador");
        var operador = op.options[op.selectedIndex].value;
        //alert(operador);

        var value1 = parseInt(document.getElementById("valor1").value);
        var value2 = parseInt(document.getElementById("valor2").value);
        var resultado;

        if(value1 != null & value2!=null)
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
                        alert("Operacion invalida");
                        resultado = 0;
                    }
                    break;
                case "*":
                        resultado= value1*value2;
                    break;
                default:
                    alert("Gracias por todo!");
                    break;                            
            }
            document.getElementById("resultado").value = resultado;
            CambiarColor(x);
        }        
    }