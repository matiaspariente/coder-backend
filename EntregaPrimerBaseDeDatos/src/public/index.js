let socket = io();
let form = document.getElementById('userForm');
let tablaProductos = document.getElementById('tablaProductos');
let chatBox = document.getElementById('chatBox');
let chatBtn =document.getElementById('chatBtn');

form.addEventListener('submit',(evt)=>{ // espero evento de boton de envio de formulario
    evt.preventDefault();
    let data = new FormData(form);
    let obj = {};
    data.forEach((value,key)=>obj[key]=value); // genero el body correspondiente y ejecuto el metodo post
    fetch('/api/productos/',{
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            "Content-Type":"application/json"
        }
    })
})

Swal.fire({ // sweetAlert para el ingreso de la identificacion para el chat
    title:"Identificate con un E-Mail",
    input:'text',
    allowOutsideClick:false,
    inputValidator: (value)=>{ // validacion de ingreso 
        return !value && 'Necesitas escribir un nombre de usuario para participar'
    }
}).then(result=>{ // envio primer mensaje al servidor, para que me responda con los mensajes del chat hasta el momento
    socket.emit('message',null)
    user=result.value;
})

const options = {
    method: "GET"
  }; 

fetch('/api/productos/', options) // hago un fetch para atraves del metodo get obtener los productos cargados hasta el momento al iniciar la conexion con el cliente nuevo
    .then(response => response.text())
    .then(data => {
        socket.emit('start',JSON.parse(data))
    });

/*SOCKETS */

socket.on('log',data=>{ // recibo conexion del servidor cuando se ejecuta un POST, DELETE o PUT y modifico la tabla con los nuevos valores.
    let tabla = "<thead><tr><th>Producto</th><th>Precio</th><th>Foto</th><th>ID</th></thead>"
    if(data.error!="no hay productos cargados"){
        data.forEach(log=>{
            tabla +=`<tr><td>${log.title}</td><td>$${log.price}</td><td>${log.thumbnail}</td><td>${log.id}</td></tr>`;
        })
    }
    tablaProductos.innerHTML = tabla;
})

chatBox.addEventListener('keyup',evt=>{ // evento al presionar enter en el chat box
    if(evt.key==="Enter"){
        if(chatBox.value.trim().length>0){//Por lo menos se envia un simbolo
            socket.emit('message',{user,message:chatBox.value.trim()})
            chatBox.value="";
        }
    }
})

chatBtn.addEventListener('click',(evt)=>{ // evento al presionar el boton enviar del chat, cumple la misma funcion que el enter en el chatbox
    evt.preventDefault();
    if(chatBox.value.trim().length>0){//Por lo menos se envia un simbolo
        socket.emit('message',{user,message:chatBox.value.trim()})
        chatBox.value="";
    }
})

socket.on('chat',data=>{ // recibo del servidor el array del chat y lo muestro en pantalla
    let messages="";   
    data.forEach(log=>{
        messages = messages + `<p style="color:blue"><b>${log.user}</b></p><p style="color:brown">[${log.fecha} ${log.hora}]</p> <p style="color:green"><i>:${log.message}</i></p></br>`;
    })
    log.innerHTML=messages;
})
