const { DataTypes } = require("sequelize")


module.exports = (sequelize) => {
    const Users = sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        apellido: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(250),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        reset_password_token:{
            type:DataTypes.STRING(255)
        },
        reset_password_expires:{
            type:DataTypes.DATE
        }

    }, {
        tableName: 'users',
        timestamps: false
    });

    return Users;
}



