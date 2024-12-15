const axios =require("axios")

const bookById=async(id)=>{

    const url=`https://www.googleapis.com/books/v1/volumes/${id}`

    try{
        const response=await axios.get(url);
        if(response.data.error){
            throw new Error("api error:")
        }

        const data=response.data

        return data;
    }catch(error){
        console.error("error al buscar por id",error)
    }
}


module.exports  = bookById