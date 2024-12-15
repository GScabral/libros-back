const { Users } = require ("../../db")
const bcrypt = require("bcrypt")
const saltRounds = 10; //numeros de rondas de hashing (método criptográfico que transforma registros de datos y caracteres de cualquier longitud en valores hash compactos y fijos.)

const newUser = async (dataUser) => {
    try {
        const { name, apellido, email, password } = dataUser;

        const hashedPassword = await bcrypt.hash(password, saltRounds);


        const createUser = await Users.create({
            name,
            apellido,
            email,
            password: hashedPassword,// Almacena la contraseña como un hash en la base de datos
        });

        

        return createUser;

    } catch (error) {
        console.error("Error en la creación del cliente", error);
        return { error: error.message };
    }
}


module.exports=newUser;