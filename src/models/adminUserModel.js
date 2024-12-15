const { DataTypes } = require("sequelize")


module.exports = (sequelize) => {
    const admiUser = sequelize.define("admin_user", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type:DataTypes.STRING(100),
            allowNull:false,
        },
        email:{
            type:DataTypes.STRING(250),
            allowNull:false,
        },
        email:{
            type:DataTypes.STRING(250),
            allowNull:false
        },
        password:{
            type:DataTypes.STRING(100),
            allowNull:false
        },
        status:{
            type:DataTypes.STRING(100),
            allowNull:false
        }
    }, {
        tableName: 'admin_user',
        timestamps: false
    });
    return admiUser;
}


// CREATE TABLE admin_user (
//     id INT  PRIMARY KEY,
//     name VARCHAR(100) NOT NULL,
//     email VARCHAR(250) NOT NULL,
//     password VARCHAR(100) NOT NULL,
//     status VARCHAR(100) NOT NULL
// );