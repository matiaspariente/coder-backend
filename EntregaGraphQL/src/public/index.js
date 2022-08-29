let form = document.getElementById('userForm')

form.addEventListener('submit',(evt)=>{
    evt.preventDefault();
    let data = new FormData(form);
    let obj = {};
    data.forEach((value,key)=>obj[key]=value);
    fetch('graphql',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: 
          `mutation{crearProducto(datos:{title: "${obj.title}" ,price: ${obj.price},thumbnail:"${obj.thumbnail}"}),{id,title,price,thumbnail}}`,
        }),
      }).then((res) => res.json())
      .then((result) => console.log(result));
})