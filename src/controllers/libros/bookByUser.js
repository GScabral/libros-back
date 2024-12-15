const { Users } = require("../../db")
const { Books } = require("../../db");

// Traer un usuario con sus libros asociados
async function getUserWithBooks(userId) {
    console.log(userId)
    try {
        const user = await Users.findOne({
            where: { id: userId },
            attributes: { exclude: ['password','reset_password_expires','reset_password_token'] },
            include: [{
                model: Books,
                as: 'books'  // Alias definido en la asociación
            }]
        });
        return user;
    } catch (error) {
        console.error("Error al obtener el usuario con sus libros:", error);
    }
}

module.exports=getUserWithBooks