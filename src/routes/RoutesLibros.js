const { Router } = require("express");
const searchBook = require("../controllers/libros/searchBook")
const getLibros = require("../controllers/libros/getLibros")
const bookById = require("../controllers/libros/BookById");
const borrowedBook = require("../controllers/libros/borrowed")
const checkDisponible = require("../controllers/libros/checkDispible")
const borrowedAll = require("../controllers/libros/AllBorrowed");
const returnBook = require("../controllers/libros/returnBook")
const getUserWithBooks = require ("../controllers/libros/bookByUser.js")
const enviarCorreo = require("../controllers/email/confirm.js")
const calcularDiasPrestamo=require("../controllers/libros/timePrestamo.js")
const searchAuthor=require("../controllers/libros/searchAuthor.js")
const router = Router();


router.get("/ListBooks/:name", async (req, res) => {
    const name = req.params.name;
    try {
        const ListBooks = await searchBook(name);
        res.status(200).json(ListBooks);
    } catch {
        res.status(500).json({ error: "error al traer los libros" })
    }
})

router.get("/SearchAuthor/:author",async(req,res)=>{
    const author=req.params.author;
    try{
        const Author=await searchAuthor(author)
        res.status(200).json(Author);
    }catch(error){
        res.status(404).json({error:"error al buscar el author"})
    }
})

router.get("/ListBooks", async (req, res) => {
    try {
        const list = await getLibros();
        res.status(200).json(list)
    } catch (error) {
        res.status(500).json({ error: "error al traer los libros" })
    }
})

router.get("/detailBook/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const detail = await bookById(id);
        res.status(200).json(detail)
    } catch (eroor) {
        res.status(404).json({ error: "error al traer el libro por id" })
    }
})
router.get("/time/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const time = await calcularDiasPrestamo(id);
        res.json(time); // Respuesta con los días de préstamo
    } catch (eroor) {
        res.status(404).json({ error: "error al traer el libro por id" })
    }
})



router.post("/retirar", async (req, res) => {
    try {
        const data = await borrowedBook(req.body)
        if (data && data.error) {
            res.status(404).json({ error: data.message });
        } else {
            res.status(200).json(data);
        }
    } catch (error) {
        res.status(500).json({ error: "error en el servidor " })
    }
})

router.get("/disponible", async (req, res) => {
    const { id } = req.query;
    try {
        const check = await checkDisponible(id)
        res.status(200).json(check)
    } catch (error) {
        res.status(400).json({ error: "erro en la ruta de chackemail" })
    }
})



router.get("/prestados", async (req, res) => {
    try {
        const listBook = await borrowedAll()
        res.status(200).json(listBook)
    } catch (error) {
        res.status(400).json({ error: "error al  traer todos los libros" })
    }
})

router.get("/librosPrestados/:id",async(req,res)=>{
    const id = req.params.id;

    try{
        const sacados=await getUserWithBooks(id)
        console.log("sacados",sacados)
        res.status(200).json(sacados)
    }catch(error){
        res.status(400).json({error:"error al traer todos los libros de este user "})
    }
})


router.post("/devolver", async (req, res) => {
    const id = req.body;
    const result = await returnBook(id)
    if (result.error) {
        return res.status(400).json(result)
    } else {
        return res.status(200).json(result)
    }
})

router.post("/sendEmail",async(req,res)=>{
    try{
        const{title,idBook,name,correo,fecha}=req.body
        await enviarCorreo(title,idBook,name,correo,fecha)
        res.status(200).send('Correo enviado con existo')
    }catch(error){
        res.status(500).send('error al enviar correo')
    }
})




module.exports = router;
