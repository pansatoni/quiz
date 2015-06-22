var models=require('../models/models.js');

//GET /quizes
exports.index=function(req,res){
    models.Quiz.findAll().then(function(quizes){
    res.render('quizes/index.ejs',{quizes: quizes});
    })
};

//GET /quizes/:id
exports.show=function(req,res){
    models.Quiz.find(req.params.quizId).then(function(quiz){
    res.render('quizes/show',{quiz: quiz});
    })
};

//GET /quizes/:id/add
exports.add=function(req,res){
    console.log('vamos a mostrar add');
    res.render('quizes/add');
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
    models.Quiz.create({pregunta:req.query.pregunta,respuesta:req.query.respuesta}).then(function(quiz){
        //res.render('quizes/add',{quiz:quiz});
        console.log('pregunta '+ quiz.pregunta+' creada correctamente');
        res.render('quizes/addreg',{quiz: quiz});
    })
};

//GET /quizes/:search/search
exports.search=function(req,res){
    res.render('quizes/searchinput');
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
        res.render('quizes/searchshow.ejs',{quizes:quizes});
    
  })
};





//GET /quizes/:id/answer
exports.answer=function(req,res){
    models.Quiz.find(req.params.quizId).then(function(quiz){
    if (req.query.respuesta===quiz.respuesta){
        res.render('quizes/answer',{quiz: quiz,respuesta:'Correcto'});
    }else{
        res.render('quizes/answer',{quiz:quiz,respuesta:'Incorrecto'});
    }
  })
};