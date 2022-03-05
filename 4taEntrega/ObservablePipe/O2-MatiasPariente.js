const {fromEvent,map} = rxjs;


const textBox = document.getElementById('textBox');
const span = document.getElementsByTagName('span')[0];

let textObservable = fromEvent(textBox,'input').pipe(
    map(val=>{
       if(textBox.value==="error") {
        console.log("Se salio por error")
        exit()
    }
       if(textBox.value==="complete"){
           console.log("Se salio por complete")
        exit()
       }
       return textBox.value;
    })
)

let observer = textObservable.subscribe({
    next:(val)=>span.innerHTML=val.split("").reverse().join(""),
    error:()=>{
        console.log("Se salio por error")
        exit();
        }
})

setTimeout(exit,30000);

function exit(){
    observer.unsubscribe();
    span.innerHTML = '';
    textBox.value = '';
    textBox.disabled=true;
}