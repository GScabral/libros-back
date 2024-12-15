const axios = require("axios")



const getLibros = async () => {

    const url=`https://www.googleapis.com/books/v1/volumes?q=*&maxResults=40&startIndex=0`;

    try{
        const response= await axios.get(url);
        if(response.data.error){
            throw new Error("error al traer info de la api".error)
        }
        const data= response.data;

        return data;
    }catch(error){
        console.error("error al obtener libros:",error);
    }
}

module.exports = getLibros;




