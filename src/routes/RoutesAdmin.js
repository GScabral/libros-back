const { Router } = require("express")
require('dotenv').config();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;


const roture = Router();


roture.post("/loginc", async (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
        res.status(200).json({ message: 'Autentifacación exitosa' })
    } else {
        res.status(400).json({ message: 'Autentificacion fallida' })
    }
})


module.exports = roture;