import express from 'express';
import passport from 'passport'

const router = express.Router();

let isLogin = (req, res, next)=>{
    try {
        if(req.isAuthenticated()){
            next();
        }else{
            res.redirect("/errorlogin");
        }
    } catch (error) {
        console.log(error);
    }
}

let isNotLogin = (req, res, next)=>{
    try {
        if(!req.isAuthenticated()){
            next();
        }else{
            res.redirect("/home");
        }
    } catch (error) {
        console.log(error);
    }
}

router.get('/',(req,res)=>{
    res.redirect('/login')  
})

router.get('/login',isNotLogin,(req,res)=>{ 
    res.render('login',{}) 
})

router.get('/registro',isNotLogin,(req,res)=>{ 
    res.render('registro',{}) 
})

router.get("/home", isLogin, (req,res,next)=>{
    res.render('home', { usuario: req.user} );
});

router.get("/errorlogin", isNotLogin, (req,res,next)=>{
    res.render("errorlogin",{});
});

router.get("/errorregister", isNotLogin, (req,res,next)=>{
    res.render("errorregister",{});
});

router.get('/logout',(req,res)=>{
    req.session.destroy()
    res.render("logout", { usuario: req.user });
})

// Métodos post

router.post("/login", passport.authenticate('login', {failureRedirect:"errorlogin", successRedirect:"home"}));

router.post("/registro",  passport.authenticate('register', {failureRedirect:"errorregister", successRedirect:"home"}));


export default router;