let loginBtn =document.getElementById('loginBtn');
let nombreLogin =document.getElementById('nombreLogin');


loginBtn.addEventListener('click',(evt)=>{ // espero evento de boton de envio de formulario
    evt.preventDefault();
    let obj = {name:nombreLogin.value};
    fetch('/login',{
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(()=>{window.location.reload()})
})
