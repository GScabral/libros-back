require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs')
const path = require('path')

const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
} = process.env;


const sequelize=new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/libros`,{
    logging:false,
    native:false,
});

const basename=path.basename(__filename);
const modelDefiners=[];

fs.readdirSync(path.join(__dirname,"./models"))
    .filter((file)=>file.indexOf('.')!==0 && file.slice(-3)==='.js')
    .forEach((file)=>{
        const model =require(path.join(__dirname,'./models',file));
        modelDefiners.push(model);
    })

    modelDefiners.forEach(model=>model(sequelize,DataTypes));


    let entries=Object.entries(sequelize.models);
    let capsEntries= entries.map(entry=>[entry[0][0].toUpperCase()+entry[0].slice(1),entry[1]]);
    sequelize.models =Object.fromEntries(capsEntries);

    // console.log("Modelos cargados en sequelize.models:", sequelize.models);

    const models=sequelize.models;

    if(models){
        const {Users,Books}=models;

        Users.hasMany(Books,{
            foreignKey:"userId",
            as:'books'
        })

        Books.belongsTo(Users, {
            foreignKey: 'userId',
            as: 'user' // Alias opcional para acceder al usuario de un libro
        });
    }


    module.exports={
        ...sequelize.models,
        conn:sequelize
    }