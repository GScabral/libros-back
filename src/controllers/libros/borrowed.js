const { Books } = require("../../db");


const borrowedBook = async (borrowData) => {
    try {
        const { id, name, author, editorial, userId,loanstartdate } = borrowData;
        const status = "borrowed"; // Estado para cuando el libro es prestado

        // Buscar si el libro ya existe en la base de datos
        const existingBook = await Books.findOne({ where: { id } });
        const borrowedCount = await Books.count({
            where: {
                userId,
                status: "borrowed"
            }
        })
        if (borrowedCount >= 3) {
            return { success: false, error: "No puede retirar más de 3 libros al mismo tiempo" };
        }

        if (existingBook) {
            // Si el libro ya existe, verifica su estado
            if (existingBook.status === "borrowed") {
                return { success: false, error: "El libro ya está prestado actualmente." };
            }

            // Si el libro existe y no está prestado, actualiza su estado
            await existingBook.update({ status });
            return { success: true, message: "El libro ha sido prestado con éxito." };
        }

        // Si el libro no existe, crear un nuevo registro con el estado "borrowed"
        const borrowed = await Books.create({
            id,
            name,
            author,
            editorial,
            status,
            userId,
            loanstartdate,
        });

        return borrowed;
    } catch (error) {
        console.error("Error a la hora de prestar el libro", error);
        return { error: error.message };
    }
};

module.exports = borrowedBook;
