const { Op } = require('sequelize');
const { Users } = require("../../db")




const searchUser = async (name) => {

    try {
        const dataUser = await Users.findAll({
            where: {
                name: {
                    [Op.like]: `%${name}%`
                }
            }
        });

        const userByName = dataUser.map((name) => {
            return {
                id: name.id,
                name: name.name,
                apellido: name.apellido,
                email: name.email,
                books: name.books,
                status: name.status
            }
        })

        return userByName;


    } catch (error) {
        console.error("Error al buscar el name:", error.message);

        if (error.original) {
            console.error("error interno de sequelize:", error.original)
        }
        throw error;
    }
}


module.exports = searchUser;