

//GET /login -- formulario de login
exports.new = function(req,res) {
    var errors=req.session.errors|| {};
    req.session.errors={};
    res.render('sessions/new',{errors:errors});
};

// POST /login -- Crear la sesión
exports.create=function(req,res) {
        var login=req.body.login;
        var password=req.body.password;
        console.log(req.body.login+'->'+req.body.password);
        var userController=require('./user_controller');
        userController.autenticar(login,password,function(error,user){
            console.log('error:'+error);
            if(error){ //si hay error retornamos mensaje de error
                req.session.errors=[{"message":'Se ha producido un error:'+error}];
                res.redirect("/login");
                return;
            }
            
            
        //Crear req.session.user y guardar campos id y username
        //La session se define por la existencia de req.session.user
        req.session.user={id:user.id,username:user.username};
        console.log('path='+req.session.redir.toString());
        res.redirect(req.session.redir.toString()); //redirección a path anterior
    });
};

// DELETE /logout -- Destruir session
exports.destroy=function(req,res){
    delete req.session.user;
    res.redirect(req.session.redir.toString());
};
    
    
    
