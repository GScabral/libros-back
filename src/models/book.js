const { DataTypes } = require("sequelize")


module.exports = (sequelize)=>{
    const Books = sequelize.define('books',{
        id:{
            type:DataTypes.STRING,
            primaryKey: true,
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        author:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        editorial:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        status:{
            type:DataTypes.STRING,
            allowNull:false
        },
        loanstartdate: {
            type: DataTypes.DATE,
            allowNull: true, 
        },
         userId: {  // Nueva clave foránea para asociar con el usuario
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',  // Nombre de la tabla Users
                key: 'id'        // Llave primaria en Users
            }
        }
    }, {
        tableName: 'books',
        timestamps: false
    });
    return Books;
}