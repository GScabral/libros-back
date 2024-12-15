const { Users } = require("../../db");

const checkEmail = async (email) => {

    try {
        const emailExist = await Users.findOne({ where: { email } });
        // Retorna `true` si el correo existe, de lo contrario `false`
        return !!emailExist;
    } catch (error) {
        console.error("error al verificar el email", error);
        throw new Error("error interno del servidor");
    }
};

module.exports = checkEmail;
