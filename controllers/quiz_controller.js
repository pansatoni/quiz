//GET /quizes/question
exports.question=function(req,res){
    res.render('quizes/question',{pregunta: 'Capital de Italia'});
};

//GET /quizes/answer
exports.answer=function(req,res){
    var texto='!!Correcto!!';
    if (req.query.respuesta!=='Roma'){
        texto='Incorrecto';
    }
    res.render('quizes/answer',{respuesta: texto});
};