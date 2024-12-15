const { Router } = require("express");
const newUser = require("../controllers/user/newUser")
const bringUser = require("../controllers/user/getUser")
const searchById = require("../controllers/user/getById")
const searchUser = require("../controllers/user/searchUser")
const checkEmail = require("../controllers/user/checkEmail.js")
const login = require("../controllers/user/login.js")
const recoverPassword = require("../controllers/email/recoverPasswoord.js")
const resetPassword = require("../controllers/user/resetPassword.js")
const searchByEmail = require("../controllers/user/getByName.js")


const router = Router();


router.post("/createUser", async (req, res) => {
    try {
        const createNewUser = await newUser(req.body);
        if (createNewUser && createNewUser.error) {
            res.status(404).json({ error: createNewUser.message });
        } else {
            res.status(200).json(createNewUser);
        }
    } catch (error) {
        res.status(500).json({ error: "error en el servidor" })
    }
})

router.post("/recover-password", async (req, res) => {
    const { email } = req.body;
    try {
        await recoverPassword(email);
        res.status(200).send({ message: "Correo de recuperación enviado" });
    } catch (error) {
        res.status(500).send({ message: "Error al procesar la recuperación" });
    }
});

router.post("/reset-password", async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        await resetPassword(token, newPassword);
        res.status(200).send({ message: "Contraseña restablecida con éxito" });
    } catch (error) {
        res.status(400).send({ message: "Error al restablecer la contraseña" });
    }
});

router.get("/listUser", async (req, res) => {
    try {
        const list = await bringUser();
        res.status(200).json(list);
    } catch (error) {
        res.status(500).json({ error: "eroor al traer los user" })
    }
})

router.get("/user/:id", async (req, res) => {
    const id = req.params.id
    try {
        const getById = await searchById(id);
        res.status(200).json(getById);
    } catch (error) {
        res.status(400).json({ error: "erro al buscar este id " })
    }
})

router.get("/userName/:name", async (req, res) => {

    const name = req.params.name
    try {
        const searchByName = await searchUser(name);
        res.status(200).json(searchByName);
    } catch (error) {
        res.status(400).json({ error: "error en la ruta de busqueda por name" })
    }
})

router.get("/chekEmail", async (req, res) => {
    const { email } = req.query;
    try {
        const check = await checkEmail(email);
        res.status(200).json(check)
    } catch (error) {
        res.status(400).json({ error: "erro ne la ruta de checkemail" })
    }
})


router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const getInto = await login(email, password)


        if (getInto && getInto.token) {
            return res.status(200).json(getInto);
        }
        
        return res.status(401).json({
            error: getInto.error || "Credenciales incorrectas", // Mensaje de error dinámico
        });

    } catch (error) {
        res.status(500).json({ error: "error a la hora de incicar sesion en el servidor" })
    }
})

router.get("/userEmail/:email", async (req, res) => {
    const email = req.params.email
    try {
        const getByEmail = await searchByEmail(email);
        res.status(200).json(getByEmail);
    } catch (error) {
        res.status(400).json({ error: "erro al buscar este email " })
    }
})



module.exports = router;