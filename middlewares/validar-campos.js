const { validationResult } = require('express-validator');

//Todo middleware, debe de tener un 3 er parametro que se 
//llamara next y que indica que si pasa las validaciones 
//entonces seguira con otro middleware (Chek - es un middleware)
//Cuando ya no hay mas middleware ejecuta el controlador.
const validarCampos = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors)
    }
    next()
}

module.exports = {
    validarCampos
}