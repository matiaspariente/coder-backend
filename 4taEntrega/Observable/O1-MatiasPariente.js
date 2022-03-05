const {Observable,fromEvent,map} = rxjs;

const textBox = document.getElementById('textBox'); 
const span = document.getElementsByTagName('span')[0];

let textObservable = fromEvent(textBox,'input');

let observer = textObservable.subscribe({ 
    next:(val)=>{
       if(val.target.value==="error"){
           console.log("Se salio por ingreso de error");
           exit();
       }else if(val.target.value==="complete"){
            console.log("Se salio por ingreso de complete");
            exit();
       }else{
        span.innerHTML=val.target.value.split("").reverse().join("") 
       }
    },
    error:()=>console.log("Se salio por error")
})

setTimeout(exit,30000);

function exit(){
    observer.unsubscribe();
    span.innerHTML = '';
    textBox.value = '';
    textBox.disabled=true;
}

