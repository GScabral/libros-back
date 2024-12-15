const { Books } = require("../../db")

const checkDisponible = async (id) => {
    try {
        const disponible = await Books.findOne({ where: { id, status: "borrowed" || "available" } }) 

        if (disponible) {
            return { disponible: false, mensaje: "El libro no esta disponible" }
        }


        return { disponible: true, mensaje: "El libro está disponible para prestar" }
    } catch (error) {
        console.error("error al verificar la disponibilidad del libro", error)
        throw new Error("error interno del servidor")
    }
}


module.exports = checkDisponible;