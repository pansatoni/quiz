var models=require('../models/models.js');

//estadisticas
exports.calculo = function(req,res){
        var numQuiz;
        var numComment;
        var quizComment=[];
        models.Quiz.count()            
        .then(
            function (a){
                    models.Comment.count()            
                    .then(
                        function (b){
                            models.Quiz.findAll({
                             include:[{model: models.Comment}]})
                            .then(function(quizes){
                                    var quizSiComments=0;
                                    for (var i in quizes){
                                            if (quizes[i].Comments.length){
                                                quizSiComments++;
                                            };
                                    var quizNoComments= a - quizSiComments;    
                                 }
                                 res.render('statistics.ejs',{nquiz:a,ncomment:b,media:b/a,no:quizNoComments,si:quizSiComments,errors:[]});
                            });
                    });
        });
        
               
};