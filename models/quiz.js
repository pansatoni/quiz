 
// Definición del modelo de Quiz

module.exports=function(sequelize,DataTypes){
    return sequelize.define('Quiz',
                            {pregunta:{
                                type:DataTypes.STRING,
                                validate: { notEmpty: {args:true,msg:"-Falta Pregunta"}}
                            },
                             respuesta:{
                                 type:DataTypes.STRING,
                                 validate: { notEmpty: {args:true,msg:"  -Falta Respuesta"}}                                   
                             }
                            }   
                     );
        }
