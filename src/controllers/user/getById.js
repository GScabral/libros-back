const { Users } = require("../../db")



const searchById=async(id)=>{
    try{
        const infoUser=await Users.findByPk(id);

        if(!infoUser){
            throw new error("ingrese un id valido")
        }


        return{
            id:infoUser.id,
            name:infoUser.name,
            apellido:infoUser.apellido,
            email:infoUser.email,
        }

    

    }catch(error){
        console.error("error al buscar este id",error.message)
    }
}




module.exports= searchById;



//hacer ruta