const { Users } = require("../../db")


const bringUser = async () => {
    try {
        const listUser = await Users.findAll({
            attributes:{exclude:['password','reset_password_expires','reset_password_token']}
        });
        return listUser;
    } catch (error) {
        console.error("Error al obetene los user", error);

        throw error
    }
}


module.exports=bringUser;
