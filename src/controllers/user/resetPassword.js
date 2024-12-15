const { Users } = require("../../db")
const bcrypt = require("bcrypt")
const saltRounds = 10;

const resetPassword = async (token, newPassword) => {
    try {
        // Buscar el usuario por el token y verificar si el token sigue siendo válido
        const user = await Users.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() } // Comprueba que el token no haya expirado
        });

        if (!user) {
            console.error("Token inválido o expirado");
            return;
        }

        // Hashear la nueva contraseña
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        // Actualizar la contraseña del usuario y eliminar el token de recuperación
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        console.log("Contraseña restablecida con éxito");
    } catch (error) {
        console.error("Error al restablecer la contraseña:", error);
    }
};



module.exports=resetPassword;