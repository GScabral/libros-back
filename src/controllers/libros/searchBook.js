const axios = require("axios")



const searchBook = async (name) => {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${name}`;

    try {
        const response = await axios.get(url)

        if (response.data.error) {
            throw new Error(`API error:${response.data.error}`)
        }

        const data = response.data;

        return data;

    }catch(error){
        console.error("error al obtener los libros:",error)
    }
}

module.exports = searchBook;




