var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

//Definición de rutas de quizes
<<<<<<< HEAD
router.get('/quizes',                      quizController.index);
router.get('/quizes/:quizId(\\d+)',        quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
=======
router.get('/quizes,                      quizController.index);
router.get('/quizes/:quizId(\\d+),        quizController.show);
router.get('/quizes/:quizId(\\d+)/answer, quizController.answer);
>>>>>>> 38f79c0fa9b2ae4110e90b75d05d6e47d7f64cd8

//GET /author
router.get('/author',function(req,res){
    res.render('author')});
module.exports = router;
