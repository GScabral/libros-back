const { Router } = require("express")
const Routeslibros = require("./RoutesLibros");
const RoutesUser = require("./RoutesUser")
const RoutesAdmin=require("./RoutesAdmin")




const router = Router();

router.use("/libros",Routeslibros);
router.use("/create",RoutesUser);
router.use("/admin",RoutesAdmin);



module.exports = router;