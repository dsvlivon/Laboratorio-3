class Consultas{
    
    public ejecutarGet(url:string, listenerCallback:ResponseGet){
        let xml = new XMLHttpRequest();
        xml.onreadystatechange = ()=>{
            if(xlm.readyState === 4)
            {
                listenerCallback.response(xml.status,xml.responseText)
            }
        }
        xml.open("GET",url,true);
        xml.send();
    }
    
}