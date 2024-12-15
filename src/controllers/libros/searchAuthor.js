const axios = require("axios");

const searchAuthor = async (author) => {
    // Asegúrate de codificar el autor en caso de caracteres especiales
    const url = `https://www.googleapis.com/books/v1/volumes?q=inauthor:${encodeURIComponent(author)}`;

    try {
        const response = await axios.get(url);

        // Comprueba si hay errores en la respuesta, aunque no es común que Google Books devuelva "error" en este caso
        if (response.data.error) {
            throw new Error(`API error: ${response.data.error.message}`);
        }

        // Extrae y devuelve los datos relevantes
        return response.data;
    } catch (error) {
        // Manejo de errores para solicitudes o problemas de red
        console.error("Error al obtener los libros:", error.message);
        throw error; // Re-lanzar el error para que quien llame a esta función pueda manejarlo
    }
};

module.exports = searchAuthor;
