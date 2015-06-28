// Definición del modelo de Comment(ario) con validación

module.exports=function(sequelize,DataTypes){
    return sequelize.define('Comment',
                            {texto:{
                                type:DataTypes.STRING,
                                validate: { notEmpty: {args:true,msg:"-Falta Comentario"}}
                            },
                            publicado:{
                                type:DataTypes.BOOLEAN,
                                defaultValue:false
                            }
                        }
                     );
        };
