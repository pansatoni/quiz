var models=require('../models/models.js');

//Autoload - factoriza el código si ruta incluye quizId
exports.load = function(req,res,next,quizId){
        models.Quiz.find({
            where:{id: Number(quizId)},
            include:[{model:models.Comment}]             
        }).then(
            function (quiz){
                if (quiz){
                    req.quiz=quiz;
                    next();                    
                }else{ 
                    next(new Error('No existe quizId='+quizID));}
                    
                }
         ).catch(function (error){ next(error);});
};

//PUT /quizes/:id
exports.update=function(req,res){
    req.quiz.pregunta=req.body.quiz.pregunta;
    req.quiz.respuesta=req.body.quiz.respuesta;
    req.quiz.categoria=req.body.quiz.categoria;
    req.quiz.validate().then(function(err){
        if(err){
            res.render('/quizes/edit',{quiz:req.quiz,errors:err.errors});
        }
        else
        {
            req.quiz
            .save({fields:["pregunta","respuesta","categoria"]})
            .then (function(){res.redirect("/quizes");});
        }
    });
};

//DELETE /quizes/:id
exports.destroy=function(req,res){
    req.quiz.destroy().then(function(){
        res.redirect('/quizes');
    }).catch(function(error){next(error)})
};

//GET /quizes
exports.index=function(req,res){
    models.Quiz.findAll().then(function(quizes){
    res.render('quizes/index.ejs',{quizes: quizes,errors:[]});
    });
};

//GET /quizes/:id
exports.show=function(req,res){
    //models.Quiz.find(req.params.quizId).then(function(quiz){
    res.render('quizes/show',{quiz: req.quiz,errors:[]});
};

//GET /quizes/new
exports.new = function(req,res) {
    var quiz=models.Quiz.build(//crea objeto quiz
     {pregunta:"Pregunta",respuesta:"Respuesta",categoria:"Categoria"}
                         );
    res.render('quizes/new',{quiz:quiz,errors:[]
    });
};

// POST /quizes/create
exports.create=function(req,res) {
        var quiz=models.Quiz.build(req.body.quiz);
        console.log('Vamos a validar: ');
        quiz.validate().then (function(err){
            console.log(err);
            if(err!=null){
                    var errors=[];
                    for(var i in err){
                        console.log(err[i]);
                        errors[errors.length]={message: err[i]};
                        
                    }
                console.log('errors: '+errors+'->longitud: '+ errors.length);    
                res.render('quizes/new',{quiz:quiz,errors:err.errors});
            }else{
                console.log('estamos en else'+ err);
                //guarda en DB los campos pregunta y respuesta de quiz
                quiz.save({fields:["pregunta","respuesta","categoria"]}).then (function(){
                //console.log('redirecciona a /quizes');
                res.redirect('/quizes');
                }
        );
        }
});
};

//GET /quizes/:id/edit
exports.edit= function(req,res){
    var quiz=req.quiz; //autoload de instancia de quiz
    res.render('quizes/edit',{quiz:quiz,errors:[]});
    
};

//GET /quizes/:id/add
exports.add=function(req,res){
    console.log('vamos a mostrar add');
    res.render('quizes/add',{errors:[]});
    //models.Quiz.create({pregunta:req.query.pregunta,respuesta:req.query.respuesta}).then(function(quiz){
        //res.render('quizes/add',{quiz:quiz});
   //     console.log('pregunta creada correctamente');
   // })
};

//GET quizes/addreg
exports.addreg=function(req,res){
    //console.log('vamos a mostrar add');
    //res.render('quizes/add');
    console.log('Pregunta:'+req.query.pregunta+ ' Respuesta: '+req.query.respuesta);
    models.Quiz.create({pregunta:req.query.pregunta,respuesta:req.query.respuesta,categoria:req.query.categoria}).then(function(quiz){
        //res.render('quizes/add',{quiz:quiz});
        console.log('pregunta '+ quiz.pregunta+' creada correctamente');
        res.render('quizes/addreg',{quiz: quiz,errors:[]});
    });
};

//GET /quizes/:search/search
exports.search=function(req,res){
    res.render('quizes/searchinput',{errors:[]});
    console.log('formulario de entrada');
};    
    
//GET /quizes/search/
exports.searchshow=function(req,res){
    //console.log(query.search);
    var stexto=req.query.texto;
    console.log('searchshow: '+req.query.texto+"->"+stexto[0]+","+stexto[1]+","+stexto[2]);
    var i=0;
    var modif="%";
    for (i=0;i<stexto.length;i++){
        if (stexto[i]===" "){
                modif+="%";
        }
        else{
                modif+=stexto[i];
        }
    }
    modif+="%";
    console.log(modif);
    models.Quiz.findAll({where: ["pregunta like ?", modif], order: "pregunta" }).then(function(quizes){
        
        console.log('mostrando la búsqueda->'+{quizes:quizes});
        res.render('quizes/searchshow.ejs',{quizes:quizes,errors:[]});
    
  });
};


//GET /quizes/:id/answer
exports.answer=function(req,res){
    //models.Quiz.find(req.params.quizId).then(function(quiz){
    var resultado='Incorrecto';
    if (req.query.respuesta===req.quiz.respuesta){
        resultado='Correcto';
        
    }
      res.render('quizes/answer',{quiz:req.quiz,respuesta:resultado,errors:[]});
};
