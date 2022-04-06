import express from 'express';
import apiProductosRouter from './routes/apiProductos.js';
import apiCartsRouter from './routes/apiCarts.js';
import __dirname from './utils.js';

const app= express();
const PORT = process.env.PORT||8080;
const server = app.listen(PORT,()=>console.log(`listening on ${PORT}`))

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/',express.static(__dirname+'/public'))

app.use('/api/products/',apiProductosRouter)

app.use('/api/carts/',apiCartsRouter)

