import express from 'express';

const router = express.Router();

router.get('/',(req,res)=>{
    res.redirect('/login')  
})

router.get('/login',(req,res)=>{ // se verifica si hay nombre de usuario para ver vista de login o vista completa
    req.session.name ? res.render('home', { user: req.session.name }) : res.render('login') 
})

router.post('/login',(req,res)=>{
    req.session.name = req.body.name
    res.redirect(req.originalUrl)
})

router.get('/logout',(req,res)=>{
    res.render("logout.handlebars", { user: req.session.name });
    req.session.destroy()
})

export default router;