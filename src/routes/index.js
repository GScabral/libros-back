const { Router } = require("express")
const Routeslibros = require("./RoutesLibros");
const RoutesUser = require("./RoutesUser")
const RoutesAdmin=require("./RoutesAdmin")




const router = Router();

router.use("/api/libros",Routeslibros);
router.use("/api/create",RoutesUser);
router.use("/api/admin",RoutesAdmin);



module.exports = router;