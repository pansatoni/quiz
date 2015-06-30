
var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController= require('../controllers/session_controller');
var statisticController=require('../controllers/statistic_controller');

// GET home page. 
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz',errors:[] });
});

//Autoload de comandos con :quizId
router.param('quizId',quizController.load); // autoload pregunta
router.param('commentId',commentController.load); // autoload comentario

//Definición de rutas de sesión
router.get('/login', sessionController.new);      //formulario login
router.post('/login', sessionController.create);  //crear sesion
router.get('/logout', sessionController.destroy); //destruir sesion

//Definición de rutas de quizes

router.get('/quizes',                         quizController.index);
router.get('/quizes/:quizId(\\d+)',           quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',    quizController.answer);
router.get('/quizes/add',                     quizController.add);
router.get('/quizes/addreg',                  quizController.addreg);
router.get('/quizes/search',                  quizController.search);
router.get('/quizes/searchshow',              quizController.searchshow);
router.get('/quizes/new',                sessionController.loginRequired,quizController.new);
router.get('/quizes/:quizId(\\d+)/edit', sessionController.loginRequired,quizController.edit);
router.post('/quizes/create',            sessionController.loginRequired,quizController.create);
router.put('/quizes/:quizId(\\d+)',      sessionController.loginRequired,quizController.update);
router.delete('/quizes/:quizId(\\d+)',   sessionController.loginRequired,quizController.destroy);

//Definicion de rutas de comment_controller
router.get('/quizes/:quizId(\\d+)/comments/new',  commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',     commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish',     sessionController.loginRequired,commentController.publish);

//estadísticas
router.get('/statistics',                statisticController.calculo);

module.exports = router;

//GET /author
router.get('/author',function(req,res){
    res.render('author',{errors:[]}
    
);});