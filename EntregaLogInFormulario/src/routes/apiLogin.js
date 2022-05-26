import express from "express";


const router = express.Router();

const getName = req => req.session.name ? `${req.session.name},` : '';

router.get('/',(req,res,next)=>{
    let { name } = req.query
    if(req.session.contador){
        req.session.contador++
        res.send(`${getName(req)} Tienes ${req.session.contador} visitas`)
    }else{
        if(name) req.session.name = name;
        req.session.contador = 1;
        res.send(`<h1><b>${getName(req)}</b> Bienvenido</h1>`)
    }

})



export default router;