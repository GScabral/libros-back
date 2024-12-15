const { Users } = require("../../db");

const searchByEmail = async (email) => {
    try {
        if (!email) {
            throw new Error("Debe proporcionar un email válido.");
        }

        // Buscar el usuario por email
        const infoUser = await Users.findOne({ where: { email } });

        if (!infoUser) {
            throw new Error("No se encontró un usuario con este email.");
        }

        return {
            id: infoUser.id,
            name: infoUser.name,
            apellido: infoUser.apellido,
            email: infoUser.email,
        };

    } catch (error) {
        console.error("Error al buscar este email:", error.message);
        throw error; 
    }
};

module.exports = searchByEmail;
