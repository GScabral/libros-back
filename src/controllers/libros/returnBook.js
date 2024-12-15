const { Books } = require("../../db");

const returnBook = async (returnData) => {
    try {
        // Validación inicial del ID
        const { id } = returnData || {};
        if (!id) {
            return { error: "El ID del libro es requerido para la devolución." };
        }

        const book = await Books.findOne({ where: { id } });

        // Verifica si el libro existe en la base de datos
        if (!book) {
            return { error: "El libro no existe en la base de datos" };
        }

        // Verifica el estado del libro
        if (book.status !== "borrowed") {
            return { error: "El libro no está actualmente prestado" };
        }

        // Actualiza el estado del libro a "devuelto"
        await book.update({ status: "available" });
        return { message: "El libro ha sido devuelto con éxito" };

    } catch (error) {
        console.error("Error al devolver el libro:", error);
        return { error: error.message };
    }
};

module.exports = returnBook;
