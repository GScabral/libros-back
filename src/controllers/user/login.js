const {Users}=require("../../db")
require("dotenv").config();
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const secretKey = process.env.SECRET_KEY;



const login=async(email,password)=>{
    console.log("ctoller login:",email,password)
    try{
        const userEmail=await Users.findOne({where:{email}})
        if(!userEmail){
            return { error: "Credenciales inválidas" };
        }

        const checkPassword=await bcrypt.compare(password,userEmail.password)

        if(!checkPassword){
            return { error: "Credenciales inválidas" };
        }

        const token=jwt.sign({userId:userEmail.id,},secretKey,{expiresIn:'12h'});
        const idU=userEmail.id


        return{token,idU}

    }catch(error){
        console.error('Error en el incio de sesion:',error)
        return{error:"error al inciar"}
    }
}


module.exports=login;