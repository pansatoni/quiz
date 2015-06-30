var path= require('path');
//Postgress DATABASE_URL =postgress://user:passwd@host:port/DATABASE_URL
// SqLite   DATABASE_URL= sqlite://:@:/
var url=process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name=    (url[6]||null);
var user=       (url[2]||null);
var pwd=        (url[3]||null);
var protocol=   (url[1]||null);
var dialect=    (url[1]||null);
var port=       (url[5]||null);
var host=       (url[4]||null);
var storage=    process.env.DATABASE_STORAGE;

//Cargar Modelo ORM
var Sequelize = require('sequelize');

//usar BBDD SQLite
var sequelize = new Sequelize(DB_name,user,pwd,
        {dialect: protocol, 
         protocol:protocol,
         port:port,
         host:host,
         storage:storage,    // solo SqLite(.env)
         omitNull: true      // solo Postgress   
        }
);

//Importar la definición de la tabla Quiz en quiz.js
var quiz_path=path.join(__dirname,'quiz');
var Quiz = sequelize.import(quiz_path);

//Importar la definición de la tabla Comment en comment.js
var comment_path=path.join(__dirname,'comment');
var Comment = sequelize.import(comment_path);

Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

exports.Quiz=Quiz; //exportar definición de tabla Quiz
exports.Comment=Comment;

//sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().then(function(){
    //then() ejecuta el manejador una vez creada la tabla
    Quiz.count().success (function(count){
        if(count === 0){ //la tabla se inicializa solo si está vacía
            Quiz.create({pregunta: 'Capital de Italia',
                         respuesta: 'Roma',
                         categoria:'Otro'
                        },
                        {pregunta: 'Capital de Portugal',
                         respuesta: 'Lisboa',
                         categoria:'Otro'
                        }
                       ).then(function(){console.log('Base de datos inicializada');});
        }
    });
});


