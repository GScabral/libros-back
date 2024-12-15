const { Books } = require("../../db");



const calcularDiasPrestamo = async (id) => {
    const libro = await Books.findByPk(id);
    if (!libro || !libro.loanStartDate) {
        throw new Error("El libro no está prestado o no existe");
    }

    const fechaInicio = new Date(libro.loanStartDate);
    const fechaActual = new Date();
    const diasPrestados = Math.floor((fechaActual - fechaInicio) / (1000 * 60 * 60 * 24));

    return diasPrestados;
};


module.exports = calcularDiasPrestamo;
