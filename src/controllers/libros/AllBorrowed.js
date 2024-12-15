const { Books }=require("../../db")


const borrowedAll=async()=>{
    try{
        const listBorrowed=await Books.findAll();
        return listBorrowed;
    }catch(error){
        console.error("errro al obtener los libros prestados",error);

        throw  new error;
    }
}



module.exports=borrowedAll